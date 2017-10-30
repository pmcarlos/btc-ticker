'use strict'
 
const Hapi = require('hapi');
const Request = require('request');

 
const server = new Hapi.Server();
 
server.connection({
    host: '127.0.0.1',
    port: 3000
});

server.start((err) => {
    if (err) {
        throw err;
    }
 
    //console.log(`Server running at: ${server.info.uri}`);
});

const lowValue = 110000;
const highValue = 118000
setInterval(() => {
	Request.get(`https://api.bitso.com/v3/ticker/?book=btc_mxn`, function (error, response, body) {
    if (error) {
        throw error;
    }

		const result = JSON.parse(body);
		const {last} = result.payload;
		const {high} = result.payload;
		const {low} = result.payload;
		const {created_at} = result.payload; 

		if(last>highValue) {
			console.log(`El valor del bitcoin es mayor a ${highValue}`);
		}

		if(last<lowValue) {
			console.log(`El valor del bitcoin es menor a ${lowValue}`);
		}

		//console.log(`El valor actual del bitcon es: ${last}. Hoy tuvo un máximo de ${high} y el mínimo fue de ${low}. Fecha: ${created_at}`);
	});
},1000) 

 