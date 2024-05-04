import axios from "axios"
import express from "express" 
import bodyParser from "body-parser"

const app = express()
const port = 3000
const API_URL = "https://picsum.photos"

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"));

const date = new Date().getFullYear()
function getImage1() { return axios.get(API_URL + '/800/400/?blur&random=1') }
function getImage2() { return axios.get(API_URL + '/800/400/?blur&random=2') }
function getImage3() { return axios.get(API_URL + '/800/400/?blur&random=3') }

app.get("/", (req, res) => {
    res.render("index.ejs", {date: date})
});

app.post("/get-form", async (req, res) => {
    try {
        const [image1, image2, image3] = await Promise.all([getImage1(), getImage2(), getImage3()])
        res.render("index.ejs", {
            date: date, 
            image1: image1.headers["picsum-id"], 
            image2: image2.headers["picsum-id"], 
            image3: image3.headers["picsum-id"]
        })
    } catch (error) {
        console.error(error);
        res.redirect("/")
    }
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
