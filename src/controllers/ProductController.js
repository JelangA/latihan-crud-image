const Product = require('../models/product');
const respon = require('../helper/response');
const crypto = require("crypto");
const path = require('path');
const fs = require('fs');

controller = {};

controller.getProduct = async (req, res) => {
    try {
        const allproduct = await Product.findAll();
        respon.response(res, 200, "get data product", allproduct);
    } catch (error) {
        respon.response(res, 400, error, "");
    }
}

controller.getProductById = async (req, res) => {
    try {
        const allproduct = await Product.findOne({
            where: {
                id : req.params.id,
            }
        });
        respon.response(res, 200, "get data product", allproduct);
    } catch (error) {
        respon.response(res, 400, error, "");
    }
};

controller.saveProduct = (req, res) => {
    if(req.files === null) {
        return respon.response(res, 400, "No File Uploaded", "");
    }
    const name = req.body.title;
    const file = req.files.file;
    const filesize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = crypto.randomBytes(16).toString('hex') + ext;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const allowedType = ['.png', '.jpg', '.jpeg'];

    if (!allowedType.includes(ext.toLocaleLowerCase())){return respon.response(res, 422, "Invalid Images", "")}
    if (filesize > 5000000) {return respon.response(res, 422, "Image must be less than 5 mb", "")}

    const imagePath = path.join(__dirname, "../../public/images/", fileName);
    file.mv(imagePath, async (err) => {
      if (err) {
        return respon.response(res, 500, err, "");
      }
      try {
        await Product.create({ name: name, image: fileName, url: url });
        respon.response(res, 201, "Product Created Succesfully", req.body);
      } catch (err) {
        console.log(err);
      }
    });
};

controller.updateProduct = async (req, res) => {
    const product = await Product.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!product) {
      return respon.response(res, 404, "Data not found");
    }

    let fileName = "";
    if (req.files === null) {
      fileName = product.image;
    } else {
      const file = req.files.file;
      const filesize = file.data.length;
      const ext = path.extname(file.name);
      fileName = crypto.randomBytes(16).toString("hex") + ext;
      const allowedType = [".png", ".jpg", ".jpeg"];

      if (!allowedType.includes(ext.toLocaleLowerCase())) {
        return respon.response(res, 422, "Invalid Images", "");
      }
      if (filesize > 5000000) {
        return respon.response(res, 422, "Image must be less than 5 mb", "");
      }

      const imagePath = path.join(__dirname, "../../public/images/", fileName);
      file.mv(imagePath, async (err) => {
        if (err) {
          return respon.response(res, 500, err, "");
        }
      });
    }

    const name = req.body.title;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    try {
      await Product.update(
        { name: name, image: fileName, url: url },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      respon.response(res, 200, "Product updated successfully", req.body);
    } catch (err) {
      console.log(err.message);
    }


};

controller.deleteProduct = async (req, res) => {
    const product = await Product.findOne({
        where:{
            id: req.params.id
        }
    });
    if(!product) {return respon.response(res, 404, "data not found")};
    try{
        const filepath = path.resolve(__dirname, `../../public/images/${product.image}`);
        fs.unlinkSync(filepath);
        await Product.destroy({
          where: {
            id: req.params.id,
          }
        });
        respon.response(res, 200, "prooduct deleted succesfully", "")
    }catch (err){
        console.log(err);
    }
};

module.exports = controller;