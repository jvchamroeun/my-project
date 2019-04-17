const express = require('express');
const coin = require('./function.js');
const hbs = require('hbs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('calculate', () => {
    let countryone = "France";
    let countrytwo = "Canada";

    try {
        var currency_code_one = coin.getCode(countryone);
        var currency_code_two = coin.getCode(countrytwo);
        var currency = coin.getCurrency(currency_code_one, currency_code_two);

        return `${countryone} to ${countrytwo} is: ${currency} ${currency_code_two}`
    }

    catch (e) {

        return `${e}`

    }
});

// hbs.registerHelper('round', (currency) => {
//     if (currency === undefined) {
//         return ""
//     }
//     else{
//         return currency.toFixed(2)
//     }
// });

hbs.registerHelper('message', (text) => {
    if (text === undefined) {
        return ""
    }
    else{
        return text.toUpperCase();
    }

});

app.get('/', (request, response) => {
    response.render('main.hbs', {
        title: 'Main page',
        main: 'Main',
        about: 'About',
        dynamic: 'Dynamic'
    })
});

app.get('/about', (request, response) => {
    response.render('about.hbs', {
        title: 'About page',
        main: 'Main',
        about: 'About',
        dynamic: 'Dynamic'
    })
});

app.get('/dynamic', async(request, response) => {

    response.render('dynamic.hbs', {
        title: 'Dynamic page',
        main: 'Main',
        about: 'About',
        dynamic: 'Dynamic'
    });

});


//internet address - localhost:<port>
app.listen(8080, () => {
    console.log('Server is up on the port 8080')
});