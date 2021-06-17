const express = require('express')
const mongoose = require('mongoose');
const { MONGO_URI } = require('./config');

// Routes
const postsRoutes = require('./routes/api/posts')

const app = express();

//BodyParser 
app.use(express.json());

// Connect to MongoDB

mongoose.connect(MONGO_URI,{useUnifiedTopology: true ,
    useNewUrlParser:true,
    useFindAndModify:false,
})
.then(() => console.log('MovieDB connected'))
.catch((err => console.log(err)))

// User routes

app.use('/',postsRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT,() => console.log(`Server run at port ${PORT} `));