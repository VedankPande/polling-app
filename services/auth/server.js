const express = require('express');
const jwt =  require('jsonwebtoken');
const bcrypt = require('bcrypt');

require('dotenv').config()

const app = express()

app.get('/',(req,res) => {
    res.send('GeeksforGeeks');
})
  
const PORT = 5000;
  
app.listen(PORT,() => {
    console.log(`Running on PORT ${PORT}`);
})
