import { QueryClient, QueryClientProvider } from "react-query";

import ServicePage from "./Pages/ServicePage";
import RolePage from "./Pages/RolePage";
import UserPage from "./Pages/UserPage";
import ArticleTypePage from "./Pages/ArticleTypePage";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      {/* <UserPage /> */}
      {/* <ServicePage /> */}
      <ArticleTypePage />
    </QueryClientProvider>
  );
};

export default App;
