import express from "express";
import formidable from "formidable";
import { fileURLToPath } from "url";
import Papa from "papaparse";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import * as fs from "fs";

const router = express.Router();

router.post("/", async (req, res) => {
  var form = new formidable.IncomingForm({ uploadDir: `${__dirname}/files` });
  var formFields = await new Promise(function (resolve, reject) {
    form.parse(req, function (err, fields, files) {
      if (err) {
        reject(err);
        return;
      }
      resolve(files);
    }); // form.parse
  });
  const csv = await Papa.parse(
    fs.readFileSync(formFields.file.filepath, "utf8"),
    {
      header: true,
    }
  );
  fs.unlinkSync(formFields.file.filepath);
  res.send({ csv: csv.data });
});

export default router;
