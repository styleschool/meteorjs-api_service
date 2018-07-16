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
function handler(request, response) {
  const logger = debug('API:handler');

  try {
    const options = Object.assign({}, request.query, request.body);

    Meteor.call(request.params.method, options, (error, data) => {
      if (error) {
        throw new Meteor.Error(error);
      }

      JsonRoutes.sendResult(response, { code: 200, data });
      logger('Результат: %o', data);
    });
  } catch (error) {
    JsonRoutes.sendResult(response, { code: 400, data: false });
    ERROR(error);
  }
}

/**
 * @description Обработчик GET запросов.
 */
JsonRoutes.add('GET', '/v1/:method', handler);

/**
 * @description Обработчик POST запросов.
 */
JsonRoutes.add('POST', '/v1/:method', handler);
