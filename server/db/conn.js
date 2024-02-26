const { MongoClient } = require("mongodb");
const Db = process.env.ATLAS_URI;
const client = new MongoClient(Db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
 
var _db;
 
module.exports = {
  connectToServer: async (callback) => {
    try {
      await client.connect() 
    } catch (e) {
      console.log(e)
    }
    _db = client.db('users');
    return (_db === undefined ? false : true);
  },
  getDb: () => {
    return _db;
  },
};