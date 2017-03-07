'use strict'

const parse = require('./xml');

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
            return data;
        }
        await next();
    }
}