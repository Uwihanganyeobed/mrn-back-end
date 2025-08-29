import Book from "../models/Book.js";

//GET books
export const getAllBooks = async (req, res) => {
  try {
    const data = await Book.find();
    res.status(200).json({ data });
  } catch (error) {
    res.status(401).json("Error fetching books:", error);
  }
};
//Create a book
export const createBook = async (req, res) => {
  try {
    const { title, author, publishedDate, genre, price } = req.body;
    const data = new Book({
      title,
      author,
      publishedDate,
      genre,
      price,
    });
    await data.save();
    res.status(200).json(data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating book", error: error.message });
  }
}
//GET book by id
export const getBook = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Book.findById(id);
    return res.status(202).json(data);
  } catch (error) {
    res.status(500).json("Error fetching book by id:", error);
  }
};
//PUT book by id
export const updateBook = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, author, publishedDate, genre, price } = req.body;
    const data = await Book.findByIdAndUpdate(
      id,
      { title, author, publishedDate, genre, price },
      { new: true }
    );
    return res.status(200).json({ message: "Book updated", data });
  } catch (error) {
    res.status(500).json("Error updating book by id:", error);
  }
}
//DELETE book by id
export const deleteBook = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Book.findByIdAndDelete(id);
    return res.status(200).json({ message: "Book deleted", data });
  } catch (error) {
    res.status(500).json("Error deleting book by id:", error);
  }
}
