import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPrivacyPolicy } from "../../store/policySlice";
import Waves from "../../components/Utilities/Svg/Waves";
import Skeleton from "react-loading-skeleton";
import HTMLReactParser from "html-react-parser";
import Head from "../../components/Utilities/Head/Head";
import { useState } from "react";

const PrivacyPolicy = () => {
    const dispatch = useDispatch();
    const { data, status } = useSelector((state) => state.policy);

    const [seoTitle, setSeoTitle] = useState(data?.SEO?.MetaTitle);
    const [seoContent, setSeoContent] = useState(data?.SEO);

    useEffect(() => {
        setTimeout(() => {
            if (!data.length > 0) {
                dispatch(getPrivacyPolicy());
            }
        }, 625);
    }, []);

    return (
        <>
            <Head seoTitle={seoTitle} seoContent={seoContent} />

            {data && (
                <section className="bg-gray3 pt-5 position-relative">
                    <div className="container py-3">
                        <div className="row">
                            <div className="col-sm-12 col-lg-10 offset-lg-1 col-xl-8 offset-xl-2 text-center mb-4">
                                <h1 className="mb-4">
                                    {data.Title ? (
                                        data.Title
                                    ) : (
                                        <Skeleton count={1} className="w-50" />
                                    )}
                                </h1>
                            </div>
                        </div>
                    </div>

                    <div className="wave_icon py-4 py-md-5 mt-3">
                        <Waves />
                    </div>
                </section>
            )}

            {data && data.Description ? (
                HTMLReactParser(data.Description)
            ) : (
                <>
                    <section className="py-5">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-7 mx-auto">
                                    <h3 className=" mb-4 w-75">
                                        <Skeleton />
                                    </h3>
                                    <p>
                                        <Skeleton count={3} />
                                        <Skeleton className="w-50" />
                                    </p>
                                    <p>
                                        <Skeleton count={3} />
                                        <Skeleton className="w-75" />
                                    </p>
                                    <p>
                                        <Skeleton count={3} />
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>
                </>
            )}
        </>
    );
};

export default PrivacyPolicy;
