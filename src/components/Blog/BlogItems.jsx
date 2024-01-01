import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { postURL } from "../Utilities/PostURL/PostUrl";
import BlogItemSkeleton from "../Utilities/SkeletonItem/BlogItemSkeleton";
import { imagePlaceholder } from "./../Utilities/ImagePlaceholder/ImagePlaceholder";
import Icons from "../Utilities/Icons/Icons";
import { dateFormat } from "../Utilities/Date/DateFormat";
import style from "./../../pages/Blog/Blog.module.css";

const BlogItems = ({ currentItems, initPage }) => {
    const navigate = useNavigate();

    const postURLFunction = async (posturl, type) => {
        const apiResponse = await postURL(posturl, type);
        navigate(`/blog/${apiResponse.data.data[0].PostURL}`);
    };

    return (
        <>
            <div className={`row -mb-4 ${style.post_wrapper}`}>
                {currentItems && currentItems.length > 0 ? (
                    currentItems.map((post, index) => {
                        const postDate = dateFormat(post.PostedDate);
                        const publishDate = dateFormat(post.publishedAt);
                        return (
                            <div key={post.id} className="col-md-4 mb-4 post">
                                <div className="pb-4 border h-100 rounded-3 position-relative overflow-hidden">
                                    <Link
                                        className="d-block w-100"
                                        onClick={
                                            (e) =>
                                                postURLFunction(
                                                    post.PostURL,
                                                    "blogs"
                                                ) // slug, type
                                        }
                                    >
                                        <figure className="bg-gray ratio ratio-4x3 mb-0">
                                            <img
                                                src={
                                                    post.BlogThumbnail === null
                                                        ? {
                                                              imagePlaceholder,
                                                          }
                                                        : post.BlogThumbnail.url
                                                }
                                                onError={imagePlaceholder}
                                                alt=""
                                                className="w-100 h-100 object-fit-cover"
                                                loading="lazy"
                                            />
                                        </figure>
                                    </Link>
                                    <div className="p-3">
                                        <h4 className="font-body fw-medium">
                                            <Link
                                                className="d-block"
                                                onClick={
                                                    (e) =>
                                                        postURLFunction(
                                                            post.PostURL,
                                                            "blogs"
                                                        ) // slug, type
                                                }
                                            >
                                                {post.Title}
                                            </Link>
                                        </h4>

                                        <div className="fs-6 mb-4">
                                            Posted date:{" "}
                                            {post.PostedDate === null
                                                ? publishDate
                                                : postDate}
                                        </div>

                                        <div className="d-table p-3 position-absolute start-0 bottom-0">
                                            <Link
                                                className="font-btn d-flex align-items-center"
                                                onClick={
                                                    (e) =>
                                                        postURLFunction(
                                                            post.PostURL,
                                                            "blogs"
                                                        ) // slug, type
                                                }
                                            >
                                                Read More
                                                <span className="fs-6 ms-1 -mt-1">
                                                    <Icons
                                                        family="FaReactIcons"
                                                        name="FaChevronRight"
                                                    />
                                                </span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                ) : initPage.current ? (
                    <div className="no-result-found text-center mb-3">
                        No search result found.
                    </div>
                ) : (
                    <>
                        <BlogItemSkeleton />
                        <BlogItemSkeleton />
                        <BlogItemSkeleton />
                    </>
                )}
            </div>
        </>
    );
};

export default BlogItems;
