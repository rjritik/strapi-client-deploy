import React from "react";
import { Link } from "react-router-dom";
import style from "./PageNotFound.module.css";

const PageNotFound = () => {
    return (
        <>
            <section className="py-5 position-relative">
                <div className="container py-3">
                    <div className="row">
                        <div className="col-sm-12 text-center">
                            <div
                                className={`mx-auto ${style.lottie_img_wrapper}`}
                            >
                                <lottie-player
                                    src="https://lottie.host/6891d59a-ebf3-4f3a-96ed-348124e8caf2/tGKh5QE8eB.json"
                                    background="transparent"
                                    speed="1"
                                    style={{
                                        width: "100%",
                                    }}
                                    loop
                                    autoplay
                                ></lottie-player>
                            </div>

                            <h2 className="font-body">Oops! Page Not Found.</h2>
                            <p>The page you are looking for does not exist.</p>
                            <Link
                                to="/"
                                className="btn btn-secondary d-table mx-auto my-5"
                            >
                                Return to Homepage
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default PageNotFound;
