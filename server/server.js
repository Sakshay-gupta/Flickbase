const express = require('express')
const app = express();
require('dotenv').config();
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const mongoSanitize = require('express-mongo-sanitize')
const xss = require('xss-clean')
const routes = require('./routes/index')
const passport = require('passport')
const { jwtStrategy } = require('./middleware/passport')
const {HandleError, convertToApiError} = require('./middleware/apierror')
const mongoUri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}
@${process.env.DB_HOST}?retryWrites=true&w=majority`
mongoose.connect(mongoUri);

// Parsing
app.use(bodyParser.json());

// Sanitize
app.use(xss());
app.use(mongoSanitize());

// PASSPORT
app.use(passport.initialize())
passport.use('jwt', jwtStrategy);

// Routes
app.use('/api', routes)


// Error Hnadling 

app.use(convertToApiError)
app.use((err, req, res, next) => {
    HandleError(err, res);
})

const port = process.env.PORT || 3001

app.listen(port, () => {
    console.log(`Server is running at ${port}`)
})