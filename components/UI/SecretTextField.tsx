import { Icon } from "@iconify/react";
import { ActionIcon, TextInput, TextInputProps } from "@mantine/core";
import React, { useState } from "react";

type IProps = TextInputProps;

const SecretTextField: React.FC<IProps> = ({ ...props }) => {
    const [show, setShow] = useState(false);

    return (
        <TextInput
            size="sm"
            classNames={{ label: "font-semibold", input: "rounded-lg" }}
            type={show ? "text" : "password"}
            rightSection={
                <ActionIcon
                    size="sm"
                    variant="subtle"
                    onClick={() => setShow(!show)}
                >
                    <Icon
                        icon={!show ? "mdi:eye-outline" : "mdi:eye-off-outline"}
                        fontSize={16}
                    />
                </ActionIcon>
            }
            {...props}
        />
    );
};

export default SecretTextField;
