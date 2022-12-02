const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { ObjectId } = require('mongodb');
const MongoClient = require('mongodb').MongoClient;
const jwt = require('jsonwebtoken');
const bcrept = require('bcryptjs');
const auth = require('./auth');
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
const url = "mongodb://vrushmongodb:oxb6Zbz9DH4ywByVBI26azmexKZzMI09Qmz147vQC9ftOOWCgOSr1kRwHDcV7wHSBrSfsoisM0XqACDbMzY4dQ==@vrushmongodb.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@vrushmongodb@";

const client = new MongoClient(url);
client.connect().then(() => { console.log('Db connected') });
const db = client.db(`newinventory`);

//get all
app.get('/item/:type', auth, async (req, res) => {
    const { offset, limit } = req.query;
    const collection = db.collection(req.params.type);
    const totalCount = await collection.count();
    const items = await collection.find().skip(+offset).limit(+limit).toArray();
    res.send({ items: items, totalCount: totalCount });

});
// create
app.post('/item/:type', auth, async (req, res) => {
    const collection = db.collection(req.params.type);
    const query = { };
    const update = { $set: req.body };
    const options = {upsert: true, new: true};

    if(req.params.type === "users"){
        query['email'] = req.body.email;
        const salt = await bcrept.genSalt(10);
        const hashedPassword = await bcrept.hash(req.body.password,salt)
        update['$set'] = { ...req.body, password: hashedPassword };
    }else{
        query['title'] = req.body.title;
        update['$set'] = req.body;
    }

    const item = await collection.updateOne(query, update, options);
    res.send(item);

})
// //update
app.post('/item/:type/:id', auth, async (req, res) => {
    const collection = db.collection(req.params.type);
    const query = { _id: ObjectId(req.params.id)};
    const update = { };
    const options = {upsert: true, new: true};

    if(req.params.type === "users"){
        const salt = await bcrept.genSalt(10);
        const hashedPassword = await bcrept.hash(req.body.password,salt)
        update['$set'] = { ...req.body, password: hashedPassword };
    }else{
        update['$set'] = req.body;
    }

    const item = await collection.updateOne(query, update, options);
    res.send(item);

})
// //find
app.get('/item/:type/:id', auth, async (req, res) => {

    const collection = db.collection(req.params.type);

    const item = await collection.findOne({
        _id: ObjectId(req.params.id)
    });
    res.send(item);
})
// //delete
app.delete('/item/:type/:id', auth, async (req, res) => {

    const collection = db.collection(req.params.type);
    await collection.deleteOne({
        _id: ObjectId(req.params.id)
    });
    res.send({ message: 'success', code: 204 });
})

app.post('/search', auth, async (req, res) => {

    const collectionBooks = db.collection('books');
    const collectionGames = db.collection('games');
    const collectionGifts = db.collection('gifts');
    const collectionMaterials = db.collection('materials');

    const books = await collectionBooks.find({"title": { $regex : req.body.title }}).toArray();
    const games = await collectionGames.find({"title": { $regex : req.body.title }}).toArray();
    const gifts = await collectionGifts.find({"title": { $regex : req.body.title }}).toArray();
    const materials = await collectionMaterials.find({"title": { $regex : req.body.title }}).toArray();

    res.send({
        data: [
            ...books,
            ...gifts,
            ...games,
            ...materials
        ],
        counts: [
            books.length,
            gifts.length,
            games.length,
            materials.length
        ]
    });
});

app.get('/statistic', async (req, res) => {

    const collectionBooks = db.collection('books');
    const collectionGames = db.collection('games');
    const collectionGifts = db.collection('gifts');
    const collectionMaterials = db.collection('materials');

    const totalCount1 = await collectionBooks.count();
    const totalCount2 = await collectionGames.count();
    const totalCount3 = await collectionGifts.count();
    const totalCount4 = await collectionMaterials.count();

    res.send({
        books: totalCount1,
        games: totalCount2,
        gifts: totalCount3,
        materials: totalCount4
    });

});

app.post('/signup', async(req,res)=>{
    const emailExist = await db.collection('users').find({email: req.body.email}).toArray()
    if(emailExist.length){
        return res.status(400).json({
            title:'Email already Exists',
            error:'Email already Exists'
        })
    }

    //Hash passwords
    const salt = await bcrept.genSalt(10);
    const hashedPassword = await bcrept.hash(req.body.password,salt)


    const collection = db.collection('users');
    const query = { email: req.body.email };
    const update = { $set: {
            password: hashedPassword,
            email: req.body.email,
            type: req.body.type,
            full_name: req.body.full_name,
            phone: req.body.phone,
        }
    };
    const options = {upsert: true, new: true};
    const user = await collection.updateOne(query, update, options);
    res.send(user);
})
/**
 * LOGIN
 */
app.post('/signin',async( req, res )=>{
    // Checking if the uemail exists
    const userData = await db.collection('users').find({email: req.body.email}).toArray();
    const user = userData[0];
    if(!user){
        return res.status(401).send('Email or password is wrong')
    }
    //Password is correct
    const validPass = await bcrept.compare(req.body.password, user.password);
    if(!validPass){
        return res.status(401).send('Email or password is wrong')
    }
    // Create and assign a token
    const token = jwt.sign({_id:user._id},'asjhdasjhcasjkcnajksdcasklcmlk342r34ufjo',{expiresIn:'1h'})
    return res.status(200).json({
        title:'Login success',
        token:token,
        user: {
            _id: user._id,
            email: user.email,
            type: user.type,
            full_name: user.full_name
        }
    })
})
/**
 * get user data
 */
app.get('/auth/user', auth, async( req, res )=>{
    const userData = await db.collection('users').findOne({
        _id: ObjectId(req.user._id)
    });
    return res.status(200).json({user: {
            _id: userData._id,
            email: userData.email,
            full_name: userData.full_name,
            type: userData.type
        }});
})

app.listen(5000);

module.exports = app