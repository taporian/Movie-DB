const { Router } = require('express');
const express = require('express');

const app = express();

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




app.listen(3000, () => console.log('Example app is listening on port 3000.'));