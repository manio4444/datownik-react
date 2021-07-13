import { RouterPaths } from "./router/consts";
import {
    PageStart,
    PageNotes,
    PageTodo,
    PageCalendar
} from './pages';

export const routes = [
    {
        path: "/",
        component: PageStart,
        exact: true,
    },
    {
        path: `/${RouterPaths.NOTES}`,
        component: PageNotes,
    },
    {
        path: `/${RouterPaths.TODO}`,
        component: PageTodo,
    },
    {
        path: `/${RouterPaths.CALENDAR}/:date`,
        component: PageCalendar,
    },
    {
        path: `/${RouterPaths.CALENDAR}`,
        component: PageCalendar,
    },
];