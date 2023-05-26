import Admin from "./pages/Admin";
import {
    ADMIN_ROUTE, CHANGE_USERINFO_ROUTE,
    CREATE_POLISHING_ORDER_ROUTE, CREATE_TIRE_ORDER_ROUTE,
    CREATE_WASHING_ORDER_ROUTE,
    LOGIN_ROUTE, ORDERS_TABLE_ROUTE, UPDATE_ORDER_INFO_ROUTE,
} from "./utils/consts";
import Auth from "./pages/Auth";
import OrderTable from "./pages/OrdersTable";
import ChangeUserInfo from "./pages/ChangeUserInfo";
import CreatingWashingOrder from "./pages/CreatingWashingOrder";
import CreatingPolishingOrder from "./pages/CreatingPolishingOrder";
import CreatingTireOrder from "./pages/CreatingTireOrder";
import UpdateOrderInfo from "./pages/UpdateOrderInfo";


export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: CREATE_WASHING_ORDER_ROUTE,
        Component: CreatingWashingOrder
    },
    {
        path: CREATE_POLISHING_ORDER_ROUTE,
        Component: CreatingPolishingOrder
    },
    {
        path: CREATE_TIRE_ORDER_ROUTE,
        Component: CreatingTireOrder
    },
    {
        path: ORDERS_TABLE_ROUTE,
        Component: OrderTable
    },
    {
        path:CHANGE_USERINFO_ROUTE,
        Component: ChangeUserInfo
    },
    {
        path:UPDATE_ORDER_INFO_ROUTE,
        Component: UpdateOrderInfo
    }
]

//Тут мы пишем с какой страницы всё начинается (LOGIN_ROUTE)
export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
]
