import express from "express";

import { getAllBooks,getBook,
    updateBook,deleteBook,
    createBook } from "../controllers/bookController.js";
import authProtector from "../middleware/authProtector.js";
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

const router = express.Router()

router.get('/',getAllBooks)
router.post('/',authProtector, createBook)
router.get('/:id',getBook)
router.put('/:id',authProtector,updateBook)
router.delete('/:id',authProtector,deleteBook)

export default router;
