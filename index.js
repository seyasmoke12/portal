
const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const serviceRoute = require("./routes/serviceRoute.js")
const awardAndPartner = require("./routes/partnerRoute.js")
const blogAndNews = require("./routes/blogRoute.js")
const contactUs = require("./routes/contactRoutes")
const path = require("path")
dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use("/api/posts",serviceRoute)
app.use("/award/partner",awardAndPartner)
app.use("/news",blogAndNews)
app.use("/api",contactUs)


const port = process.env.APP_PORT


app.listen(port,()=>{
    console.log(`server is runnuing port on ${port}`)
})