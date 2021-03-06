# API Сервер

Служба предоставляет
[REST](https://ru.wikipedia.org/wiki/REST)
интерфейс сторонним приложениям, не предоставляющим иного
интерфейса связи.
API службы легко расширяется, используйте эту возможность в тех
случаях, когда другие способы связи нецелесообразны.

Для работы службы, требуются
[переменные среды](https://ru.wikipedia.org/wiki/%D0%9F%D0%B5%D1%80%D0%B5%D0%BC%D0%B5%D0%BD%D0%BD%D0%B0%D1%8F_%D1%81%D1%80%D0%B5%D0%B4%D1%8B):

| Параметр      | Описание                                |
| ------------- | --------------------------------------- |
| `B24_DOMAIN`  | Домен системы Битрикс24                 |
| `B24_TOKEN`   | Токен пользователя Битрикс24            |
| `B24_USERID`  | Идентификатор пользователя Битрикс24    |
| `V1_TOKEN`    | Ключ верификации запросов протокола V1  |
| `VK_CONFKEY`  | Ключ верификации сервера для VK         |
| `VK_TOKEN`    | Ключ верификации запросов VK            |

Дополнительные параметры, полезные в разработке:

| Параметр    | Де-факто              | Описание                          |
| ----------- | --------------------- | --------------------------------- |
| `DEBUG`     | `API:*`               | Отображение отладочных сообщений  |
| `EMAIL`     | `example@domain.org`  | Логин тестового пользователя      |
| `NODE_ENV`  | `development`         | Режим работы NodeJS               |
| `PASSWORD`  | `qwerty123456`        | Пароль тестового пользователя     |

## Используемые команды

| Команда         | Описание            |
| --------------- | ------------------- |
| `npm run lint`  | Анализ кода         |
| `npm run start` | Запуск службы       |
| `npm run test`  | Тестирование пакета |

## Описание протоколов

В службе используются два обработчика запросов:

* `V1` - стандартный RESTful протокол
* `VK` - обработчик событий VK

Подробное описание протоколов:

* [Протокол V1](server/routes/v1/README.md);
* [Протокол VK](server/routes/vk/README.md);

Подробное описание методов:

* [Методы V1](server/methods/v1/README.md);
* [Методы VK](server/methods/vk/README.md);

## Описание принципа работы

Протоколы разработаны таким образом, что при ошибках, невалидных
запросах, некорректных параметрах, сервер отвечает строкой `false`.
Ошибки и предупреждения клиенту не выводятся, чтобы избежать проблем
с безопасностью.
Входящие запросы, ответы и ошибки записываются в журнал и доступны для
просмотра на сервере.
Смотрите раздел
[отладка](#%D0%9E%D1%82%D0%BB%D0%B0%D0%B4%D0%BA%D0%B0)
для подробностей.

При вызове метода, происходит поиск Meteor метода с
названием `протокол:метод`.
Например, если вызываете тестовый метод по адресу `/v1/test`,
будет вызываться Meteor метод `v1:test`.
Подробности на
[страницах описания протоколов](#%D0%9E%D0%BF%D0%B8%D1%81%D0%B0%D0%BD%D0%B8%D0%B5-%D0%BF%D1%80%D0%BE%D1%82%D0%BE%D0%BA%D0%BE%D0%BB%D0%BE%D0%B2).

Вызываемому методу передаются полученные `POST` и `GET`
переменные в объекте.
Входящие параметры верифицируются службой до вызова метода,
не прошедшие верификацию запросы отклоняются.
При создании методов, требуется выполнять проверку на
переданные параметры.

## Отладка

Действия и события службы фиксируются.
Для вывода сообщений, используйте переменную среды `DEBUG`.

Примеры использования:

| Значение    | Описание                                                  |
| ----------- | --------------------------------------------------------- |
| `*`         | Отображение всех отладочных сообщений всех модулей        |
| `API:*`     | Отображение всех сообщений службы, используется де-факто  |
| `API:v1:*`  | Отображение отладочных сообщений обработка `V1`           |
| `API:vk:*`  | Отображение отладочных сообщений обработка `VK`           |
| `API:error` | Отображение сообщений об ошибках работы                   |

Дополнительные параметры отображения расписаны на страницах
[протоколов](#%D0%9E%D0%BF%D0%B8%D1%81%D0%B0%D0%BD%D0%B8%D0%B5-%D0%BF%D1%80%D0%BE%D1%82%D0%BE%D0%BA%D0%BE%D0%BB%D0%BE%D0%B2)
и
[методов](#%D0%9E%D0%BF%D0%B8%D1%81%D0%B0%D0%BD%D0%B8%D0%B5-%D0%BF%D1%80%D0%BE%D1%82%D0%BE%D0%BA%D0%BE%D0%BB%D0%BE%D0%B2).

Можно использовать иные способы управления отображением сообщений.
[Подробности в документации](https://github.com/visionmedia/debug#readme)
отладочного пакета.

## Используемые плагины

* [styleschool:bitrix24-adapter](https://git.styleschool.ru/meteorjs/bitrix24-adapter)
Адаптер к системе Битрикс24

## Лицензия

<img width="256px" alt="MIT License" src="https://raw.githubusercontent.com/valentineus/valentineus.github.io/master/assets/images/7d05cad0-d553-42c7-be1f-7007926ba720.png" />

[MIT](LICENSE.txt).
Copyright (c)
[Valentin Popov](https://valentineus.link/).
