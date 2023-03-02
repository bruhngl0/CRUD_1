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

        
        


        // make sure to use body-parser before handlers
        app.set('view engine', 'ejs')
        app.use(bodyParser.urlencoded({extended : true}))
        app.use(express.static('public'))
        app.use(bodyParser.json())

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

        app.put('/quotes',(req,res)=>{
            goatCollection.findOneAndUpdate(
                {name: 'aditya' },
                {
                    $set: {
                        name: req.body.name,
                        quote: req.body.quote
                    }
                },
                {
                    usert: true
                }

            )

                .then(result => {
                    res.json('success')
                })
                .catch(error => console.error(error))
        })


        app.delete('/quotes', (req,res) =>{
            goatCollection.deleteOne(
                {name: req.body.name}
            )

                .then(result => {
                    if(result.deletedCount === 0){
                        return res.json('No quote to delete')
                    }
                    res.json('deleted quotes')
                })
                .catch(error => console.error(error))

        })


        app.listen(2121, (req,res)=>{
            console.log("live on port 2121")
        })  
            })
   .catch(error=> console.log(error))





