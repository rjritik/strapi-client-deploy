import React from "react";
import Head from "../../components/Utilities/Head/Head";
import Waves from "../../components/Utilities/Svg/Waves";
import { useDispatch, useSelector } from "react-redux";
import { getAboutData } from "../../store/aboutSlice";
import { useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import HTMLReactParser from "html-react-parser";
import style from "./Me.module.css";

const Me = () => {
    const dispatch = useDispatch();
    const { aboutHeader, aboutContent, aboutSeo, status } = useSelector(
        (state) => state.about
    );

    useEffect(() => {
        setTimeout(() => {
            if (aboutHeader === null || aboutContent === null) {
                dispatch(getAboutData());
            }
        }, 625);
        if (!aboutSeo.length > 0) {
            dispatch(getAboutData());
        }
    }, []);

    return (
        <>
            <Head seoTitle={aboutSeo.MetaTitle} seoContent={aboutSeo} />

            <section className="bg-gray3 pt-5 position-relative">
                <div className="container py-3">
                    <div className="row">
                        <div className="col-sm-12 col-lg-10 offset-lg-1 col-xl-8 offset-xl-2 text-center mb-4">
                            <h1 className="mb-4">
                                {aboutHeader !== null ? (
                                    aboutHeader.Title
                                ) : (
                                    <Skeleton count={4} className="w-75" />
                                )}
                            </h1>

                            {aboutHeader !== null ? (
                                HTMLReactParser(aboutHeader.Description)
                            ) : (
                                <>
                                    <h3 className="mb-4">
                                        <Skeleton className="w-50" />
                                    </h3>
                                    <Skeleton count={3} className="w-10" />
                                </>
                            )}
                        </div>
                    </div>
                </div>

                <div className="wave_icon py-4 py-md-5 mt-3">
                    <Waves />
                </div>
            </section>

            {aboutContent && HTMLReactParser(aboutContent)}
        </>
    );
};

export default Me;
