const axios = require('axios');

var getCode = async (country) => {
    try {

        var response = await axios.get('https://restcountries.eu/rest/v2/name/' +
            encodeURIComponent(country) + '?fullText=true');

        return(response.data[0].currencies[0].code)

    }

    catch(undefined){
        throw new Error("Country not defined")
    }
};


var getCurrency = async (codeone, codetwo) => {
    try {

        var response = await axios.get(
            'https://rest.coinapi.io/v1/exchangerate/' +
            encodeURIComponent(codetwo)+ '?apikey=CF78A3F7-B74F-45E1-8A2B-1F536F6FBE75');

        var length = response.data.rates.length;
        var results = "";

        for (i = 0; i < length; i++) {
            if (response.data.rates[i].asset_id_quote === codeone) {
                results = response.data.rates[i].rate;
            }
        }

    }

    catch(undefined){
        throw new Error("Code for Exchange One not defined")
    }

    if (results === ""){
        throw new Error("Exchange One does not convert given currency code")
    }
    else {
        return results
    }
};

module.exports = {
    getCode,
    getCurrency
};