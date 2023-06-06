import MongoClass from "./mongoclass.js";
import { productsSchema } from "../../models/productsschema.js";

export class MongoDBProducts extends MongoClass {
  constructor() {
    super("products", productsSchema);
  }
}