var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var crypto = require('crypto');
var bodyParser= require('body-parser');

var config={
    username:'mujahirabbasi',
    database:'mujahirabbasi',
    host:'db.imad.hasura.io',
    port:'5432',
    password:process.env.DB_PASSWORD
    };
var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());


var pool = new Pool(config);
app.get('/test-db',function(req,res){
    pool.query('SELECT * FROM test', function(err, result) {
      
      if(err) {
          res.status(500).send(err.toString());
      }
    else
    {
        res.send(JSON.stringify(result.rows));
    }
    });
    });


var articles={
    'About':{
         title:'About',
    heading: 'h',
    date:'sep 21,2016',
    content: 
    ` <p>
   
 <h1>ABOUT</h1>
 
 <div >
 <img  src="https://pbs.twimg.com/profile_images/799658699195224064/8i2lKjhm.jpg" class="img-medium1" height="120" width="120" />
 <h3>Personal</h3>
 <div>Hi, My name is Mujahir Hussain Abbasi</div>
 </hr>
  <h3>Qualification</h3>
  <div>I'm a final year engineering student majoring in Information Technology  </div>
 </hr>
 <div>Hi, My name is Mujahir Hussain Abbasi</div>
  <h3>Area of Interst</h3>
  <div>I'm deeply interested in Android development and have developed some apps also </div>
 </hr>
 
 
 </div>
    </p>`
    },
    'Register':{
        title:'Register',
    heading: 'h',
    date:'sep 11,2016',
    content:
   
        `<p>
         <div class="container">
<div class="header">
 <h1>REGISTER</h1>
 </div>

 

 <ul>
 <li>Username: <input class="username" type="text" name="username">
 </li>
<li>Email Id: <input class="username" type="text" name="username">
 </li>
 

<li>Password: <input class="password" type="password" name="password">
 </li>
 
 <li>Confirm Password: <input class="password" type="password" name="password">
 </ul>


<input type="button" class="submit" value="Log In" name="submit" onclick="validate()">


</form>
</div>
                This is  a content for second article.
            </p>`    
    
},
    'Login':{
        title:'Login',
    heading: 'g',
    date:'sep 1,2016',
    content: 
    `<p>
    <div class="container">
<div class="header">
 <h1>LOGIN</h1>
 </div>

 <form name="login" onsubmit="return validateForm() ;" method="post">

 <ul>
 <li>Username: <input class="username" type="text" name="username">
 </li>

 <li>Password: <input class="password" type="password" name="password">
 </li>
 </ul>

<input type="button" class="submit" value="Log In" name="submit" onclick="validate()">


</form>
</div>

</p>`
            
    }
};
function createTemplate (data){
var title=data.title;
var date=data.date;
var heading=data.heading;
var content=data.content;
var htmlTemplate=`<html>
    <head>
        <title>
            ${title}
        </title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
         <link href="/ui/style.css" rel="stylesheet" />
    </head>
        <body>
        <div class =container>   
            <div>
            <a href="/">Home</a>
            </div>
            <h3>
                ${heading}
            </h3>
            <div>
                ${date}
            </div>
            <hr/>
            <div>
            ${content}  
            </div>
        </div>    
        </body>
</html>
`;
return htmlTemplate;
}
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});



function hash(input,salt){
    var hashed = crypto.pbkdf2Sync(input,salt,10000,512,'sha512');
    return ["pbkdf2","10000",salt,hashed.toString('hex')].join('$');
}
app.get('/hash/:input',function(req,res){
    var hashedString=hash(req.params.input,'this-is-a-random-string');
    res.send(hashedString);
});

app.post('/create-user',function(req,res){
   
     var username=req.body.username;
     var password=req.body.password;
     var salt=crypto.randomBytes(128).toString('hex');
    var dbString = hash(password,salt);
    pool.query('INSERT INTO "user"(username,password)VALUES($1,$2)',[username,dbString],function(err,result) {
        
        if(err) {
          res.status(500).send(err.toString());
      }
    else
    {
        res.send('User succesfully created'+username);
    }
    
    });
});


app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});
app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/mujahir.jpg', function (req, res) {
 res.sendFile(path.join(__dirname, 'ui', 'mujahir.jpg'));
});
app.get('/:articleName',function(req,res){
var articleName=req.params.articleName;
res.send(createTemplate(articles[articleName]));
});

var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
