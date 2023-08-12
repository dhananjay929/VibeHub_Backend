module.exports = {
    MONGO_URI: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/loginsignup',
    PORT: process.env.PORT || 5000,
    JWT_SECRET : process.env.JWT_SECRET||"DJisaGreatGuy"

  };
  