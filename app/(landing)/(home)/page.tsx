import { Button, Text } from "@mantine/core";
import Link from "next/link";

const Home = () => {
    return (
        <div className="w-full h-full bg-[#243030] p-4">
            <div className="flex flex-col justify-center items-center h-full">
                <Text
                    className="text-6xl text-white text-center font-semibold uppercase"
                    mb="lg"
                >
                    Under <br /> Construction
                </Text>

                <Button
                    component={Link}
                    href="/login"
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
