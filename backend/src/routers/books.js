const express = require("express");
const router = express.Router();
const {
  seedBooks,
  getAllBooks,
  getBookById,
  addNewBook,
  deleteBookById,
  updateOneBook,
} = require("../controllers/books");
const { checkErrors} = require('../validators/checkErrors');
const {authAdmin, auth} = require('../middleware/auth')
const { validateAddBookData,validateIdInBody,validateIdInParam,validateUpdateBookData} = require('../validators/books');

router.get("/books/seed", authAdmin, seedBooks);
router.get("/books", auth, getAllBooks);
router.post("/books", auth, validateIdInBody, checkErrors, getBookById);
router.put("/books", authAdmin, validateAddBookData, checkErrors, addNewBook);
router.delete("/books/:id", authAdmin, validateIdInParam, checkErrors, deleteBookById)
router.patch("/books/:id", authAdmin, validateIdInParam, validateUpdateBookData, checkErrors, updateOneBook)

module.exports = router;
