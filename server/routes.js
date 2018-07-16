import debug from 'debug';
import { JsonRoutes } from 'meteor/simple:json-routes';

/**
 * @description Верификация входных запросов.
 * Отклоняются запросы, не прошедшие проверку.
 */
JsonRoutes.Middleware.use((request, response, next) => {
  const logger = debug('API:routes');
  const token = process.env.TOKEN;

  /* POST */
  if (('token' in request.body) && request.body.token === token) {
    logger('Получен %s пакет: %o', 'POST', request.body);
    return next();
  }

  /* GET */
  if (('token' in request.query) && request.query.token === token) {
    logger('Получен %s пакет: %o', 'GET', request.query);
    return next();
  }

  return JsonRoutes.sendResult(response, { code: 400, data: false });
});
