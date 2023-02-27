﻿# Spring Server for car wash application
# После первого запуска надо написать sql команду или всё сломается!!!
```
INSERT INTO roles(name) VALUES('ROLE_USER');
INSERT INTO roles(name) VALUES('ROLE_MODERATOR');
INSERT INTO roles(name) VALUES('ROLE_ADMIN');
```
### Общая информация
Название базы данных: ```carWashDB```\
При регистрации пользователь отправляет username и password, затем телефоном автоматически ставится равный username (то есть в юзернейме пользователь передаёт свой телефон). А почту человек может потом отдельно написать, если захочет\
Есть три роли: админ, модератор, юзер. Можно легко добавить еще, пока что и запросов нет, в которых проверяются роли (только тестовые есть)\
Если при регистрации подаётся какая-то ерунда вместо роли или не подаётся ничего, то человек по автомату обычный юзер\

#### Запросы к обычным людям
1) ```@PostMapping("/api/auth/signup")``` - регистрация клиента\
На вход подается джейсон с информации о клиенте, а пример запроса - http://localhost:8080/api/auth/signup \
Входные данные : 
   ```
   {
    "username" : "896351866602",
    "password" : "12345678"
   }
   ``` 
   На выход просто получаем сообщение о том, что всё хорошо или ошибки\
   Для начала емаил подаётся как null, но может это исправить, если давать человеку возможность (как я понимаю флажок надо будет сделать просто)\

2) ```@PostMapping("/api/auth/signin)``` - логин клиента\
На вход подаётся username (phone) и password\
   http://localhost:8080/api/auth/signin   
   ```
   {
    "username": "896351866602",
    "password": "12345678"
   }
   ```
   Тут выходные данные уже куда интереснее. Мы получаем информацию о том, кто залогинился (айди, телефон, почту, роли).\
   Еще мы получаем accessToken и refreshtoken. Теперь поподробнее об этом
