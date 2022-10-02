// import fs from "fs";
import express, { request, response } from "express";
import csv from "csv-streamify";
import cors from "cors";
import bodyParser from "body-parser";
import multer from "multer";
import formidable from "formidable";
import { fileURLToPath } from "url";
import Papa from "papaparse";
import CSVRoute from "./routes/csv.js";
import XLSXRoute from "./routes/xlsx.js";

// import * as XLSX from "xlsx/xlsx.mjs";
// import { readFile, writeFile, set_fs } from "xlsx";
// import * as fs from "fs";
// set_fs(fs);

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 5001;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);
app.use(express.static("public"));
// app.use(formidable());

const parser = csv({ objectMode: true, columns: true });

parser.on("data", function (line) {
  console.log(line);
});

app.use("/csv", CSVRoute);
app.use("/xlsx", XLSXRoute);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
