const { MongoClient } = require("mongodb");
const uri = "mongodb://localhost:27017";
const cli = new MongoClient(uri);

// async function run() {
//   await client.connect();
//   const adminDB = client.db("testdb").admin();
//   const listDatabases = await adminDB.listDatabases();
//   console.log(listDatabases);
//   return "OK";
// }

// run()
//   .then(console.log)
//   .catch(console.error)
//   .finally(() => client.close());

async function main() {
  console.log("start");
  try {
    await cli.connect();
    const collection = cli.db("testdb").collection("users");

    const allDocuments = await collection.find({}).toArray();
    console.log("찾은 all document", allDocuments);

    await collection.insertOne({ name: "Andy", age: 30 });
    console.log("document inserted");

    const documents = await collection.find({ name: "Andy" }).toArray();
    console.log("찾은 document", documents);

    await collection.updateOne({ name: "Andy" }, { $set: { age: 31 } });
    console.log("document updated");

    const updateDocuments = await collection.find({ name: "Andy" }).toArray();
    console.log("업데이트된 document", updateDocuments);

    await collection.deleteOne({ name: "Andy" });
    console.log("document deleted");

    await client.close();
  } catch (err) {}
}

main().then(console.log);