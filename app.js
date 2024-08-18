const express = require('express')
const errorHandler = require('./middleware/errorHandler')
const connectDb = require('./config/dbConnection')
const dotenv = require('dotenv').config()
const bodyParser = require('body-parser');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const cors =  require('cors')

connectDb()
const app = express()

const port = process.env.PORT || 9000
const corConfig = {
    origin: '*',
    methods: 'GET, PUT, POST, DELETE'
}

app.use(express.json())
app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.options('*', cors(corConfig))
app.use('/dashboard/organizations', require('./routes/organizationRoutes'))
app.use('/users', require('./routes/userRoutes'))
app.use(errorHandler)

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
})