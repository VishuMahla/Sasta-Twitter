const { log } = require("console");
const express = require("express");
const app = express();
const port  =  8080 ;
const path = require("path");

const { v4: uuidv4 } = require('uuid');

const methodOverride = require('method-override') ;
app.use(methodOverride('_method'));
app.use(express.json());
app.set("view engine" , "ejs");
app.set("views", path.join(__dirname,"/views"));
app.use(express.static(path.join(__dirname,"public")));

app.use(express.urlencoded({extended: true}));
 
app.listen((port), (req,res)=> {
    console.log("app is listening");
});

let posts = [
    {
        id : uuidv4(),
        username: "vishalmahla",
        content: "i like to play games"
    },
    {
        id : uuidv4(),
        username : "nishu",
        content: "i like to dance"
    },
    {
        id : uuidv4(),
        username: "asiya",
        content: "i like to study"
    }
];

app.get("/posts",(req,res)=> {
    res.render("index.ejs", { posts });
})

app.get("/posts/new", (req,res)=>{
    res.render("newpost.ejs");
})

app.post("/posts",(req,res)=> {
    let { username, content } = req.body ;
    let id = uuidv4();
    
    posts.push({ id,  username , content });
    res.redirect("/posts");
})

app.get("/posts/:id" , (req,res)=> {
    let { id } =  req.params ;
    let post = posts.find((p)=> id == p.id);
    res.render("show.ejs", { post });

});

app.patch("/posts/:id", (req,res)=> {
    let { id } =  req.params ;
    let post = posts.find((p)=> id === p.id);
    let newContent = req.body.content ;
    post.content = newContent ;
    res.redirect("/posts") ;
}) ;

app.get("/posts/:id/edit", (req,res)=> {
    let { id }= req.params ;
    let post = posts.find((p)=> id === p.id);
    res.render("edit.ejs" , { post }) ;
        
})

app.delete("/posts/:id" , (req,res)=> {
    let { id }= req.params ;
    let post = posts.find((p)=> id === p.id);
    posts = posts.filter((p)=> id != p.id);
    res.redirect("/posts");
})