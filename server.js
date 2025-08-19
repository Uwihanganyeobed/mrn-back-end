import express from 'express'
import mongoose from 'mongoose'
import mongodb from 'mongodb'
import dotenv from 'dotenv'

dotenv.config()
//initialize express app
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//connection with mongodb
mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err))

//create a schema for our books
const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    publishedDate: { type: Date, required: true },
    genre: { type: String, required: true },
    price: { type: Number, required: true }
})
//create a model for our books
const Book = mongoose.model('books', bookSchema)


app.get('/', (req, res) => {
    res.send('Welcome to the Book Management APIs')
})

//GET books
app.get('/books', async(req,res)=>{
    try {
        const books = await Book.find()
        res.status(200).json(books)
    } catch (error) {
        res.status(401).json('Error fetching books:', error)
    }
})

app.post('/books', async(req, res) => {
    try {
    const {title, author, publishedDate, genre, price} = req.body;
    const newBook = new Book({
        title,
        author,
        publishedDate,
        genre,
        price
    })
    await newBook.save()
    res.status(200).json(newBook)
    
    } catch (error) {
        res.status(500).json({ message: 'Error creating book', error: error.message })
        
    }
})

//POST book
//GET book by id
//PUT book by id    
//DELETE book by id

app.listen(process.env.PORT, () =>console.log(`Server is running on port ${process.env.PORT}`))
