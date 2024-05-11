const express = require('express');
app = express();
port = process.env.Port || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');

const cors = require('cors');
app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://dbuser2:v8ERc49mGZRUKNFS@cluster0.ypbjopw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    const database =  client.db("sanp-lense");
    const productsCollection = database.collection('products');
    const product = {
        name: 'apple',
        detail: 'apple detail'
    }
    productsCollection.insertOne(product)

    app.get('/products', async(req,res)=>{
      const cursor = productsCollection.find({});
      const products = await cursor.toArray();
      res.json(products)
    })
    .then(console.log('insert success'))
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/',(req,res)=>{
    res.send('running my crud')
})

app.listen(port, ()=>{
    console.log('running server on port', port);
})