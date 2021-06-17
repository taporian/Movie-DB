const express = require('express');
const router = express.Router();
// posts model

const Posts = require('../../models/Posts');

// @routes  GET  /
router.get('/test', (req, res) => {

    try{
       
        res.status(200).json('ok.');

    }
    catch(err){
        res.status(400).json({msg:err})
    }
    
  });
// @routes  GET  /time
// @desc GET the time

  router.get('/time', (req, res)=>{
    var date = new Date();
    const response = {
        status:200, message:date.getHours()+":"+date.getMinutes()
    };
    res.send(response);

});
// @routes  GET  /hello/:id 
// @desc GET the hello

router.get('/hello/:id', (req, res)=>{
    
    const response = {
        status:200, message:"Hello, "+req.params.id+"!"
    };
    res.send(response);

});
// @routes  GET  /hello without id
// @desc GET the hello

router.get('/hello/', (req, res)=>{
    
    const response = {
        status:200, message:"Hello, !"
    };
    res.send(response);

});
// @routes  GET  /search
// @desc GET the search

router.get('/search', (req, res)=>{
    const search = req.query.s;
    if(search==""){
        res.status(500);
        res.send({status:500, error:true, message:"you have to provide a search"})
    }

   
    res.send({status:200, message:"ok", data:search});

});


// @routes  GET  /movies/read
// @desc GET All post
router.get('/movies/read', async (req,res) => {
    try{
        const posts= await Posts.find();
        if(!posts) throw Error('No Movies');
        res.status(200).json(posts);

    }
    catch(err){
        res.status(400).json({msg:err})
    }
})
// @routes  GET  /movies/read/by-date
// @desc GET All movies ORDERED BY DATE

router.get('/movies/read/by-date', async (req, res)=>{

    try{
        const posts= await Posts.find();
        if(!posts) throw Error('No Movies');
        posts.sort(function(a, b) {
            var dateA = new Date(a.year), dateB = new Date(b.year);
            return dateA - dateB;
        });
        res.status(200).json(posts);

    }
    catch(err){
        res.status(400).json({msg:err})
    }
    
    

});
// @routes  GET /movies/read/by-rating
// @desc GET All movies ORDERED BY RATING high to low

router.get('/movies/read/by-rating', async (req, res)=>{
    try{
        const posts= await Posts.find();
        if(!posts) throw Error('No Movies');
        posts.sort(function(a, b) {
            return b.rating - a.rating;
        });
        res.status(200).json(posts);

    }
    catch(err){
        res.status(400).json({msg:err})
    }
    
   
  

});
// @routes  GET /movies/read/by-title
// @desc GET All movies ORDERED BY TITLE A-Z

router.get('/movies/read/by-title', async (req, res)=>{
    try{
        const posts= await Posts.find();
        if(!posts) throw Error('No Movies');
        posts.sort(function(a, b) {
        
            var titleA = a.title.toLowerCase(), titleB = b.title.toLowerCase();
            if (titleA < titleB) return -1;
            if (titleA > titleB) return 1;
            return 0;
        });
        res.status(200).json(posts);

    }
    catch(err){
        res.status(400).json({msg:err})
    }
    

});

// @routes  GET  movies/read/id/:id
// @desc GET An post

router.get('/movies/read/id/:id', async (req,res)=>{
    try{
      const post = await Posts.findById(req.params.id);
      if(!post) throw Error('No ID')
      res.status(200).json(post)
    }
    catch(err){
      res.status(404).json({msg:'the movie '+req.params.id+' does not exist'})
    }
  });


// @routes  POST  /movies/add
// @desc Create An post

router.post('/movies/add', async (req,res)=>{
    
    
    try {
        const newMovie = new Posts({
            title: req.body.title,
            year: req.body.year ,
            rating: req.body.rating  ,
        });
         newMovie  = await newMovie.save()
        res.status(201).json(newMovie)
    } catch(err){
        res.status(400).json({message: err.message })

    }
});


// @routes  DELETE movies/delete:id
// @desc delete An post

router.delete('/movies/delete/:id', async (req,res)=>{
  try{
    
    const post = await Posts.findByIdAndDelete(req.params.id);
    const posts = await Posts.find();
    const postss = {success:true,posts}
    if(!post) throw Error('No post found!')
    res.status(200).json(postss)
   
  }
  catch(err){
    res.status(400).json({msg:'the movie '+req.params.id+' does not exist'})
  }
});


// @routes  UPDATE  /movies/update/:id
// @desc update An post

router.patch('/movies/update/:id', async (req,res)=>{
    try{
    
      const post = await Posts.findByIdAndUpdate(req.params.id,req.body);
      if(!post) throw Error('Something went wrong while updating the movie')
      res.status(200).json({success:true})
    }
    catch(err){
      res.status(400).json({msg:err})
    }
  });

module.exports = router;