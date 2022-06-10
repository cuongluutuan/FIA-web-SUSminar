const express = require("express");
const app = express();
const bodyParser = require("body-parser");
require('dotenv').config();

app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const e = {
	k: process.env.KEY,
	f1: process.env.FLAG1,
	f2: process.env.FLAG2,
}

app.get("/", (req,res)=>{
	res.render('index', {
		m: "There must be something on this page...",
		hint: "Looking for the K3Y huh? Try GET it from me!! =)))",
		meme: "/wheres-the-key.jpg",
	});
});
app.get("/locker", (req, res)=>{
    res.render("bad", {
        message: "Hahaah!! Don't yah know how to POST!?!?",       
    });
})

app.post("/locker", (req, res)=>{
	const data = req.body.sussyFlag;
	console.log(req.headers);
	if(data == e.k){
		res.render("method", {
			flag: e.f2,
			meme: "/meme1.jpeg", 
			message: "CONGRATS!! YOU ARE NOW A HACKER!"
		});
	}else{
		res.render("bad", {
			message: "Not this wayy! GIMME da k3y!!",
		});
	}
});

app.get("/k3y", (req, res)=>{
	res.render("method", {
		flag: e.f1,
		meme: "/meme2.png",
		message: `Here's the Key: ${e.k}`,
	});
});


// =======================================================

app.get("/method", (req, res)=>{
	res.send("This is GET");
})

app.post("/method", (req, res)=>{
	res.send("This is POST");
})

app.put("/method", (req, res)=>{
	res.send("This is PUT");
})

app.delete("/method", (req, res)=>{
	res.send("This is DELETE");
})

// =======================================================

app.get("/q",(req, res)=>{
	const t = req.query.title;
	res.send(`Title: ${t}`);
})

// =======================================================

// test status code 302
app.get("/next", (req, res)=>{
	res.redirect("/");
})

// test status code 404
app.get("*", (req, res)=>{
	res.status(404).send("404 Not found!!!");
})


app.listen(8080, ()=>console.log("running"));
