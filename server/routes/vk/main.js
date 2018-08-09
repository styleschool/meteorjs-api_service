import debug from 'debug';

import { Meteor } from 'meteor/meteor';
import { Picker } from 'meteor/meteorhacks:picker';

Picker.route('/api.vk/callback', (parameters, request, response) => {
  const headers = {
    'Content-Type': 'text/plain',
  };

  try {
    const logger = debug('API:vk:routes');
    const token = process.env.VK_TOKEN || '';

    const options = Object.assign({}, parameters.query, request.body);
    logger('Получен пакет данных: %o', options);

    if (!('type' in options)) {
      throw new Meteor.Error('Method is not correct');
    }

    if (!('secret' in options) || (options.secret !== token)) {
      throw new Meteor.Error('Token is not valid');
    }

    const result = Meteor.call(`vk:${options.type}`, options.object);
    logger('Результат: %o', result);

    response.writeHead(200, headers);
    response.end(result);
  } catch (error) {
    const logger = debug('API:vk:error');
    logger(error.error);

    response.writeHead(400, headers);
    response.end('false');
  }
});
