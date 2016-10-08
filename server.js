var express = require('express');
var morgan = require('morgan');
var path = require('path');
var app = express();
app.use(morgan('combined'));
var articleOne={
    title:'article-one I MUJAHIR HUSSAIN ABBASI',
    heading: 'Arcticle one',
    date:'sep 21,2016',
    content: 
    ` <p>
                this is  a content.this is  a content.this is  a content.this is  a conten.this is  a content.this is  a content.this is  a content.
            </p>    
             <p>
                this is  a content.this is  a content.this is  a content.this is  a conten.this is  a content.this is  a content.this is  a content.
    </p>`
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
return htmlTempalte;
}
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/mujahir.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'mujahir.jpg'));
});
app.get('/article-one',function(req,res){
res.send(createTemplate(articleOne));
});
app.get('/article-two',function(req,res){
res.sendFile(path.join(__dirname, 'ui', 'article-two.html'));
});
app.get('/article-three',function(req,res){
res.sendFile(path.join(__dirname, 'ui', 'article-three.html'));
});
var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
