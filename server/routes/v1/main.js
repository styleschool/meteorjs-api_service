import ERROR from '/server/error';
import debug from 'debug';

import { JsonRoutes } from 'meteor/simple:json-routes';
import { Meteor } from 'meteor/meteor';

/**
 * @description Обработчик входящего пакета.
 *
 * @param {IncomingMessage} request
 * @param {ServerResponse}  response
 */
function processRequest(request, response) {
  const logger = debug('API:routes');
  const token = process.env.TOKEN;

  try {
    const options = Object.assign({}, request.query, request.body);

    /* Проверка токена */
    if (!('token' in options) && (options.token !== token)) {
      throw new Meteor.Error('Token is not valid');
    }

    /* Вызов метода */
    const data = Meteor.call(`v1:${request.params.method}`, options);
    logger('Результат: %o', data);

    JsonRoutes.sendResult(response, { code: 200, data });
  } catch (error) {
    JsonRoutes.sendResult(response, { code: 400, data: false });
    ERROR(error);
  }
}

/**
 * @description Обработчик GET запросов.
 */
JsonRoutes.add('GET', '/v1/:method', processRequest);

/**
 * @description Обработчик POST запросов.
 */
JsonRoutes.add('POST', '/v1/:method', processRequest);
