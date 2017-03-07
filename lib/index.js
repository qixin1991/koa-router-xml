'use strict'

const parse = require('./xml'),
    xml2js = require('xml2js');

module.exports = (options) => {
    return async (ctx, next) => {
        ctx.xml2json = async () => {
            var data;
            switch (ctx.method) {
                case 'POST':
                case 'PUT':
                case 'PATCH':
                case 'TRACE':
                    data = await parse(ctx.req, options);
                    break;
            }
            return data.xml;
        };

        ctx.json2xml = (data, options) => {
            var builder = new xml2js.Builder(options);
            var xml = builder.buildObject(data);
            return xml;
        }
        await next();
    }
}