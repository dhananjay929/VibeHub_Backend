const mongoose = require("mongoose");
const config = require('./config');


MONGO_URI=config.MONGO_URI;
const connectToMongo= async()=>{
    try{
        
        await mongoose.connect(MONGO_URI,{
            
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
        )
        console.log('Connected to Mongo succesfully')
}
catch(err)
{
    console.log(err);
}
}


module.exports= connectToMongo;