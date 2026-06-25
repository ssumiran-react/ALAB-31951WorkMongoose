//import { MongoClient } from "mongodb";
import mongoose from "mongoose";

async function connDB() {
  //let conn;
  try {
    await mongoose.connect(process.env.ATLAS_URI);     //MongoClient(process.env.ATLAS_URI);
    //conn = client;
    console.log('Conn MongoDB on mongoose')
  } catch (e) {
    console.error(e);
  }

  //let db = conn.db("sample_training");
}
export default connDB;

