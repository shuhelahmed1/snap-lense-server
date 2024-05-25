const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

const { MongoClient, ServerApiVersion } = require('mongodb');

const cors = require('cors');
app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://dbuser2:v8ERc49mGZRUKNFS@cluster0.ypbjopw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect(); // Ensures the client connects before proceeding
    const database = client.db("sanp-lense");
    const productsCollection = database.collection('products');
    
    // Insert a product for testing purposes
    const product = {
        name: 'apple',
        detail: 'apple detail'
    };
    await productsCollection.insertOne(product); // Added 'await' to ensure proper insertion

    // Endpoint to get products
    app.get('/products', async (req, res) => {
      try { // Added try-catch block to handle errors gracefully
        const cursor = productsCollection.find({});
        const products = await cursor.toArray();
        res.json(products);
      } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).json({ error: 'Failed to fetch products' }); // Return a proper error message
      }
    });

    console.log('Insert success'); // Moved the console log outside of .then()
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (err) {
    console.error('Failed to connect to MongoDB', err); // Catch connection errors
  }
}
run().catch(console.dir); // Handles any unhandled promise rejections

app.get('/', (req, res) => {
    res.send('running my crud');
});

app.listen(port, () => {
    console.log('running server on port', port);
});
