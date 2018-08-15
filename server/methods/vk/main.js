import debug from 'debug';

import Bitrix24 from 'meteor/styleschool:bitrix24-adapter';
import { Meteor } from 'meteor/meteor';

Meteor.methods({
  /**
   * @description Подтверждение адреса сервера.
   * Предоставляет ключ подтверждения.
   *
   * @returns {String}
   */
  'vk:confirmation' () {
    const logger = debug('API:vk:confirmation');
    const confKey = process.env.VK_CONFKEY || '';
    logger('Предоставлен ключ: %s', confKey);
    return confKey;
  },
  /**
   * @description Обработка события создания нового лида.
   *
   * @param   {Object}  options             Входные параметры
   * @param   {Number}  options.ad_id       ID рекламного объявления
   * @param   {Array}   options.answers     Ответы пользователя
   * @param   {Number}  options.form_id     Идентификатор формы
   * @param   {String}  options.form_name   Название формы
   * @param   {Number}  options.group_id    Идентификатор сообщества
   * @param   {Number}  options.lead_id     Идентификатор заявки
   * @param   {Number}  options.user_id     Идентификатор пользователя
   * @returns {String}                      Результат выполнения
   */
  'vk:lead_forms_new' (options = {}) {
    const logger = debug('API:vk:lead_forms_new');
    logger('Получены данные: %o', options);

    const param = {
      title: `Лид со страницы VK: ${options.form_name}`,
      web: `https://vk.com/id${options.user_id}`,
    };

    if ('ad_id' in options) {
      param.sourceDescription = `https://vk.com/ads?act=office&union_id=${options.ad_id}`;
    }

    options.answers.forEach((item) => {
      if (item.key === 'first_name') {
        param.firstname = item.answer;
      }

      if (item.key === 'last_name') {
        param.lastname = item.answer;
      }

      if (item.key === 'email') {
        param.email = item.answer;
      }

      if (item.key === 'phone_number') {
        param.phone = item.answer;
      }
    });

    const bt24 = new Bitrix24({
      domain: process.env.B24_DOMAIN || '',
      token: process.env.B24_TOKEN || '',
      userid: process.env.B24_USERID || 0,
    });

    logger('Сформирован пакет: %o', param);
    return bt24.createLead(param).then((response) => {
      logger('Получен ответ: %o', response);
      return 'ok';
    }).catch((error) => {
      throw new Meteor.Error(error);
    });
  },
  /**
   * @description Тестовый метод.
   *
   * @returns {String}
   */
  'vk:test' () {
    const logger = debug('API:vk:test');
    logger('Вызов тестового метода');
    return 'ok';
  },
});
