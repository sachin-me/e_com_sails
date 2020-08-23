const Product = require('../models/Product');

module.exports = {
  create: async function (req, res) {
    const { name, category, price, des, image } = req.body;

    const paramObj = {
      name,
      category,
      price,
      des,
      images: []
    }

    req.file('image').upload({
      dirname: require('path').resolve(sails.config.appPath, 'assets/images')
    }, async function whenDone(err, uploadedFiles) {
      if (err) {
        sails.log.error(err);
      } else {
        uploadedFiles && uploadedFiles.forEach(element => {
          const filePath = element.fd.split('/');
          const filename = filePath[filePath.length-1].split('.');
          const name = filename[0];
          const ext = filename[1];
          const file = name + "." + ext;
          
          paramObj.images.push('/images/' + file);
        }); 

        const product = await sails.models.product.create(paramObj).fetch();
        
        return res.redirect('/');
      }
    });


  }
}