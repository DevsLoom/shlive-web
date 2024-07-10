import { RootState } from "@/stores";
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export const useAuth = () => {
    const router = useRouter();
    const { isAuthenticate, currentUser } = useSelector(
        (state: RootState) => state.auth
    );

    useEffect(() => {
        if (!isAuthenticate && router?.pathname !== "/login") {
            router.push("/login");
        }
    }, [isAuthenticate, router]);
};

export default useAuth;
