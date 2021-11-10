const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://saidinesh898:Arrowtine10@aws-mum-cluster.hvt8w.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    const collection = client.db("test").collection("devices");
    // perform actions on the collection object
    client.close();
});