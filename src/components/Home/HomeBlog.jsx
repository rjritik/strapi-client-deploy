import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import HTMLReactParser from "html-react-parser";
import { postURL } from "../Utilities/PostURL/PostUrl";
import { imagePlaceholder } from "./../Utilities/ImagePlaceholder/ImagePlaceholder";
import Skeleton from "react-loading-skeleton";
import BlogItemSkeleton from "../Utilities/SkeletonItem/BlogItemSkeleton";
import { useDispatch, useSelector } from "react-redux";
import { getAllPost, getHomeBlogHeader } from "../../store/blogSlice";

const HomeBlog = () => {
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const { homeBlogHeader, allPost, status } = useSelector(
        (state) => state.blog
    );

    useEffect(() => {
        setTimeout(() => {
            if (homeBlogHeader === null) {
                dispatch(getHomeBlogHeader());
            }
            if (!allPost.length > 0) {
                dispatch(getAllPost());
            }
        }, 625);
    }, []);

    const postURLFunction = async (posturl, type) => {
        const apiResponse = await postURL(posturl, type);
        navigate(`/blog/${apiResponse.data.data[0].PostURL}`, {
            state: apiResponse.data.data[0],
        });
    };

    return (
        <>
            <section className="py-5">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 col-lg-10 offset-lg-1 col-xl-8 offset-xl-2 text-center mb-5">
                            {homeBlogHeader && homeBlogHeader.Title !== null ? (
                                <h2 className="mb-4">{homeBlogHeader.Title}</h2>
                            ) : (
                                <h2 className="d-table mx-auto mb-4">
                                    <Skeleton className="px-5" />
                                </h2>
                            )}

                            {homeBlogHeader &&
                            homeBlogHeader.Description !== null ? (
                                HTMLReactParser(homeBlogHeader.Description)
                            ) : (
                                <>
                                    <Skeleton />
                                    <Skeleton className="w-75" />
                                    <Skeleton className="w-50" />
                                </>
                            )}
                        </div>
                    </div>

                    <div className="row -mb-4">
                        {allPost && allPost.length > 0 ? (
                            allPost.slice(0, 3).map((post, index) => {
                                return (
                                    <div
                                        key={post.id}
                                        className="col-md-4 mb-4"
                                    >
                                        <div className="border h-100 rounded-3 overflow-hidden">
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
                                                <figure className="ratio ratio-4x3 mb-0">
                                                    <img
                                                        src={
                                                            post.BlogThumbnail ===
                                                            null
                                                                ? {
                                                                      imagePlaceholder,
                                                                  }
                                                                : post
                                                                      .BlogThumbnail
                                                                      .url
                                                        }
                                                        onError={
                                                            imagePlaceholder
                                                        }
                                                        alt=""
                                                        className="w-100 h-100 object-fit-cover"
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
                                                <div className="category mb-3">
                                                    <Link to="#">
                                                        {post.blog_categories.map(
                                                            (category) =>
                                                                category.CategoryName
                                                        )}
                                                    </Link>
                                                </div>
                                                <div className="excerpt">
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
                                                        {HTMLReactParser(
                                                            `${post.Excerpt}`
                                                        )}
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <>
                                <BlogItemSkeleton />
                                <BlogItemSkeleton />
                                <BlogItemSkeleton />
                            </>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
};

export default HomeBlog;
