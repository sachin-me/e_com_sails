module.exports = {
  searchItem: async function (req, res) {
    let { search } = req.body;
    search = search.toLowerCase();

    const searchedItem = await sails.models.product.find({
      or: [
        {
          name: search, 
        },
        {
          category: search
        }
      ]
    });
    
    res.view('pages/homepage', {
      products: searchedItem
    })
  }
}