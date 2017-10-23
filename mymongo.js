#!/usr/bin/mongo
conn = new Mongo();
db = conn.getDB("test");
print(db.sdt.find().count());
printjson(db.adminCommand('listDatabases'));
printjson(db.sdt.stats());
db.sdt.find({ID:'GUE0000001037',TAG:"TDD_STR"}).sort({DT:-1}).limit(1).pretty()
db.sdt.aggregate(
   [
      { $match: { TAG: {$eq: "0"} } },
      {
        $group : {
           _id : "$ID",
           count: { $sum: 1 },
           latest: { $max: "$DT" }
           //DevName: { $concat: "$DevName" }
        }
      }
   ]
)
db.sdt.aggregate(
   [
      { $match: { ID: {$eq: "DSS"}, TAG: {$eq: "wifi"} } },
      { $sort: { DT : -1} } ,
      { $limit: 4},
      {
        $group : {
           _id : null,
           atoms : { 
                $push: {
                      ID: "$ID",
                      BadHours: "$BadHours",
                      DevName: "$DevName"}
              }
         }
      }
   ]
)
