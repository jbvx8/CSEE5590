/**
 * Created by Vijaya Yeruva on 5/27/2017.
 */

var http = require('http');
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://root:password1@ds115971.mlab.com:15971/csee5590';

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbase = db.db("csee5590");
    var myquery = { address: 'Main Road 989' };
    dbase.collection("Student").deleteOne(myquery, function(err, obj) {
        if (err) throw err;
        console.log(obj.result.n + " document(s) deleted");
        db.close();
    });
});