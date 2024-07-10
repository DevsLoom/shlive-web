import { LoadingOverlay } from "@mantine/core";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { decodeToken, isExpired } from "react-jwt";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../stores/reducers/auth";

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        const token = Cookies.get("authToken") || null;
        if (token) {
            const decodedToken = decodeToken(token);
            const isExpire = isExpired(token);
            if (!isExpire) {
                dispatch(
                    setCurrentUser({
                        token: token,
                        currentUser: decodedToken,
                        isAuthenticate: true,
                    })
                );
            }
        }
        setIsLoading(false);
    }, [dispatch]);

    if (isLoading) {
        return (
            <LoadingOverlay
                visible={isLoading}
                zIndex={10000}
                overlayProps={{ radius: "sm", blur: 2 }}
            />
        );
    }

    return <>{children}</>;
};

export default AuthProvider;
