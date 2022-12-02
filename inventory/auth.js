const jwt = require('jsonwebtoken')
const {ObjectId, MongoClient} = require("mongodb");

const url = "mongodb://newinventory:TgCL0gHQjtZkQAkfkXpNDBFka8Vxpi2BHp68FAN6g5ej4tJmBmcSUidlFP3tphsZd1DcqKKgH0RlACDb0L2NVw==@newinventory.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&maxIdleTimeMS=120000&appName=@newinventory@";

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
            res.status(401).send('Unauthorized');
        }
        next();
    } catch (error) {
        res.status(400).send('Invalid Token')
    }
}