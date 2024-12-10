import { MantineProvider } from "@mantine/core";
import AgoraRTC, { AgoraRTCProvider } from "agora-rtc-react";
import { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.tsx";
import "./index.css";
import AuthProvider from "./providers/auth.tsx";
import store from "./stores";

const agoraClient = AgoraRTC.createClient({
    mode: "live",
    codec: "vp8",
});

ReactDOM.createRoot(document.getElementById("root")!).render(
    <Suspense fallback={<p>Loading...</p>}>
        <MantineProvider>
            <Provider store={store}>
                <AuthProvider>
                    <AgoraRTCProvider client={agoraClient}>
                        <App />
                    </AgoraRTCProvider>
                </AuthProvider>
            </Provider>
        </MantineProvider>
    </Suspense>
);
