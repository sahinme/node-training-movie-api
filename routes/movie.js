const express = require('express');
const router = express.Router();

//include Models
const Movie=require('../models/Movie');


//list all movies
router.get('/',(req,res)=>{
  const promise=Movie.aggregate([

    {
      $lookup:{
        from:'directors',
        localField:'director_id',
        foreignField:'_id',
        as:'director'
      }
    },
      {
        $unwind:'$director'
      }
    
  ]);    
  promise.then((data)=>{
    res.json(data);
  }).catch((err)=>{
    res.json(err);
  })
});


// list top10 movies
router.get('/top10',(req,res)=>{
  const promise=Movie.find({ }).limit(10).sort({imdb_score:-1});
  promise.then((data)=>{
    res.json(data);
  }).catch((err)=>{
    res.json(err);
  });

});


router.get('/:movie_id',(req,res,next)=>{
  const promise=Movie.findById(req.params.movie_id);
  promise.then((data)=>{
    if(!data)
    next({message:'the movie was not found'});

    res.json(data);
  }).catch((err)=>{
    res.json(err);
  });

});

router.put('/:movie_id',(req,res,next)=>{
  const promise=Movie.findByIdAndUpdate(req.params.movie_id,req.body,{new:true});
  promise.then((data)=>{
    if(!data)
    next({message:'the movie was not found'});
    res.json(data);

  }).catch((err)=>{
    res.json(err);
  });
});

router.delete('/:movie_id',(req,res,next)=>{
  const promise=Movie.findByIdAndRemove(req.params.movie_id);
  promise.then((data)=>{
    if(!data)
    next({message:'the movie was not found'});
    res.json({message:'the movie was deleted!'});

  }).catch((err)=>{
    res.json(err);
  });
});

router.post('/', function(req, res, next) {
  //const {title,imdb_score,category,country,year}=req.body;

  const movie=new Movie (req.body); 

  /*({
    title:title,
    imdb_score:imdb_score,
    category:category,
    country:country,
    year:year
  }); */
  /*movie.save((err,data)=>{
    if(err)
    res.json(err);

    res.json(data);

  });*/

  const promise=movie.save();

    promise.then((data)=>{
      res.json(data);
    }).catch((err)=>{
      res.json(err);
    });
});
  // Between

router.get('/between/:start_year/:end_year',(req,res)=>{
    const {start_year,end_year}=req.params;
    const promise=Movie.find({
          year:{"$gte":parseInt( start_year),"$lte":parseInt( end_year)}
    });
    promise.then((data)=>{
      res.json(data);
     }).catch((err)=>{
      res.json(err);
     });
});

module.exports = router;
