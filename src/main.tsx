import { MantineProvider } from "@mantine/core";
import { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.tsx";
import "./index.css";
import AuthProvider from "./providers/auth.tsx";
import store from "./stores";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <Suspense fallback={<p>Loading...</p>}>
        <MantineProvider>
            <Provider store={store}>
                <AuthProvider>
                    <App />
                </AuthProvider>
            </Provider>
        </MantineProvider>
    </Suspense>
);
