const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

// Routes File
const routes = require('./routes');

// Initializations
const app = express();

// Settings
app.set('port', process.env.PORT || 4000);

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('static'));

// CORS
app.use(cors());

// Routes
app.use('/api', routes);
// Starting Server
app.listen(app.get('port'), () => {
    console.log('Server running on port ' + app.get('port'));
}); 