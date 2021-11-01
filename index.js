const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;


app.use(cors())
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.padbs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function run() {
    try {
        await client.connect();


        const database = client.db("tourism");
        const servicesCollection = database.collection("services");
        const userCollection = database.collection("user");

        app.post('/services', async (req, res) => {
            const service = req.body;
            console.log('hit the post api', service);
            const result = await servicesCollection.insertOne(service);
            console.log(result);
            res.json(result)
        })

        // GET API
        app.get('/item', async (req, res) => {
            const cursor = servicesCollection.find({});
            const services = await cursor.toArray();
            res.send(services);
            console.log(services);
        });

        // get all orders 
        app.get('/allOrders', async (req, res) => {
            const cursor = orderCollection.find({});
            const services = await cursor.toArray();
            console.log(services)
            res.send(services);
        });


        //    post all orders 
        app.post('/orders', async (req, res) => {
            const order = req.body;
            console.log('hit the post api');
            const result = await orderCollection.insertOne(order);
            console.log(result);
            res.json(result);

        })


    } finally {
        //         //   await client.close();
    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('Running tourism Server');
});

app.listen(port, () => {
    console.log('Running tourism Server on port', port);
})