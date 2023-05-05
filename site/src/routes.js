import Admin from "./pages/Admin";
import {ADMIN_ROUTE, CREATE_ORDER_ROUTE, LOGIN_ROUTE, ORDERSTABLE_ROUTE} from "./utils/consts";
import Auth from "./pages/Auth";
import CreatingOrder from "./pages/CreateOrder";
import OrderTable from "./pages/OrdersTable";


export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: CREATE_ORDER_ROUTE,
        Component: CreatingOrder
    },
    {
        path: ORDERSTABLE_ROUTE,
        Component: OrderTable
    }
]

//Тут мы пишем с какой страницы всё начинается (LOGIN_ROUTE)
export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
]
