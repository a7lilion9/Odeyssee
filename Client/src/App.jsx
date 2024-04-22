import { QueryClient, QueryClientProvider } from "react-query";
import ServicePage from "./Pages/ServicePage";
import RolePage from "./Pages/RolePage";
import UserPage from "./Pages/UserPage";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <UserPage />
    </QueryClientProvider>
  );
};

export default App;
