const {format}=require ('timeago.js');

const helpers ={};

helpers.timeago = (Timestamp) => {
    return format(Timestamp);
};
//Con esta funcion acepta el eq en handlebars

const Handlebars = require('handlebars');

Handlebars.registerHelper('eq', function(a, b) {
  return a === b;
});

module.exports=helpers;