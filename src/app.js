import express from "express";
import morgan from "morgan";
import { Server as SocketServer } from "socket.io";
import http from "http";
import homefsroutes from "./routes/fs/homefsrouter.js";
import productfsroutes from "./routes/fs/productsfsrouter.js";
import cartfsroutes from "./routes/fs/cartfsrouter.js";
import homeRoutes from "./routes/mongo/homeroutes.js";
import productRoutes from "./routes/mongo/productroutes.js";
import cartRoutes from "./routes/mongo/cartroutes.js";
import websockets from "./websockets/websockets.js";
import exphbs from "express-handlebars";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { connectMongoDB } from "./config/configmongodb.js";

const app = express();
const PORT = 8080 || process.env.PORT;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const httpServer = http.createServer(app);
const io = new SocketServer(httpServer);

websockets(io);

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.engine("handlebars", exphbs.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

//FileSystem
app.use("/fs/home", homefsroutes);
app.use("/fs/products", productfsroutes);
app.use("/fs/carts", cartfsroutes);
//MongoDB
app.use("/home", homeRoutes);
app.use("/products", productRoutes);
app.use("/carts", cartRoutes);

connectMongoDB();

const server = httpServer.listen(PORT, () =>
  console.log(
    `🚀 Server started on port ${PORT}. 
      at ${new Date().toLocaleString()}`
  )
);
server.on("error", (err) => console.log(err));