const express =require('express');
const morgan =require('morgan');
const exphbs =require ('express-handlebars');
const path = require('path');
const flash =require('connect-flash');
const session =require('express-session');
const MySQLStore  = require('express-mysql-session')(session);
const { database } =require ('./keys');
const passport =require ('passport');

//initiallizations
const app = express();
require('./lib/passport');

//settings
app.set('port',process.env.PORT || 6810);//si hay un puerto diponible usalo sino usa el 8000
app.set('views',path.join(__dirname, 'views'))// les dice donde se encuentra la carpeta views
app.engine('.hbs', exphbs.engine({
        defaultLayout: 'main',
        layoutsDir: path.join(app.get('views'),'layouts'),
        partialsDir: path.join(app.get('views'),'partials'),
        adminDir: path.join(app.get('views'),'admin'),
        extname : '.hbs',
        helpers:require ('./lib/handlebars')
    }));
app.set('view engine', '.hbs');

//midlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false})); //acepta desde el formulario los datos que envian los usuarios
app.use(express.json());
app.use(session({
    secret:'faztmysqlnodesession',
    resave: false,
    resave: false,
  saveUninitialized: false ,
  store: new MySQLStore(database)
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

//global Variables

app.use((req,res,next) =>{
    app.locals.success=req.flash('success');
    app.locals.message=req.flash('message');
    app.locals.user =req.user;
    next();
});

// Routes   
app.use(require('./routes'));

app.use(require('./routes/authentication'));
app.use('/links',require('./routes/links'));




//Starting Server 
const server = app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port')); // Muestra en qué puerto se ejecuta
  });
  
  server.timeout = 5000;