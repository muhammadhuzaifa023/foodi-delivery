import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes/Routes.jsx";
import AuthProvider from "./contexts/AuthProvider.jsx";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ThemeProvider } from "./contexts/ThemeContext.jsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <QueryClientProvider client={queryClient}>
      {/* <ThemeProvider> */}
        <RouterProvider router={router} />
      {/* </ThemeProvider> */}
    </QueryClientProvider>
  </AuthProvider>
);
