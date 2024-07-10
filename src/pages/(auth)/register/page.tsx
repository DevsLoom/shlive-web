import { Icon } from "@iconify/react";
import { Button, Text, Title } from "@mantine/core";
import Validator from "Validator";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CheckBox from "../../../components/UI/CheckBox";
import SecretTextField from "../../../components/UI/SecretTextField";
import TextField from "../../../components/UI/TextField";
import { useCreateRegisterMutation } from "../../../stores/api/auth";
import { resCallback, validateError } from "../../../utils/helpers";
import { Link } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();
    const [create, result] = useCreateRegisterMutation();

    const [isAccept, setIsAccept] = useState(false);
    const [form, setForm] = useState({
        deviceId: "web",
        name: "",
        phone: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const [errors, setErrors] = useState({
        type: { text: "", show: false },
        deviceId: { text: "", show: false },
        name: { text: "", show: false },
        email: { text: "", show: false },
        phone: { text: "", show: false },
        password: { text: "", show: false },
        password_confirmation: { text: "", show: false },
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
            name: "required",
            email: "required",
            phone: "required",
            password: "required|min:6",
            password_confirmation: "required|same:password",
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
                    navigate("/login");
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

            <form onSubmit={submitHandler} className="flex flex-col gap-2">
                <TextField
                    label="Name"
                    value={form.name}
                    error={errors.name.text}
                    onChange={(e) => fieldChangeHandler("name", e.target.value)}
                />
                <TextField
                    label="Email"
                    value={form.email}
                    error={errors.email.text}
                    onChange={(e) =>
                        fieldChangeHandler("email", e.target.value)
                    }
                />
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
                <SecretTextField
                    label="Confirm Password"
                    value={form.password_confirmation}
                    error={errors.password_confirmation.text}
                    onChange={(e) =>
                        fieldChangeHandler(
                            "password_confirmation",
                            e.target.value
                        )
                    }
                />
                <CheckBox
                    label={
                        <div className="flex items-center gap-1 text-sm">
                            I agree to the
                            <Link to="/" className="underline font-semibold">
                                Terms of Service
                            </Link>{" "}
                            &
                            <Link to="/" className="underline font-semibold">
                                Privacy Policy
                            </Link>
                        </div>
                    }
                    checked={isAccept}
                    onChange={(e) => setIsAccept(e.target.checked)}
                />

                <div className="my-3">
                    <Button
                        size="sm"
                        fullWidth
                        type="submit"
                        classNames={{ root: "shadow rounded-lg" }}
                        rightSection={<Icon icon="maki:arrow" />}
                        loading={result?.isLoading}
                        disabled={!isAccept}
                    >
                        Get Started Now
                    </Button>
                </div>

                <Text className="text-sm text-center">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-500 font-semibold">
                        Sign in here
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
      >
        Sign up with Google
      </Button> */}
        </>
    );
};

export default Register;
