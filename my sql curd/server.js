const express = require("express")
// const cors = require("cors")
// const database = require('./database')
const dbFunctions = require('./dbFunctions')
// const { ObjectId } = require("mongodb")
const path  = require('path')
const port = 3000

const app = express()
// app.use(cors()) 
app.use(express.static("public"));
app.use(express.json())

// The route definitions for get, post and delete

app.get("/api/allnames", async (req, res) => {
	try {
		const data = await dbFunctions.getAllDocs();
		res.json(data);
	} 
	catch (err) {
		console.error("# Get Error", err)
		res.status(500).send({ error: err.name + ", " + err.message })
	}
});

app.post('/api/addname', async (req, res) => {

	let data = req.body;

	try {
		data = await dbFunctions.addDoc(data);
		res.json(data)
	}
	catch (err) {
		console.error("# Post Error", err)
		res.status(500).send({ error: err.name + ", " + err.message })
	}
});

app.delete("/api/deletename/:name", async (req, res) => {
	const name = req.params.name;
	try {
		const 	respObj = await dbFunctions.deleteDoc(name)
			res.json(respObj);
		}
		catch (err) {
			console.error("# Delete Error", err)
			res.status(500).send({ error: err.name + ", " + err.message })
			return
		}
});

app.get('/',(req, res)=>{
    res.status(200).sendFile(path.join(__dirname, 'public', 'app.html'));  
});






server = app.listen(port, () => {
	console.log('http://localhost:3000')
})


