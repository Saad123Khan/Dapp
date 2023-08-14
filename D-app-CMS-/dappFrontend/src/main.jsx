import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "./global.css";
import "./assets/styles/styles.css";
import { StoreProvider } from "./context/Store";
import { Helmet } from 'react-helmet';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      refetchOnWindowFocus: false,
    },
  }
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <QueryClientProvider client={queryClient}>
  <BrowserRouter>
    <StoreProvider>
    <Helmet>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        </Helmet>
      <App />
    </StoreProvider>
  </BrowserRouter>
  </QueryClientProvider>
);

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <QueryClientProvider client={queryClient}>
//     <BrowserRouter>
//       <StoreProvider>
//         <App />
//       </StoreProvider>
//     </BrowserRouter>
//     </QueryClientProvider>
// );
