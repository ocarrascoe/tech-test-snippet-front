import {Books, Borrows, Home, Users} from "../views";
import {FC} from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";

// Interface
interface Route {
  key: string,
  title: string,
  path: string,
  enabled: boolean,
  component: FC<{}>
  showInMenu: boolean,
  icon: FC<{}>
}

export const routes: Array<Route> = [
  {
    key: 'dashboard-home-route',
    title: 'Home',
    path: '/',
    enabled: true,
    component: Home,
    showInMenu: true,
    icon: DashboardIcon
  },
  {
    key: 'dashboard-books-route',
    title: 'Books',
    path: '/books',
    enabled: true,
    component: Books,
    showInMenu: true,
    icon: LibraryBooksIcon
  },
  {
    key: 'dashboard-borrows-route',
    title: 'Borrows',
    path: '/borrows',
    enabled: true,
    component: Borrows,
    showInMenu: true,
    icon: ShoppingCartIcon
  },
  {
    key: 'dashboard-users-route',
    title: 'Users',
    path: '/users',
    enabled: true,
    component: Users,
    showInMenu: true,
    icon: PeopleIcon
  },
]