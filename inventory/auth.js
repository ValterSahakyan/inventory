const jwt = require('jsonwebtoken')
const {ObjectId, MongoClient} = require("mongodb");

const url = "mongodb://vrushmongodb:oxb6Zbz9DH4ywByVBI26azmexKZzMI09Qmz147vQC9ftOOWCgOSr1kRwHDcV7wHSBrSfsoisM0XqACDbMzY4dQ==@vrushmongodb.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@vrushmongodb@";

const client = new MongoClient(url);
client.connect().then(() => {});
const db = client.db(`newinventory`);


module.exports = async function(req,res,next){
    const token = req.header('x-access-token')

    if(!token){
        return res.status(401).send('Access Denied')
    }
    try {
        req.user = jwt.verify(token,'asjhdasjhcasjkcnajksdcasklcmlk342r34ufjo');

        const userData = await db.collection('users').findOne({
            _id: ObjectId(req.user._id)
        });

        if(req.params.type === 'users' && userData.type !== 'admin'){
            return res.status(401).send('Unauthorized');
        }
        next();
    } catch (error) {
        res.status(400).send('Invalid Token')
    }
}