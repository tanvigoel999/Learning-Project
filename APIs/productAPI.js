const { request, response } = require("express");
const exp = require("express");
const { resolveTypeReferenceDirective } = require("typescript");
const productApp = exp.Router();
productApp.use(exp.json());
productApp.get("/get-product", async (request, response) => {
  //getProductCollection
  let productCollectionObject = request.app.get("productCollectionObject");
  let product = await productCollectionObject.find().toArray();
  response.send({ message: "Product", payload: product });
});

productApp.post("/create-product", async (request, response) => {
  let productCollectionObject = request.app.get("productCollectionObject");
  let productPut = request.body;
  // console.log(productPut);
  let productDB = await productCollectionObject.findOne({
    product: productPut.product,
  });
  // console.log(productDB);
  if (productDB !== null) {
    response.send({ message: "Product is already exit" });
  } else {
    await productCollectionObject.insertOne(productPut);
    response.send({ message: "Product created" });
  }
});
productApp.put("/update-product", async (request, response) => {
  let productCollectionObject = request.app.get("productCollectionObject");
  let productUpdate = request.body;
  await productCollectionObject.updateOne(
    { product: productUpdate.product },
    { $set: { ...productUpdate } }
  );
  response.send({ message: "Product updated" });
});
productApp.delete("/remove-product/:id", async (request, response) => {
  let productCollectionObject = request.app.get("productCollectionObject");
  let deleteproduct = request.params.id;
  // console.log(typeof deleteproduct);
  //Delete
  let productDelete = await productCollectionObject.findOne({
    id: deleteproduct,
  });

  if (productDelete === null) {
    response.send({
      message: "Cannot deleted",
    });
  } else {
    await productCollectionObject.deleteOne(productDelete);
    response.send({ message: "Product Deleted" });
  }

  // let removeProduct = request.body;
  // await productCollectionObject.deleteOne(removeProduct);
  // response.send({ message: "Product Deleted" });
});

productApp.get("/get-product/:product", async (request, response) => {
  let productCollectionObject = request.app.get("productCollectionObject");
  let ProductFromUrl = request.params.product;
  let productfind = await productCollectionObject.findOne({
    product: ProductFromUrl,
  });
  // console.log(productfind);

  if (productfind === null) {
    response.send({ message: "Not existed" });
  } else {
    response.send({ message: "Product", payload: productfind });
  }
});
productApp.get("/get-productID/:id", async (request, response) => {
  let productCollectionObject = request.app.get("productCollectionObject");
  let ProductFromUrl = request.params.id;
  // console.log(typeof ProductFromUrl);

  let productfind = await productCollectionObject.findOne({
    id: ProductFromUrl,
  });

  if (productfind === null) {
    response.send({ message: "Not existed" });
  } else {
    response.send({ message: "Product", payload: productfind });
  }
});

module.exports = productApp;
//get product by Id
//create product
//update product
//delete product by id
