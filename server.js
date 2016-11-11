var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool=require('pg').Pool;

var config={
    username:'mujahirabbasi',
    database:'mujahirabbasi',
    host:'db.imad.hasura.io',
    port:'5432',
    password:process.env.DB_PASSWORD
    };
var app = express();
app.use(morgan('combined'));
var articles={
    'About':{
         title:'About',
    heading: 'Arcticle one',
    date:'sep 21,2016',
    content: 
    ` <p>
                this is  a content.this is  a content.this is  a content.this is  a conten.this is  a content.this is  a content.this is  a content.
            </p>    
             <p>
                this is  a content.this is  a content.this is  a content.this is  a conten.this is  a content.this is  a content.this is  a content.
    </p>`
    },
    'Search':{
        title:'Search',
    heading: 'Arcticle two',
    date:'sep 11,2016',
    content:
   
        `<p>
                This is  a content for second article.
            </p>`    
    
},
    'Login':{
        title:'Login',
    heading: '',
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
<br></br>
<input type="button" class="submit" value="Sign Up" name="submit" >
</form>
</div>
<br></br>
<br></br>
<div class="header">
 <h1>REGISTER</h1>
  <form name="login" onsubmit="return validateForm() ;" method="post">

 <ul>
 <li>First Name: <input class="username" type="text" name=""username>
 </li>
 <li>Last Name: <input class="username" type="text" name="username">
 </li>
  </li>
 <li> Email Id: <input class="username" type="text" name="username">
 </li>
 <li>Password: <input class="password" type="password" name="password">
 </li>
 </li>
 <li>Confrim Password: <input class="password" type="password" name="password">
 </li>
 </ul>
 <input type="button" class="submit" value="Sign Up" name="submit" >
 </div>

<script>
var count= 2;
function validate()
{
	var un = document.login.username.value;
	var pw = document.login.password.value;
	var valid = false;
	var usernameArray = ["Vlad", "Bob"];
	var passwordArray = ["12345", "54321"];
	for (var i = 0; i < usernameArray.length; i++)
 {
	if ((un == usernameArray[i]) && (pw == passwordArray[i]))
	{
		valid = true;
		break;
	}
}
	if (valid)
	{
		alert("Login was successful");
		window.location = "www.google.ie";
		return false;
	}
	var again = " tries";
	if (count ==1)
	{
		again = " try"
	}
	if (count >= 1)
	{
		alert("Wrong password or username")
		count--;
	}
	else
	{
		alert("Incorrect password or username you are now blocked");
		document.login.username.value = "You are now Blocked";
		document.login.password.value = "Fool you can't see this";
		document.login.username.disabled = true;
		document.login.password.disabled = true;
		return false;
	}
}
</script>
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
