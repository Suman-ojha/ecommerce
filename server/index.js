const express  = require('express');
const app  = express();
require('dotenv').config()
const path = require('path')
const cookieParser = require('cookie-parser')
const cors = require('cors')



// Db connection
const db_conn = require('./config/DB/db_connection')
let basepath = ''

// allow cors
app.use(
    cors({
      origin: "http://localhost:5173",
      methods: ["GET", "POST", "DELETE", "PUT"],
      allowedHeaders: [
        "Content-Type",
        "Authorization",
        "Cache-Control",
        "Expires",
        "Pragma",
      ],
      credentials: true,
    })
  );
//in-built middleware
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: "50mb" }));



//register the routes
app.use(basepath+ '/api/auth' , require('./Routes/authRoutes'))
// app.use(basepath+ '/api/user' , require('./Routes/userRoutes'))
// app.use(basepath+ '/api/post' , require('./Routes/postRoutes'))
// app.use(basepath+ '/api/comment' , require('./Routes/commentRoutes'))
// app.use(basepath+ '/api' , require('./Routes/publicRoutes'))

app.get(basepath +'/test',(req,res)=>{
    return res.status(200).send({
        status:"success",
        message :"message send successfully..!!"
    })
})

app.get(basepath+'/', function (req, res) {
    res.send(`
    <h3 style=\"text-align: center; padding: 10% 0; text-transform: uppercase;\">
        !! this is a secure connection hence cannot be accessed !!
    </h3>`)
    
})

app.all(basepath+'*', (req, res) => { 
    return res.status(404).send({
        status:"error",
        message :"<h1>404! Page not found</h1>"
    })
    
})


app.listen(process.env.PORT , ()=>{
    console.log(`server running at ${process.env.PORT}..`)
})