import { createBrowserRouter, redirect } from "react-router-dom";
import BaseLayout from "../views/baselayout";
import HomePage from "../views/homePage";
import LoginPage from "../views/login";
import AddUserPage from "../views/addUser";
import UpdateUserPage from "../views/updateUser";

const url = `http://localhost:3000`;

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage url={url} />,
    loader: () => {
      if (localStorage.access_token) {
        return redirect("/");
      }
      return null;
    },
  },
  {
    element: <BaseLayout />,
    loader: () => {
      if (!localStorage.access_token) {
        return redirect("/login");
      }
      return null;
    },
    children: [
      {
        path: "/",
        element: <HomePage url={url} />,
      },
      {
        path: "/addUser",
        element: <AddUserPage url={url} />,
      },
      {
        path: "/updateUser/:id",
        element: <UpdateUserPage url={url} />,
      },
    ],
  },
]);

export default router;
