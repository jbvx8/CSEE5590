/**
 * Created by Vijaya Yeruva on 5/27/2017.
 */
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://root:password1@ds115971.mlab.com:15971/csee5590';

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbase = db.db("csee5590");
    dbase.createCollection("Student", function(err, res) {
        if (err) throw err;
        console.log("Collection created!");
        db.close();
    });
});
