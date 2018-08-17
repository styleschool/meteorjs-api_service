# Методы протокола VK

## confirmation( ) ⇒ `String`

Подтверждение адреса сервера.
Предоставляет ключ подтверждения.

## lead_forms_new( options ) ⇒ `String`

| Параметр            | Тип       | Описание                    |
| ------------------- | --------- | --------------------------- |
| `options`           | `Object`  | Входные параметры           |
| `options.ad_id`     | `Number`  | ID рекламного объявления    |
| `options.answers`   | `Array`   | Ответы пользователя         |
| `options.form_id`   | `Number`  | Идентификатор формы         |
| `options.form_name` | `String`  | Название формы              |
| `options.group_id`  | `Number`  | Идентификатор сообщества    |
| `options.lead_id`   | `Number`  | Идентификатор заявки        |
| `options.user_id`   | `Number`  | Идентификатор пользователя  |

Обработка события создания нового лида.
[Подробности](https://vk.com/page-19542789_53869861).

## test( ) ⇒ `String`

Тестовый метод.
