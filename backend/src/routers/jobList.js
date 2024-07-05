const express = require("express");
const router = express.Router();
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const crypto = require("crypto");
const path = require("path");
const mongoose = require("mongoose");
const Grid = require("gridfs-stream");

const { seedJobs, getJobById, getAllJobs } = require("../controllers/jobList");

const {
  validateIdInBody,
  validateIdInParam,
  validateAddBookData,
  validateUpdateBookData,
} = require("../validators/books");
const checkErrors = require("../validators/checkErrors");
const { authAdmin, auth } = require("../middleware/auth");

const storage = new GridFsStorage({
  url: process.env.MONGO_URI || "mongodb://localhost:27017/pdfuploads",
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: "uploads",
        };
        resolve(fileInfo);
      });
    });
  },
});

const uploadResume = multer({ storage });

// router.get("/books/seed", authAdmin, seedBooks);
router.get("/jobs/seed", seedJobs);
// router.get("/books", auth, getAllBooks);
router.get("/jobs", getAllJobs);
router.post("/jobs", getJobById);

router.post("/jobs/upload", uploadResume.single("file"), (req, res) => {
  res.json({ file: req.file });
});
// router.put("/books", authAdmin, validateAddBookData, checkErrors, addNewBook);
// router.delete(
//   "/books/:id",
//   authAdmin,
//   validateIdInParam,
//   checkErrors,
//   deleteOneBookById
// );
// router.patch(
//   "/books/:id",
//   authAdmin,
//   validateIdInParam,
//   validateUpdateBookData,
//   checkErrors,
//   updateOneBook
// );

module.exports = router;
