const mongoose=require('mongoose');

module.exports=()=>{

    mongoose.connect('mongodb://movie_admiral:salopa44@ds157422.mlab.com:57422/movie-api',{useMongoClient:true});

    mongoose.connection.on('open',()=>{
        console.log('MongoDB:Connected');
    });

    mongoose.connection.on('error',(err)=>{
        console.log('error',err);
    });
    mongoose.Promise=global.Promise;

};