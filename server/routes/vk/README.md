# Протокол VK

Маршрут обработчика расположен по адресу `/api.vk`.

Допускается использование одновременно `POST` и `GET` параметров.
Преимущество отдаётся `POST` параметрам и перезаписывают `GET` при
дублировании.

[В соответствии со стандартом VK](https://vk.com/dev/callback_api),
в запросе должены присутствовать параметры:

| Параметр  | Тип       | Описание                    |
| --------- | --------- | --------------------------- |
| `type`    | `String`  | Название вызываемого метода |
| `object`  | `Object`  | Параметры запроса           |
| `secret`  | `String`  | Ключ аутентификации запроса |

Без указания обязательных полей, запрос будет отклонён.

Запрос, прошедший этап аутентификации, передаёт значение `object`
методу, который содержит параметры запроса.
Используемые параметры требуется проверять перед использованием.
Возможные параметры зависят от вызываемого метода.
Подробное описание параметров расположено на
[официальных страницах документации VK](https://vk.com/dev/groups_events).

## Методы

Документацию используемых методов, смотрите на
[соответствующей странице](/server/methods/vk/README.md)
документации.

## Расширение методов

При получении запроса, происходит поиск Meteor метода `vk:метод`.
Например, если вызывается тестовый метод, происходит вызов внутреннего
метода `vk:test`.

Чтобы добавить собственный метод, создайте файл в каталоге
`/server/methods/vk` и создайте метод, согласно
[официальной документации MeteoJS](https://guide.meteor.com/methods.html).
Название метода должно соответствовать шаблону `vk:имя_метода`.

Возвращаемый результат метода отдаётся клиенту, как JSON кодированная
строка.

Пример шаблона:

```javascript
import debug from 'debug';
import { Meteor } from 'meteor/meteor';

Meteor.methods({
  'vk:method'(options = {}) {
    const logger = debug('API:vk:method');
    logger('Получены данные: %o', options);
    return 42;
  },
});
```

## Отладка

Подробности смотрите на
[главной странице](/README.md#%D0%9E%D1%82%D0%BB%D0%B0%D0%B4%D0%BA%D0%B0)
документации.

Дополнительные параметры:

| Значение        | Описание                                        |
| --------------- | ----------------------------------------------- |
| `API:vk:method` | Отображение сообщений вызываемого метода        |
| `API:vk:routes` | Отображение сообщений, полученных обработчиком  |
| `API:vk:error`  | Отображение ошибок при работе обработчика       |