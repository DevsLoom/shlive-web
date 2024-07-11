import "filepond/dist/filepond.min.css";
import { useState } from "react";
import { FilePond, registerPlugin } from "react-filepond";

import { Image } from "@mantine/core";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

type IProps = {
    file?: string;
    uploadHandler?: (value: unknown) => void;
};

const FileUploader: React.FC<IProps> = ({ file, uploadHandler = () => {} }) => {
    const [files, setFiles] = useState([]);

    return (
        <>
            {file && (
                <Image src={file} classNames={{ root: "w-20 h-20 mb-2" }} />
            )}

            <FilePond
                files={files}
                onupdatefiles={setFiles}
                onprocessfile={(_err, file) => {
                    const res = JSON.parse(file.serverId);
                    if (res.status === "success") {
                        uploadHandler(res.data.host + res.data.path);
                        setFiles([]);
                    }
                }}
                allowMultiple={false}
                maxFiles={3}
                server={{
                    url: import.meta.env.VITE_PUBLIC_API_URL,
                    process: (
                        fieldName,
                        file,
                        metadata,
                        load,
                        error,
                        progress,
                        abort,
                        transfer,
                        options
                    ) => {
                        const formData = new FormData();
                        formData.append("file", file);
                        const request = new XMLHttpRequest();
                        request.open(
                            "POST",
                            import.meta.env.VITE_PUBLIC_API_URL +
                                "/api/v1/media"
                        );
                        request.upload.onprogress = (e) => {
                            progress(e.lengthComputable, e.loaded, e.total);
                        };
                        request.onload = function () {
                            if (request.status >= 200 && request.status < 300) {
                                load(request.responseText);
                            } else {
                                error("oh no");
                            }
                        };
                        request.send(formData);
                        return {
                            abort: () => {
                                request.abort();
                                abort();
                            },
                        };
                    },
                }}
                name="files"
                labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
            />
        </>
    );
};

export default FileUploader;
