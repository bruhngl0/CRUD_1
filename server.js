const express = require('express');
const bodyParser = require("body-parser")
const MongoClient = require('mongodb').MongoClient
const app =express();

let db,
    dbConnectionStr = 'mongodb+srv://adityashrm500:anonymous0z@cluster0.dn46rqb.mongodb.net/?retryWrites=true&w=majority',
    dbName = 'quotes'

MongoClient.connect(dbConnectionStr, {useUnifiedTopology:true})
    .then(client => {
        console.log(`connected to ${dbName} database`)
        db = client.db(dbName)
        const goatCollection = db.collection('goat')

        app.set('view engine', 'ejs')
        


        // make sure to use body-parser before handlers
        app.use(bodyParser.urlencoded({extended : true}))

        //handlers
        app.get("/",(req,res)=>{
          
            db.collection('goat').find().toArray()
                .then(results=>{
                    res.render('index.ejs', { goat : results})
                })
                .catch(error=>console.error(error))
            
        })

        app.post('/quotes',(req,res)=>{
           goatCollection.insertOne(req.body)
            .then(result =>{
                res.redirect('/')
            })
            .catch(error => console.error(error))
        })


        app.listen(2121, (req,res)=>{
            console.log("live on port 2121")
        })  
            })
   .catch(error=> console.log(error))





