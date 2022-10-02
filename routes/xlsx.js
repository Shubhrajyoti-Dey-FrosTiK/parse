import express from "express";
import formidable from "formidable";
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import * as XLSX from "xlsx/xlsx.mjs";
import { set_fs } from "xlsx";
import * as fs from "fs";
import { DataService } from "../services/data.service.js";
set_fs(fs);

const router = express.Router();
const data = new DataService();

router.post("/", async (req, res) => {
  var form = new formidable.IncomingForm({
    uploadDir: `${__dirname}/files`,
    keepExtensions: true,
  });
  var formFields = await new Promise(function (resolve, reject) {
    form.parse(req, function (err, fields, files) {
      if (err) {
        reject(err);
        return;
      }
      resolve(files);
    }); // form.parse
  });
  console.log(formFields.Name.filepath);
  const excel = await XLSX.readFileSync(formFields.Name.filepath, {
    raw: true,
  });
  const sheet_name_list = excel.SheetNames;
  let combinedData = {};
  sheet_name_list.forEach((sheet) => {
    combinedData[sheet] = XLSX.utils.sheet_to_json(excel.Sheets[sheet]);
  });
  console.log(combinedData);
  fs.unlinkSync(formFields.Name.filepath);
  res.send({ xlsx: combinedData });
});

router.post("/combined", async (req, res) => {
  var form = new formidable.IncomingForm({
    uploadDir: `${__dirname}/files`,
    keepExtensions: true,
  });
  var formFields = await new Promise(function (resolve, reject) {
    form.parse(req, function (err, fields, files) {
      if (err) {
        reject(err);
        return;
      }
      resolve(files);
    }); // form.parse
  });
  console.log(formFields.Name.filepath);
  const excel = await XLSX.readFileSync(formFields.Name.filepath, {
    raw: true,
  });
  const sheet_name_list = excel.SheetNames;
  let combinedData = [];
  sheet_name_list.forEach((sheet) => {
    combinedData = [
      ...combinedData,
      ...XLSX.utils.sheet_to_json(excel.Sheets[sheet]),
    ];
  });
  console.log(combinedData);
  fs.unlinkSync(formFields.Name.filepath);
  res.send({ xlsx: combinedData });
});

router.post("/combined/extract", async (req, res) => {
  console.log("Hewllo");
  var form = new formidable.IncomingForm({
    uploadDir: `${__dirname}/files`,
    keepExtensions: true,
  });
  var formFields = await new Promise(function (resolve, reject) {
    form.parse(req, function (err, fields, files) {
      if (err) {
        reject(err);
        return;
      }
      resolve(files);
    }); // form.parse
  });
  console.log(formFields.Name.filepath);
  const excel = await XLSX.readFileSync(formFields.Name.filepath, {
    raw: true,
  });
  const sheet_name_list = excel.SheetNames;
  let combinedData = [];
  sheet_name_list.forEach((sheet) => {
    combinedData = [
      ...combinedData,
      ...XLSX.utils.sheet_to_json(excel.Sheets[sheet]),
    ];
  });
  console.log(combinedData);
  fs.unlinkSync(formFields.Name.filepath);
  const extractedData = data.rollAndBranchExtractor(combinedData);
  res.send(extractedData);
});

export default router;
