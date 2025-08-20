import express from 'express'
import mongoose from 'mongoose'
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
        const data = await Book.find()
        res.status(200).json({data})
    } catch (error) {
        res.status(401).json('Error fetching books:', error)
    }
})

app.post('/books', async(req, res) => {
    try {
    const {title, author, publishedDate, genre, price} = req.body;
    const data = new Book({
        title,
        author,
        publishedDate,
        genre,
        price
    })
    await data.save()
    res.status(200).json(data)
    
    } catch (error) {
        res.status(500).json({ message: 'Error creating book', error: error.message })
        
    }
})

//GET book by id

app.get('/books/:id', async(req, res) => {
    try {
        const id = req.params.id;
        const data = await Book.findById(id);
        return res.status(202).json(data);
    } catch (error) {
        res.status(500).json('Error fetching book by id:', error)
    }
})

//PUT book by id    
app.put('/books/:id', async(req, res) => {
    try {
        const id = req.params.id;
        const {title, author, publishedDate, genre, price} = req.body;
        const data  = await Book.findByIdAndUpdate(
            id,{ title, author, publishedDate, genre, price },
            { new: true }
        )
        return res.status(200).json({message: 'Book updated',data});
    } catch (error) {
        res.status(500).json('Error updating book by id:', error)
    }
})

//DELETE book by id

app.delete('/books/:id', async(req, res) => {
    try {
        const id = req.params.id;
        const data = await Book.findByIdAndDelete(id);
        return res.status(200).json({message: 'Book deleted', data});
    } catch (error) {
        res.status(500).json('Error deleting book by id:', error)
    }
})


app.listen(process.env.PORT, () =>console.log(`Server is running on port ${process.env.PORT}`))


