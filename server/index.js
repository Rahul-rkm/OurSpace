const express = require('express')
const app = express()
const mongoose = require('mongoose')
const morgan = require('morgan')
const dotenv = require('dotenv')
const helmet = require('helmet')
const multer = require('multer')
const path = require('path')

const userRoute = require('./routes/users')
const authRoute = require("./routes/auth")
const postRoute = require("./routes/posts")

dotenv.config();
mongoose.connect(
    process.env.MONGO_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    (err) => {
        if (err) console.log(err);
        else
            console.log("mongdb is connected");
    }
);

app.use("/images", express.static(path.join(__dirname, "public/images")))

// Middleware
app.use(express.json())
app.use(helmet())
app.use(morgan("common"))
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images")
    },
    filename: (req, file, cb) => {
        // const fileName = Date.now() + file.name;
        // console.log(req.body)
        // console.log(req.body?.img)
        // console.log(file)
        try {
            cb(null, Date.now() + '-' + file.originalname)
        }
        catch (err) {
            console.log('error in rq.body.img', err)
        }
    }
})
const upload = multer({ storage })
app.post("/api/upload", upload.single("file"), (req, res) => {
    try {
        res.status(200).json({ "message": "File uploaded successfully", "img": req.file.filename })
    }
    catch (err) {
        console.log(err)
    }
})
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute)
app.use("/api/posts", postRoute)

app.get('/', (req, res) => {
    res.send("Welcome HOME")
})

app.get('/api/', (req, res) => {
    res.status(200).json("Welcome to test api")
})

const PORT = 8800;
app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`)
})