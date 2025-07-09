Структура данных приложения:

---

Области хранения данных:

База данных на json-server
BFF
Редакс Стор

---

Сущности приложкения:

-Пользователь: БД (список пользователей), BFF (сессия текущего), Стор (отображение в браузере).
-Роль пользователя: БД (список ролей), BFF (сессия пользователя с ролью), Стор (использование на клиенте).
-Товар: БД (список товаров), Стор (отображение в браузере).
-Категория: БД (список категорий), Стор (отображение и фильтрация в браузере).
-Заказ: БД (список заказов), Стор (отображение в браузере).
-Детали заказа: БД (список деталей заказов), Стор (отображение в составе заказов в браузере).
-Корзина: BFF (синхронизация текущей корзины, опционально), Стор (отображение и управление в браузере).
-Комментарий: БД (список комментариев к товарам), Стор (отображение под товарами в браузере).

---

ТАБЛИЦЫ БД:

Пользователи (users): id / login / password / registered_at / role_id / email,
Роли (roles): id / name,
Товары (products): id / title / image_url / price / category_id / description / stock / created_at
Категории (categories): id / name / parent_id
Заказы (orders): id / user_id / total_price / status / created_at / delivery_address
Детали заказа (order_items): id / order_id / product_id / quantity / price
Комментарии (comments): id / user_id / product_id / text / created_at

---

СХЕМА СОСТОЯНИЯ НА BFF:

Сессия текущего пользователя: login / password / role / cart: product_id, quantity /comments?

---

Схема для Redux Store (на клиенте) /states/:

Пользователь (user): id / login / roleId / session,
Пользователи (users): id / login / registedAt / roleId,
Товары (products): Массив: id / title / imageUrl / price / categoryId / stock / comments: id, userId, text, createdAt;
Товар (product): id / title / imageUrl / price / description / stock / category / comments: id, author, text, createdAt;
Комментарии: id / author_id / product_id / createdAt / content;
Корзина (cart): Массив: productId / title / imageUrl / price / quantity,
Заказы (orders): Массив: id / totalPrice / status / createdAt / items: productId, title, quantity, price,
Категории (categories): Массив: id / name / parentId

---
