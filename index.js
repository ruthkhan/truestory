import axios from "axios"
import express from "express" 
import bodyParser from "body-parser"

const app = express()
const port = 3000
const API_URL = "https://picsum.photos"

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"));

app.get("/", (req, res) => {
    const date = new Date().getFullYear()
    res.render("index.ejs", {date: date})
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
