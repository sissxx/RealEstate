const express = require('express');
const hbs = require('express-handlebars');
const router = require('./router');
const cookieParser = require('cookie-parser');

const { dbInit } = require('./config/dataBase');
const { PORT } = require('./config/env');
const { auth } = require('./middleware/authMiddleware');
const { errorHandler } = require('./middleware/errHandleMiddleware');

const app = express();
app.engine('hbs', hbs.engine({
    extname: 'hbs'
}));

app.set('view engine', 'hbs');

app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(cookieParser());
app.use(auth);
app.use(router);
app.use(errorHandler);

dbInit();

app.listen(PORT, () => console.log(`Server is listening on port 3000`));



