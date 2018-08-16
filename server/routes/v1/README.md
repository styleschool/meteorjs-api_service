# Протокол v1

Маршрут обработчика маршрутов выглядит следующим образом: `/v1/method`, где `method` является вызываемым методом.
Например, чтобы вызывать тестовый метод, требуется послать `POST` или `GET` запрос по адресу:

```url
https://example.domain/v1/test
```

Параметры должны содержать ключ `token`, чтобы запрос прошёл этап аутентификации.
Например, в случае `GET`, запрос выглядит следующим образом:

```url
https://example.domain/v1/method?token=key&param=value
```

Или в случае `POST`, это ключ в объекте:

```json
{
  "token": "key",
  "param": "value"
}
```

Допускается использование одновременно `POST` и `GET` параметров.
Преимущество отдаётся `POST` параметрам и перезаписывают `GET` при дублировании.

Полученные `POST` и `GET` параметры передаются методу в объекте.
Запросы перед вызовом метода проходят этап аутентификации и отбрасываются при ошибках.

Используемые параметры требуется проверять перед использованием.

## Расширение методов

При получении запроса, происходит поиск Meteor метода `v1:метод`.
Например, если вызывается тестовый метод, происходит вызов внутреннего метода `v1:test`.

Чтобы добавить собственный метод, создайте файл в каталоге `/server/methods/v1` и создайте метод, согласно
[официальной документации MeteoJS](https://guide.meteor.com/methods.html).
Название метода должно соответствовать шаблону `v1:имя_метода`.

Возвращаемый результат метода отдаётся клиенту, как JSON кодированная строка.

Пример шаблона:

```javascript
import { Meteor } from 'meteor/meteor';

Meteor.methods({
  'v1:method'(options = {}) {
    const logger = debug('API:v1:method');
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
| `API:v1:method` | Отображение сообщений вызываемого метода        |
| `API:v1:routes` | Отображение сообщений, полученных обработчиком  |
| `API:v1:error`  | Отображение ошибок при работе обработчика       |