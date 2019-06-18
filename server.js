 const express = require('express');
 const hbs = require('hbs');
 const fs = require('fs');

 const app = express();

 hbs.registerPartials('__dirname' + '/views/partials');
 
 app.set("view engine", "hbs");

 hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());
 hbs.registerHelper('capitalize', str => str.toUpperCase());


 //middlewares
 app.use((req, res, next) => {
     var now = new Date().toString();
     var log = `${now}: ${req.method}, ${req.url}`;
     console.log(log);

     fs.appendFile('server.log', log + '\n', (err) => {
         if(err) console.log(err.message);
     });

     next();
 } /*middleware function*/);  //register a middleware

//  app.use((req, res, next) => {

//     res.render('mintainance.hbs', {
//         pageTitle: "Mintainance",
//         message: "site is down, be back soon!"
//     });

//  });  //mintainance middleware

 app.use(express.static(`${__dirname}/public`)); //middleware


 app.get('/', (req, res) => {

    res.render("home.hbs", {
        pageTitle: "Home",
        welcomeMessage: "Hello to my fkin website",
        currentYear: new Date().getFullYear()
    });

 });

 app.get('/about', (req, res) => {
     res.render('about.hbs', {
         pageTitle: "About",
         currentYear: new Date().getFullYear()
     });
 });

 app.get('/bad', (req, res) => {
     res.send({
         errorMessage: "bad request"
     });
 });

 app.listen(3000, () => {
     console.log("server is running on port 3000");
 });

