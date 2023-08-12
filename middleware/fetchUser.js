const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

const fetchUser =(req,res,next)=>{

    
    const token = req.cookies.authtoken ;
    
    // console.log(token)
    if(!token){
        
    return res.status(401).send({error: 'No Token provided'})
    }
    try {
        const data=jwt.verify(token, JWT_SECRET);
        // console.log(data.user.name);

        req.user = data.user;
        next();
    } catch (error) {
        
        // console.log(error)
        res.status(401).send({error: 'Please authenticate using valid token'})
    }
}

module.exports = fetchUser;



    


  