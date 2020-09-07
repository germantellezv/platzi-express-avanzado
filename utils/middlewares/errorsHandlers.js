const { config } = require('../../config/index')
const Sentry = require("@sentry/node");
const boom = require('boom')
const isRequestAjaxOrApi = require('../../utils/isRequestAjaxOrApi')
Sentry.init({ dsn: `https://${config.sentryDns}@sentry.io/${config.sentryId}` });

function withErrorStack(err, stack) {
    if (config.dev) {
        return { ...err, stack } // Object.assign({}, err, stack)
    }
}

function logErrors(err, req, res, next) {
    Sentry.captureException(err);
    console.error(err.stack);
    next(err);
}

function wrapErrors(err, req, res, next) {
    if (!err.isBoom) {
        boom.badImplementation(err)
    }
    next(err)
}


function clientErrorHandler(err, req, res, next) {
    const {
        output: { statusCode, payload }
    } = err
    // Catch errors for ajax request or if error occurrs while streaming
    if (res.headerSent || isRequestAjaxOrApi(req)) {
        res.status(statusCode).json(withErrorStack(payload, err.stack))
    } else {
        next(err)
    }
}

function errorHandler(err, req, res, next) {
    const {
        output: { statusCode, payload }
    } = err

    res.status(statusCode)
    res.render("error", withErrorStack(payload, err.stack))
}

module.exports = {
    logErrors,
    clientErrorHandler,
    errorHandler,
    wrapErrors
}
