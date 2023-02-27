# Spring Server for car wash application
## Имеющиеся запросы, которые работают
### Запросы, связанные с клиентами
1) ```@GetMapping("/client/find-by-id")``` - получение клиента по айди\
Возвращается джейсон с информацией о клиента\
Пример запрсоса : http://localhost:8080/client/find-by-id?id=2 \
То есть после название запросы мы пишем ?id=number, где number- это какой-то id
2) ```@GetMapping("/client/get-all")``` - получение списка всех клиентов\
Пример запроса: http://localhost:8080/order/get-all
3) ```@PostMapping("/client/save")``` - сохранение или регистрация клиента\
На вход подается джейсон с информации о клиенте, а пример запроса - http://localhost:8080/order/save \
Входные данные : 
   ```
   {
   "name": "misha",
   "email": "misha@gmail.com",
   "password":"mishatop"
   }
4) ```@PostMapping("/client/login")``` - логин клиента\
На вход подаётся переменная типа клиента, в которой обязательно должен быть пароль и логин\
   http://localhost:8080/client/login   
   ```
   {
   "email": "misha@gmail.com",
   "password": "mishatop"
   }
5) ```@GetMapping("/client/get-orders")``` - получение заказов клиента\
Возвращает джейсон с этими самыми заказами\
Пример отправить также с вопросиком: http://localhost:8080/client/get-orders?id=?id=number, где number- это какой-то id


### Запросы, к заказам
1) ```@PostMapping("/order/save")``` - бронирование или сохранение заказа\
   Возвращается джейсон с информацией о забронированном заказе\
   Обязательно передавать айди клиента!!\
   Пример запрсоса : http://localhost:8080/order/save \
   ```
   {
    "title": "newnew",
    "price": 1.234,
    "comments": "Hello world",
    "client_id": {
        "id": 1
    }
   }
2) ```@GetMapping("/order/get-all")``` - получение списка всех клиентов\
   Возвращает джейсон со списком всех клиентов\
   Пример запроса: http://localhost:8080/order/get-all \
