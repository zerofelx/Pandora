const express = require('express');
const morgan = require('morgan');
const app = express();


// Settings 
app.set('port', process.env.PORT || 8081);

// Middlewares
app.use(morgan('dev'));
app.use(express.json());


// Routes
app.use('/tasks', require('./routes/tasks'));

// Static files
app.use(express.static(__dirname + '/public'))


// Server is listening
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'))
})