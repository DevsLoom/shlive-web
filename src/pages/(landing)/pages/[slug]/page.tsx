import { useParams } from "react-router-dom";
import { useFetchDynamicPageQuery } from "../../../../stores/api/publics";
import LoadingSkeleton from "../../../../components/UI/LoadingSkeleton";

const DynamicPage = () => {
    const { slug } = useParams();

    const { data, isFetching, isError, error } = useFetchDynamicPageQuery(
        `${slug}?searchBy=slug`
    );

    if (isFetching || isError) {
        return (
            <LoadingSkeleton
                isLoading={isFetching}
                isError={isError}
                error={error}
            />
        );
    }

    return (
        <div className="container py-10">
            <h5 className="text-2xl text-center font-medium mb-5">
                {data?.title ?? "N/A"}
            </h5>
            <div
                dangerouslySetInnerHTML={{ __html: data?.content ?? "N/A" }}
            ></div>
        </div>
    );
};

export default DynamicPage;
