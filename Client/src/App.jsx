import { QueryClient, QueryClientProvider } from "react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import ServicePage from "./Pages/ServicePage";
import RolePage from "./Pages/RolePage";
import UserPage from "./Pages/UserPage";
import ArticleTypePage from "./Pages/ArticleTypePage";
import ArticlePage from "./Pages/ArticlePage";

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
]);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

export default App;
