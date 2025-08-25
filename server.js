import dotenv from 'dotenv'
import app from './src/app.js'
import connectDB from './src/config/database.js'

dotenv.config();
connectDB()
const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
  console.log(`server is running on port ${PORT}`)
})