const { Router } = require('express');
const express = require('express');

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
const router = express.Router()

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
app.get('/movies/add', (req, res)=>{
    

});
app.get('/movies/get', (req, res)=>{
    res.send({status:200,data:movies});

});
app.get('/movies/edit', (req, res)=>{
    

});
app.get('/movies/delete', (req, res)=>{
    

});



app.listen(3000, () => console.log('Example app is listening on port 3000.'));