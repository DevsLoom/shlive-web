"use client";

import { Icon } from "@iconify/react";
import { Button, Text, Title } from "@mantine/core";
import Validator from "Validator";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { decodeToken, isExpired } from "react-jwt";
import { useDispatch } from "react-redux";
import TextField from "../../../components/UI/TextField";
import { useCreateLoginMutation } from "../../../stores/api/auth";
import { setCurrentUser } from "../../../stores/reducers/auth";
import { message, resCallback, validateError } from "../../../utils/helpers";
import SecretTextField from "@/components/UI/SecretTextField";

const Login = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const [create, result] = useCreateLoginMutation();

    const [form, setForm] = useState({
        type: "phone",
        deviceId: "web",
        phone: "",
        password: "",
    });

    const [errors, setErrors] = useState({
        type: { text: "", show: false },
        deviceId: { text: "", show: false },
        phone: { text: "", show: false },
        password: { text: "", show: false },
    });

    const fieldChangeHandler = (field: string, value: string) => {
        setErrors((prevState) => ({
            ...prevState,
            [field]: { text: "", show: false },
        }));
        setForm((prevState) => ({ ...prevState, [field]: value }));
    };

    const submitHandler = async (e: React.SyntheticEvent) => {
        e.preventDefault();

        const validation = Validator.make(form, {
            phone: "required",
            password: "required|min:6",
        });

        if (validation.fails()) {
            setErrors((prevState) => ({
                ...prevState,
                ...validateError(validation.getErrors()),
            }));
            return;
        }

        const { data, error } = await create(form);

        resCallback({
            data: data,
            error: error,
            cb: () => {
                if (data.status === "success") {
                    const token = data.data.accessToken;
                    const decodedToken = decodeToken(token);
                    const isExpire = isExpired(token);

                    if (!isExpire) {
                        if (decodedToken.type === "ADMIN") {
                            Cookies.set("authToken", token);
                            dispatch(
                                setCurrentUser({
                                    token: token,
                                    currentUser: decodedToken,
                                    isAuthenticate: true,
                                })
                            );

                            router.push("/dashboard");
                        } else {
                            message({
                                title: `Sorry, You are not permitted to login`,
                                icon: "error",
                            });
                        }
                    }
                }
            },
            vErrCb: (vErrors) =>
                setErrors((prevState) => ({
                    ...prevState,
                    ...vErrors,
                })),
        });
    };

    return (
        <>
            <div className="mb-4 text-center">
                <Title className="text-xl">Welcome to Astra</Title>
                <p className="text-sm">Join with Us!</p>
            </div>

            <form onSubmit={submitHandler} className="flex flex-col gap-2 mb-5">
                <TextField
                    label="Phone"
                    value={form.phone}
                    error={errors.phone.text}
                    onChange={(e) =>
                        fieldChangeHandler("phone", e.target.value)
                    }
                />
                <SecretTextField
                    label="Password"
                    description="Minimum 6 characters using both letters & numbers"
                    value={form.password}
                    error={errors.password.text}
                    onChange={(e) =>
                        fieldChangeHandler("password", e.target.value)
                    }
                />

                <div className="my-3">
                    <Button
                        size="sm"
                        fullWidth
                        type="submit"
                        classNames={{ root: "shadow rounded-lg" }}
                        rightSection={<Icon icon="maki:arrow" />}
                        loading={result?.isLoading}
                    >
                        Login
                    </Button>
                </div>

                <Text className="text-sm text-center">
                    Don't have an account?{" "}
                    <Link
                        href="/register"
                        className="text-blue-500 font-semibold"
                    >
                        Sign up here
                    </Link>
                </Text>
            </form>

            {/* <div className="flex items-center gap-4 mb-3 text-sm">
        <div className="w-full h-[2px] bg-gray-200"></div>
        <div>or</div>
        <div className="w-full h-[2px] bg-gray-200"></div>
      </div>

      <Button
        size="sm"
        fullWidth
        variant="transparent"
        classNames={{ root: 'shadow rounded-lg' }}
        color="black"
        leftSection={<Icon icon="devicon:google" />}
        loading={result?.isLoading}
      >
        Sign in with Google
      </Button> */}
        </>
    );
};

export default Login;
