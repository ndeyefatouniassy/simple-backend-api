const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/product.model.js');
const productRoute = require('./routes/product.route.js');
const app = express()
require('dotenv').config();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

//routes
app.use("/api/products", productRoute);




app.listen(5002, () => {
  console.log('Server is running on 5001 port yeaaah');
});

app.get('/', (req, res) => {
  res.send('Hello World from Express here we go again');
});



app.get('/api/products/:id', async(req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});




//mongoose.connect("mongodb+srv://ndeyefatouniassy:HYkxAyHMq8cZfcty@cluster0.lgnfu.mongodb.net/DevOps-project?retryWrites=true&w=majority&appName=Cluster0").then(() => {
// console.log('Connected to the database !');
//}).catch((err) => {
  //console.log('Error connecting to the database: ', err);
//});

const dbHost = process.env.DATABASE_HOST||"database" ;
const dbUser = process.env.DATABASE_USER||"fatou" ;
const dbPassword = process.env.DATABASE_PASSWORD||"passer";
const dbPort = process.env.DATABASE_PORT||"27017";

console.log(`Connecting to MongoDB at ${dbHost}:${dbPort}`);

const mongoURI = `mongodb://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/DevOps-project?authSource=admin`;
mongoose.connect(mongoURI).then(() => {
  console.log('Connected to the database !');
}).catch((err) => {
  console.log('Error connecting to the database: ', err);
});

