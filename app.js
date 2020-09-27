//Application External Modules
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

//Application Internal Modules
const postHelper = require(__dirname+"/internal_modules/postHelper.js");

//Appplication EJS content variables
const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

//Application GLOBAL Storage variables
const posts = [];

const app = express();

//Application Dependency settings
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

//Application Routes
app.get('/',function(req, res){
  console.log("INFO: Inside the '/' Route GET Method");
  const templatedata = {
    content: homeStartingContent,
    postList: posts
  };
  res.render("home",templatedata);
});

app.get('/about',function(req,res) {
  console.log("INFO: Inside the '/about' Route GET Method");
  const templatedata = {content: aboutContent};
  res.render('about',templatedata);
});

app.get("/contact",function(req,res){
  console.log("INFO: Inside the '/contact' Route GET Method");
  const templatedata = {content: contactContent};
  res.render("contact",templatedata);
});

app.get('/compose',function(req,res){
  console.log("INFO: Inside the '/compose' Route GET Method");
  res.render("compose");
});

app.post('/compose',function(req,res){
  console.log("INFO: Inside the '/compose' Route POST Method");
  const reqBody = req.body;
  const postedData = {
    title: reqBody.postTitle,
    content: reqBody.postContent
  };
  posts.push(postedData);
  res.redirect("/");
});

app.get("/posts/:postname",function(req,res){
  const postTitle = req.params.postname;
  
  if(postHelper.isPostExist(posts,postTitle)){
    const currentPost = postHelper.getPostByTitle(posts,postTitle);
    console.log("INFO: The PostTitle "+currentPost.title+" is present");

    const templatedata = {
      title: currentPost.title,
      content: currentPost.content
    };
    res.render("post",templatedata);
  }
  else{
    console.log("INFO: The PostTitle "+postTitle+" is Not present");
    res.send("NOT PRESENT");
  }
});

//Application Main function
app.listen(3000, function() {
  console.log("INFO: Server started on port 3000");
});
