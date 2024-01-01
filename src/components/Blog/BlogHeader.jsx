import React, { useEffect, useState } from "react";
import Waves from "../Utilities/Svg/Waves";
import HTMLReactParser from "html-react-parser";
import Skeleton from "react-loading-skeleton";
import { useSelector } from "react-redux";

const BlogHeader = ({ categoryHeaderData }) => {
    const [blogHeaderData, setBlogHeaderData] = useState(null);
    const { blogHeader } = useSelector((state) => state.blog);

    useEffect(() => {
        setTimeout(() => {
            if (categoryHeaderData.length === undefined) {
                setBlogHeaderData(categoryHeaderData);
            } else {
                setBlogHeaderData(blogHeader);
            }
        }, 625);
    }, [categoryHeaderData]);

    return (
        <>
            <section className="bg-gray3 pt-5 position-relative">
                <div className="container py-3">
                    <div className="row">
                        <div className="col-sm-12 col-lg-10 offset-lg-1 col-xl-8 offset-xl-2 text-center mb-4">
                            <h1>
                                {blogHeaderData !== null ? (
                                    blogHeaderData.Title
                                ) : (
                                    <Skeleton className="w-50" />
                                )}
                            </h1>
                            {blogHeaderData !== null ? (
                                HTMLReactParser(blogHeaderData.Description)
                            ) : (
                                <>
                                    <Skeleton className="w-75" />
                                    <Skeleton className="w-100" />
                                    <Skeleton className="w-75" />
                                </>
                            )}
                        </div>
                    </div>
                </div>

                <div className="wave_icon py-4 py-md-5 mt-3">
                    <Waves />
                </div>
            </section>
        </>
    );
};

export default BlogHeader;
