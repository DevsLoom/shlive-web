import { Text } from "@mantine/core";
import ReactQuill, { ReactQuillProps } from "react-quill";
import "react-quill/dist/quill.snow.css";

const TextEditor: React.FC<ReactQuillProps & { label: string }> = ({
    label,
    ...props
}) => {
    return (
        <>
            {label && (
                <Text size="sm" fw={600}>
                    {label}
                </Text>
            )}
            <ReactQuill theme="snow" {...props} />
        </>
    );
};

export default TextEditor;
