import express from "express";
import mongoose from "mongoose";
import Data from "./data.js";
import Videos from "./dbModel.js";

//app config
const app = express();
const port = process.env.PORT || 9000;

//middle wares
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-allow-Origin", "*"),
    res.setHeader("Access-Control-allow-Headers", "*"),
    next();
});

//DB config
const connection_url =
  "mongodb+srv://admin:admin@cluster0.ov98y.mongodb.net/tiktok?retryWrites=true&w=majority";

mongoose.connect(connection_url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
//api endpoints
app.get("/", (req, res) => res.status(200).send("Happy tiktok...!"));

app.get("/v1/posts", (req, res) => res.status(200).send(Data));

app.get("/v2/posts", (req, res) => {
  Videos.find({}, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.post("/v2/posts", (req, res) => {
  //post request is to Add DATA to the database
  //It will let us Add a video document to the videos collection
  const dbVideos = req.body;
  Videos.create(dbVideos, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

//listen
app.listen(port, () => console.log(`listening on localhost:${port}`));
