import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import GlobalStyles from "./styles/GlobalStyles";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Cabins from "./pages/Cabins";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import Account from "./pages/Account";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./ui/AppLayout";
import { Toaster } from "react-hot-toast";

// o queryClient() é uma instância do QueryClient que é criado com as configurações padrão que queremos que todas as queries tenham. Aqui, estamos definindo que o staleTime padrão para todas as queries é 60 segundos.
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      //   staleTime: 60 * 1000,
      staleTime: 0,
    },
  },
});

function App() {
  return (
    // o QueryClientProvider é um componente que deve ser colocado no topo da nossa aplicação para que o React Query funcione corretamente. Ele recebe uma propriedade chamada client que é a instância do QueryClient que criamos anteriormente.
    <QueryClientProvider client={queryClient}>
      {/* o ReactQueryDevtools é um componente que nos permite visualizar e depurar as queries que estão sendo feitas em nossa aplicação. Ele é um componente que deve ser colocado dentro do QueryClientProvider. 
      
      Para instalar o ReactQueryDevtools, você pode rodar o comando npm i @tanstack/react-query-devtools. Nesse exemplo foi usada a versão 4 do react-query-devtools por conta da compatibilidade da versão do react-query instalado (versão 4)*/}
      <ReactQueryDevtools initialIsOpen={false} />

      {/* // o GlobalStyles é um componente que contém estilos globais que são aplicados em toda a aplicação. Ele é um componente que deve ser colocado como componente irmão do local onde será aplicado os estilos globais. */}
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate replace to="dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="cabins" element={<Cabins />} />
            <Route path="users" element={<Users />} />
            <Route path="settings" element={<Settings />} />
            <Route path="account" element={<Account />} />
          </Route>

          <Route path="login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>

      {/* 
      Foi instalado o pacote react-hot-toast para exibir notificações na tela. Para instalar o pacote, você pode rodar o comando npm i react-hot-toast.

      o Toaster é um componente que nos permite exibir notificações na tela. Ele é um componente que deve ser colocado no topo da nossa aplicação para que funcione corretamente. Ele aceita várias propriedades que nos permitem customizar o comportamento e a aparência das notificações. */}
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "1.6rem",
            maxWidth: "500px",
            padding: "16px 24px",
            background: "var(--color-grey-0)",
            color: "var(--color-grey-700)",
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
