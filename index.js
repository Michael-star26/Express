var express=require('express')
var app=express()
var handlebars=require('express-handlebars').create({defaultLayout:'main'})
app.engine('handlebars',handlebars.engine)
app.set('view engine','handlebars')
app.set('port',process.env.PORT||3000)
app.use(express.static(__dirname + '/public'))
const bodyParser=require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(require('cors')())
const dotenv = require('dotenv').config()

const session = require('express-session')
app.use(require('cookie-parser')(credentials.cookieSecret))
app.use(session({
    secret:process.env.SESSION_SECRET,
    resave:true,
    saveUninitialized:true
}))

app.post('/form_post',function(req,res){
    console.log(req.body)
})
app.get('/',function(req,res){
    res.render('home',{title:'Welcome'})
})
app.get('/login',function(req,res){
    res.render('login',{title:'login'})
})

app.get('/signup',function(req,res){
    res.render('signup',{title:'signup'})
})

app.use(function(req,res,next){
    res.status(404)
    res.render('404')  
})

app.use(function(err,req,res,next){
    console.error(err.stack)
    res.status(500)
    res.render('500')
})

app.listen(app.get('port'),function(){
    console.log("App running on http://localhost:" + app.get('port') + " Press Ctrl+C to stop")
})
