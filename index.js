const express = require('express');
const app = express();
const path = require('path')

app.use(express.static(path.join(__dirname, '/public')))


app.set('view engine', 'ejs')
app.set('views',path.join(__dirname, '/views'))



app.get('/',(req,res)=> {
    res.render('home.ejs')

}) 


app.get('/reg',(req,res) => {
    res.render('linear/index.ejs')
    
})

app.get('/log',(req,res) => {
    res.render('logistic/index.ejs')
    
})
app.get('/income',(req,res) => {
    res.render('tf-to-tfjs/index.ejs')
    
})

app.listen(3000,()=> {

    console.log("LISTENING ON PORT 3000")
})
