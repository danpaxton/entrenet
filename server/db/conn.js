const { MongoClient } = require("mongodb");
const client = new MongoClient(process.env.ATLAS_URI);
 
var _db;
 
module.exports = {
  connectToServer: async (callback) => {
    try {
      await client.connect();
    } catch (e) {
      console.error(e);
    }
    
    _db = client.db("entrenet");
    return (_db === undefined ? false : true);
  },
  getDb: () => {
    return _db;
  },
};