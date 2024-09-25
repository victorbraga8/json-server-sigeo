const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const app = express();

app.use(cors());

const geojsonPath = path.join(__dirname, "data.geojson");
let geojsonData;

const loadGeoJSON = () => {
  try {
    const data = fs.readFileSync(geojsonPath, "utf8");
    geojsonData = JSON.parse(data);
  } catch (err) {
    geojsonData = null;
  }
};

loadGeoJSON();

app.get("/", (req, res) => {
  res.send("API funcionando");
});

app.get("/data", (req, res) => {
  if (geojsonData) {
    res.json(geojsonData);
  } else {
    res.status(500).send("Erro ao carregar os dados.");
  }
});

app.get("/data/features", (req, res) => {
  if (geojsonData && geojsonData.features) {
    res.json(geojsonData.features);
  } else {
    res.status(500).send("Erro ao carregar os dados.");
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
