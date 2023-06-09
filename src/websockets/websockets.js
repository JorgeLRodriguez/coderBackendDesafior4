import ProductManager from "../persistence/productmanager.js";
const path = "src/db/products.json";
const myProductManager = new ProductManager(path);

export default (io) => {
  io.on("connection", (socket) => {
    console.log("New client websocket: ", socket.id);
    socket.on("new-product", async (data) => {
      console.log(data);
      try {
        await myProductManager.addProduct(data);
        const productListUpdated = await myProductManager.getProducts();
        io.sockets.emit("refresh-products", productListUpdated);
      } catch (err) {
        console.log(err);
      }
    });
  });
};
