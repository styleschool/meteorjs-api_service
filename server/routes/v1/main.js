import debug from 'debug';

import { Meteor } from 'meteor/meteor';
import { Picker } from 'meteor/meteorhacks:picker';

Picker.route('/v1/:method', (parameters, request, response) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  try {
    const logger = debug('API:v1:routes');
    const token = process.env.TOKEN || '';

    if (!('method' in parameters)) {
      throw new Meteor.Error('Method is not correct');
    }

    const options = Object.assign({}, parameters.query, request.body);
    logger('Получен пакет данных: %o', options);

    if (!('token' in options) || (options.token !== token)) {
      throw new Meteor.Error('Token is not valid');
    }

    const result = Meteor.call(`v1:${parameters.method}`, options);
    logger('Результат: %o', result);

    response.writeHead(200, headers);
    response.write(JSON.stringify(result));
    response.end();
  } catch (error) {
    const logger = debug('API:v1:error');
    logger(error.error);

    response.writeHead(400, headers);
    response.write('false');
    response.end();
  }
});
