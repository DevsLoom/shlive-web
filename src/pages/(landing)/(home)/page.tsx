const Home = () => {
    return (
        <div className="container py-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-center">
                <div className="flex flex-col gap-5 max-w-[600px]">
                    <h4 className="text-3xl font-medium text-justify">
                        Join thousands of successful learners and take the first
                        step toward your driver's license.
                    </h4>
                    <p className="text-base text-justify">
                        BongoItalia Patente is dedicated to helping you achieve
                        your goal of passing the Italian driving test with
                        confidence. Our platform provides expertly crafted
                        courses, engaging materials, and interactive tools
                        designed to make learning effective and enjoyable.
                        Whether you're a beginner or need a refresher, we have
                        you covered! Why Choose Us? We prioritize your success
                        with: Easy-to-follow video tutorials Practice tests that
                        simulate the real exam Multilingual support for
                        non-native speakers Flexible learning at your own pace
                    </p>

                    <nav className="flex gap-5">
                        <a href="">
                            <img
                                src="https://bongoitalia.com/static/assets/images/google_store.webp"
                                alt="Play Store"
                                className="w-full"
                            />
                        </a>

                        <a href="">
                            <img
                                src="https://bongoitalia.com/static/assets/images/app-store.png"
                                alt="Play Store"
                                className="w-full"
                            />
                        </a>
                    </nav>
                </div>

                <div>
                    <div className="max-w-[450px] p-1 border border-gray-300 rounded-lg mx-auto">
                        <img
                            src="https://placehold.co/500x500?text=Placeholder"
                            alt="Placeholder"
                            className="w-full rounded-lg"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
