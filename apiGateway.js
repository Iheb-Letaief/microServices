const express = require('express')
const dotenv = require('dotenv')
const colors = require('colors')   
const bodyParser = require('body-parser');
dotenv.config({ path: './config/config.env' })
const { graphqlHTTP } = require('express-graphql')
const schema = require('./schema/schema') 
const connectDB = require('./config/db');
const { protect } = require('./auth/middleware/authmiddleware');


const port = process.env.PORT || 5000

const app = express()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

connectDB()

app.use('/api/v1/users', require('./auth/routes/userRoutes'))

app.use('/graphql', protect, graphqlHTTP({
    schema,
    graphiql: true
}))


app.listen(port, console.log('Server running on port ' + port))