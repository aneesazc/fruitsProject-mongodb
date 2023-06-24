const { MongoClient } = require("mongodb");
 
// We pass our local host as our host.
const uri =
    "mongodb://127.0.0.1:27017";
 
//passes the mongoclient as our client to connect
const client = new MongoClient(uri);
 
//creates our database name
const database = client.db('fruitsDB');
//creates the database collection's name
const fruits = database.collection('fruits');
 
async function run() {
    try {
        //connects to the server
        await client.connect();
        //shows that we have connected on our console
        console.log("Connected Successfully to server");
 
        //creates the db's content
        const contentOf = [{
            fruit: "Apple",
            rating: 4,
            review: "I like it when it's sweet!"
        }, {
            fruit: "Banana",
            rating: 5,
            review: "My favorite!"
        },
        {
            fruit: "Orange",
            rating: 2,
            review: "Not appealing for me... Seems like I need to run to the toilet afterwards..."
        }]
 
        //orders the items
        const options = { ordered: true }
 
        const result = await fruits.insertMany(contentOf, options);
        console.log(`${result.insertedCount} documents were inserted`);
 
        //show all the fruits existing
        const allFruits = fruits.find();
 
        //displays the documents if there's any
        await allFruits.forEach((document) => {
            console.log(document);
        });
 
 
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
 
run().catch(console.dir);