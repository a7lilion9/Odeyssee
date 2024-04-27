import { QueryClient, QueryClientProvider } from "react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import ServicePage from "./Pages/ServicePage";
import RolePage from "./Pages/RolePage";
import UserPage from "./Pages/UserPage";
import ArticleTypePage from "./Pages/ArticleTypePage";
import ArticlePage from "./Pages/ArticlePage";
import HomePage from "./Pages/HomePage";
import ErrorPage from "./Pages/ErrorPage";
import ItemPage from "./Pages/ItemPage";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/services",
    element: <ServicePage />,
  },
  {
    path: "/users",
    element: <UserPage />,
  },
  {
    path: "/roles",
    element: <RolePage />,
  },
  {
    path: "/articletypes",
    element: <ArticleTypePage />,
  },
  {
    path: "/articles",
    element: <ArticlePage />,
  },
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/errors",
    element: <ErrorPage />,
  },
  {
    path: "/items",
    element: <ItemPage />,
  },
]);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

export default App;
