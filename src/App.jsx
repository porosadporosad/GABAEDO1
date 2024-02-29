import Router from 'shared/Router';
import GlobalStyle from 'GlobalStyle';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <GlobalStyle />
        <Router />
        <ToastContainer />
      </QueryClientProvider>
    </>
  );
}

export default App;
