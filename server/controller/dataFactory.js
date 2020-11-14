const Crypto = require("../models/cryptoData"),
  fs = require("fs"),
  parse = require("csv-parse"),
  mongoose = require("mongoose"),
  db = mongoose.connection,
  url =
    "mongodb+srv://andrew:8wy177640@cluster0.jwodi.mongodb.net/crypto";

mongoose.connect(url, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
});

const uploadData = (req, res) => {
  try {
    if (db.db) {
      db.db.listCollections().toArray((err, names) => {
        for (i = 0; i < names.length; i++) {
          if ((names[i].name === "cryptos")) {
            console.log("cryptos Collection Exists in DB");
            mongoose.connection.db.dropCollection(
              "cryptos",
              (err, result) => {
                if (err) throw err;
                if (result) console.log("Collection droped");
              }
            );
            break;
          }
        }
      });
    }


  } catch (err) {
    console.error(err);
  }

  fs.createReadStream("crypto_historical_data.csv")
    .pipe(parse({ delimiter: ",", from_line: 2 }))
    .on("data", (data) => {
      const cryptoData = new Crypto({
        currency: data[0],
        date: data[1],
        open: data[2],
        high: data[3],
        low: data[4],
        close: data[5],
        volume: data[6],
        marketCap: data[7],
      })

      cryptoData.save((err, data) => {
        if (err) return console.error(err);
        console.log('data update')
      });
    })
}

const fetchData = async (req, res) => {
  try {
    const result = await Crypto.find();
    res.send(result);
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

module.exports = {
  uploadData,
  fetchData
};