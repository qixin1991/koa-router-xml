'use strict'

const parse = require('./xml'),
    xml2js = require('xml2js');

module.exports = (options) => {
    return async (ctx, next) => {
        ctx.xml2json = async () => {
            let data;
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

        ctx.json2xml = (data, options = { rootName: 'xml' }) => {
            let builder = new xml2js.Builder(options);
            let xml = builder.buildObject(data);
            return xml;
        }
        await next();
    }
}