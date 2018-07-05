const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/dbLocation";

class PlaceDB{
        addPlace(place){
            return new Promise((resolve,reject)=>{
                MongoClient.connect(url).then((db)=>{
                    let dbConn= db.db('dbLocation');
                    dbConn.collection('collection').insertOne(place).then((val)=>{
                        const message= d.insertedCount + " document(s) inserted successfully";
                        console.log(message);
                        db.close();
                    }).catch((err)=>{
                        console.log(err.message);
                        db.close();
                        reject(err.message);
                    });
                }).catch((err)=>{
                    console.log(err.message);
                    reject(err.message);
                });
            });
        }
 
        static getPlaces(id){
            return new Promise((resolve,reject)=>{
                MongoClient.connect(url).then((db)=>{
                    let dbConn = db.db('dbLocation');
                    dbConn.collection('collection').find({_id:new ObjectId(id)}).toArray(function(err,result){
                        if(err){
                            reject('Unable to reterive data from database');
                        }
                        db.close();
                        Console.log('Successfully retrived data from database');
                        resolve(JSON.stringify(result,null,'\t'));
                    });
                }).catch((err)=>{
                    reject(err.message);
                });
            })
        }

        static findNearestLoc(lat, long){
            return new Promise((resolve, reject)=>{
                MongoClient.connect(url).then((db)=>{
                    let dbConn = db.db('dbLocation');
                    //dbo.collection(collection).createIndex({location:"2d"});
                    dbConn.collection('collection').find({
                        location:{
                        $near:{
                            "$geometry":{
                                "type": "Point",
                                "coordinates": [
                                    lat,
                                    long
                                ]
                            },
                            $maxDistance:8000
                        }
                    }
                }).toArray(function(err, result) {
                        if (err) {
                            reject(err.message);
                        }
                        db.close();
                        console.log('Successfully reterived data from database');
                        console.log(JSON.stringify(result));
                        resolve(JSON.stringify(result, null, '\t'));
                      });  
                }).catch((err)=>{
                    reject(err.message);
                });
            })
        }
    }
    
    module.exports=PlaceDB;