const e = require('express');
const { Router, response } = require('express');
const express = require('express');
const router = express.Router()

const app = express();
const movies = [
    { title: 'Jaws', year: 1975, rating: 8 },
    { title: 'Avatar', year: 2009, rating: 7.8 },
    { title: 'Brazil', year: 1985, rating: 8 },
    { title: 'الإرهاب والكباب‎', year: 1992, rating: 6.2 }
]


app.get('/', (req, res) => {
  res.send('ok.');
});


app.get('/test', (req, res)=>{
    const response = {
        status:200, message:"test"
    };
    res.send(response);

});
app.get('/time', (req, res)=>{
    var date = new Date();
    const response = {
        status:200, message:date.getHours()+":"+date.getMinutes()
    };
    res.send(response);

});
app.get('/hello/:id', (req, res)=>{
    
    const response = {
        status:200, message:"Hello, "+req.params.id+"!"
    };
    res.send(response);

});
app.get('/hello/', (req, res)=>{
    
    const response = {
        status:200, message:"Hello, !"
    };
    res.send(response);

});
app.get('/search', (req, res)=>{
    const search = req.query.s;
    if(search==""){
        res.status(500);
        res.send({status:500, error:true, message:"you have to provide a search"})
    }

   
    res.send({status:200, message:"ok", data:search});

});

app.get('/movies/get', (req, res)=>{
    res.send({status:200,data:movies});

});
app.get('/movies/edit', (req, res)=>{
    

});

app.get('/movies/read/by-date', (req, res)=>{
    movies.sort(function(a, b) {
        var dateA = new Date(a.year), dateB = new Date(b.year);
        return dateA - dateB;
    });
    res.send({status:200,data:movies})

});

app.get('/movies/read/by-rating', (req, res)=>{
    movies.sort(function(a, b) {
        return b.rating - a.rating;
    });
    res.send({status:200,data:movies})

});
app.get('/movies/read/by-title', (req, res)=>{
    movies.sort(function(a, b) {
        var titleA = a.title.toLowerCase(), titleB = b.title.toLowerCase();
        if (titleA < titleB) return -1;
        if (titleA > titleB) return 1;
        return 0;
    });
    res.send({status:200,data:movies})

});
app.get('/movies/read/id/:id', (req, res)=>{
    if(!movies[req.params.id]){
        res.status(404);
        res.send({status:404, error:true, message:'the movie '+req.params.id+' does not exist'})
    }
    else{
        res.send({status:200, data:movies[req.params.id]})
    }
    

});
app.get('/movies/read',(req, res)=>{
    res.send({status:200, data:movies});

});
   
    app.get('/movies/add', (req, res) =>{

        let title = req.query.title;
        let year = req.query.year;
        let rating =req.query.rating;
        
        
        console.log(!title,!year,!rating,isNaN(year),year.length);
        if(!title==true || (!year==true || isNaN(year)==true || year.length !=4)){
            res.send({status:403, error:true, message:'you cannot create a movie without providing a title and a year'})
        }
        else if(!rating==true){
            rating=4;
            movies.push({title,year,rating});
        res.send({status:200, message:"Movie added to database tilte "+title+" Year "+year+" Rating "+rating+" /movies/read to read the database"});
        }
        else{
            movies.push({title,year,rating});
        res.send({status:200, message:"Movie added to database tilte "+title+" Year "+year+" Rating "+rating+" /movies/read to read the database"});
        }
       
        
        });
       
        app.get('/movies/delete/:id', (req, res)=>{
            if(!movies[req.params.id]){
                res.status(404);
                res.send({status:404, error:true, message:'the movie '+req.params.id+' does not exist'})
            }
            else{
                movies.splice(req.params.id, 1);
                res.send({status:200, data:movies});
            }


        });
        app.get('/movies/update/:id',(req,res)=>{
            id=req.params.id-1;
            let updateTitle,updateYear,updateRating;
            let arr={};
             if(req.query.title)updateTitle=req.query.title;
             if(req.query.year)updateYear=req.query.year;
             if(req.query.rating)updateRating=req.query.rating;
             if(updateTitle){
                 arr.title=updateTitle
             }
             if(updateYear){
                arr.year=updateYear
            }
            if(updateRating){
                arr.rating=updateRating
            }
             if(arr.hasOwnProperty('title')){
                 movies[req.params.id].title=arr.title;
             }
             if(arr.hasOwnProperty('year')){
                movies[req.params.id].year=arr.year;
            }
            if(arr.hasOwnProperty('rating')){
                movies[req.params.id].rating=arr.rating;
            }
         
            
              res.send({status:200, data:movies});
             
            });
             
              
            //  if(!movies[req.params.id]==false){
            //    params.append(req.params.id.title, title);
            //  }
            
       

        // app.get('/movies/update/:id', (req, res) => {
        //       let title = req.query.title;
        //          let year = req.query.year;
        //         let rating =req.query.rating;
        //     console.log(req.params,req.query,movies[req.params.id].title);
        //     if(!movies[req.params.id]==false){
        //         console.log('hey',req.query.title)
        //         if(title==''){
        //             console.log('title inside');
                    
                   
                    
        //         }
        //     }
        // });
                // else if(rating =='' && title!='' && year !='' ){
                //     console.log('rating inside');
                //     movies[req.params.id].year=year;
                //     movies[req.params.id].title=title;
                    
                // }
                // else if(year =='' && title!=''){
                //     console.log('year inside');
                //     movies[req.params.id].rating=rating;
                //     movies[req.params.id].title=title;
                    
                // }
                
                
            
           
            // let x=req.query.title;
            // movies[req.params.id].title=x;
            // movies.replace({title},{x});
            
            
      
        // app.get('/movies/update/:id',(req, res)=>{
        //     // let title = req.query.title;
        //     // let year = req.query.year;
        //     // let rating =req.query.rating;
            
        //     // console.log( movies[req.params.id].year);
            
            
                
        //     //     if(!movies[req.params.id]==false){
        //     //         if(!year==true){
        //     //                     movies[req.params.id].title=title;
        //     //                     res.send({status:200, data:movies});
        //     //                 }
                          
        //     //     }
        //     //       else{
        //             res.send({status:200, data:movies})
        //     //       }
                   
                
               
         
            
            

        //     // if(!movies[req.params.id]==false){
        //     //     if(!year==true){
        //     //         movies[req.params.id].title=title;
        //     //         res.send({status:200, data:movies});
        //     //     }
        //     //     else if(!year==false || !rating==false){
        //     //             if(!rating==false){
        //     //                 movies[req.params.id].rating=rating; 
        //     //                 movies[req.params.id].year=year; 
        //     //                 movies[req.params.id].title=title;
        //     //                 res.send({status:200, data:movies});
        //     //             }
                    
        //     //         movies[req.params.id].year=year; 
        //     //         movies[req.params.id].title=title;
        //     //         res.send({status:200, data:movies});
        //     //     }
                
        //     //     else{
        //     //         res.send({status:200, data:movies});
        //     //     }
  
        //     // }
        //     // else{
                
        //     //     res.send({status:200, data:movies});
        //     // }
            
        
        // });

   

   
    






app.listen(3000, () => console.log('Example app is listening on port 3000.'));