const multer = require("multer");
const xlsx = require("xlsx");

const storage = multer.memoryStorage();
const upload = multer({ storage }).single("file");

const uploadFile = (req, res) => {
    const file = req.file.buffer;
    const workbook = xlsx.read(file, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet);
    console.log(data);
    res.send({ message: "File uploaded and processed successfully", data });
};

module.exports = { upload, uploadFile };
