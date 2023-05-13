import Admin from "./pages/Admin";
import {ADMIN_ROUTE, CHANGEUSERINFO_ROUTE, CREATE_ORDER_ROUTE, LOGIN_ROUTE, ORDERSTABLE_ROUTE} from "./utils/consts";
import Auth from "./pages/Auth";
import CreatingOrder from "./pages/CreateOrder";
import OrderTable from "./pages/OrdersTable";
import ChangeUserInfo from "./pages/ChangeUserInfo";


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
    },
    {
        path:CHANGEUSERINFO_ROUTE,
        Component: ChangeUserInfo
    }
]

//Тут мы пишем с какой страницы всё начинается (LOGIN_ROUTE)
export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
]
