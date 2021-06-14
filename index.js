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



app.listen(3000, () => console.log('Example app is listening on port 3000.'));