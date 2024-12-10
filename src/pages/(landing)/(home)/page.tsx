import { Button, Text } from "@mantine/core";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="w-full bg-[#243030] min-h-screen">
            <div className="flex flex-col justify-center items-center h-full min-h-screen p-4">
                <Text
                    className="text-4xl lg:text-6xl text-white text-center font-semibold uppercase"
                    mb="lg"
                >
                    Under <br /> Construction
                </Text>

                <Button
                    component={Link}
                    to="/login"
                    size="lg"
                    classNames={{ root: "min-w-[150px]" }}
                    bg="#81adde"
                    c="black"
                    radius="xs"
                >
                    Login for Admin Panel
                </Button>
            </div>
        </div>
    );
};

export default Home;
