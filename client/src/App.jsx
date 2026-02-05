import HomePage from './routes/homePage/homePage'
import { 
  createBrowserRouter, RouterProvider, 
} from 'react-router-dom';
import ListPage from './routes/listPage/ListPage';
import {  Layout, RequireAuth } from './routes/layout/Layout';
import SinglePage from './routes/singlePage/SinglePage';
import Login from './routes/login/Login';
import Register from './routes/register/Register';
import Profile from './routes/profile/Profile';
import ProfileUpdatePage from './routes/profileUpdatePage/ProfileUpdatePage';
import NewPostPage from './routes/newPostPage/newPostPage';
import { listPageLoader, profilePageLoader, singlePageLoader } from './lib/loaders';
import ProfileErrorPage from './routes/profile/ProfileErrorPage';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },

        {
          path: "list",
          element: <ListPage />,
          loader: listPageLoader,
        },

        {
          path: "posts/:id",
          element: <SinglePage />,
          loader: singlePageLoader,
        },

        {
          path: "login",
          element: <Login />,
        },

        {
          path: "register",
          element: <Register />,
        },

        // 🔐 ZAŠTIĆENE RUTE
        {
          element: <RequireAuth />,
          children: [
            {
              path: "profile",
              element: <Profile />,
              loader: profilePageLoader,
              errorElement: <ProfileErrorPage />,
            },
            {
              path: "profile/update",
              element: <ProfileUpdatePage />,
            },
            {
              path: "add",
              element: <NewPostPage />,
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;

