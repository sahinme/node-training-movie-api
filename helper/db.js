const mongoose=require('mongoose');

module.exports=()=>{
    mongoose.set('useCreateIndex',true);
    mongoose.connect('mongodb://movie_admiral:salopa44@ds157422.mlab.com:57422/movie-api',{ useNewUrlParser: true });

    mongoose.connection.on('open',()=>{
        console.log('MongoDB:Connected');
    });

    mongoose.connection.on('error',(err)=>{
        console.log('error',err);
    });
    mongoose.Promise=global.Promise;

};