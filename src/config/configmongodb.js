import mongoose from "mongoose";
import "dotenv/config";

const config = {
  mongoDB: {
    URL: `mongodb+srv://jorgelrodriguez121998:1234@coderback.3ht4kol.mongodb.net/test?retryWrites=true&w=majority `,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
};

export const connectMongoDB = async () => {
  try {
    await mongoose.connect(config.mongoDB.URL, config.mongoDB.options);
    console.log("Connected to Mongo Atlas");
  } catch (error) {
    console.log("Error en la conexión con Mongo Atlas", error);
  }
}

