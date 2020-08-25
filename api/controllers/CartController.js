module.exports = {
  addToCart: async function (req, res) {
    const { id, qty } = req.body;
    const product = await sails.models.product.findOne({ id: id });

    
    const paramObj = {
      qty,
      product: product.id
    }
    const findInCart = await sails.models.cart.findOne({ product: product.id });

    if (findInCart && findInCart !== 'undefined') {
      findInCart.qty = parseInt(findInCart.qty) + parseInt(qty);
      const updateCart = await sails.models.cart.updateOne({ id: findInCart.id }).set({
        qty: findInCart.qty
      });

      return res.redirect('/');
    } else {
      const cart = await sails.models.cart.create(paramObj).fetch();
      return res.redirect('/');
    }
  },

  getCartList: async function (req, res) {
    const carts = await sails.models.cart.find({}).populate('product');
    console.log(carts, 'carts');
    res.view('pages/cart', {
      carts: carts
    })
  }
}