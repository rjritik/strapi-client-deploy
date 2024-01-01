import React, { useEffect } from "react";
import Head from "../../components/Utilities/Head/Head";
import { useDispatch, useSelector } from "react-redux";
import { getBookshelfData } from "../../store/bookshelfSlice";
import Waves from "../../components/Utilities/Svg/Waves";
import Skeleton from "react-loading-skeleton";
import HTMLReactParser from "html-react-parser";
import { Link } from "react-router-dom";
import style from "./Bookshelf.module.css";
import BookshelfSkeleton from "../../components/Utilities/SkeletonItem/BookshelfSkeleton";

const Bookshelf = () => {
    const dispatch = useDispatch();
    const { bookshelfData, status } = useSelector((state) => state.bookshelf);

    useEffect(() => {
        setTimeout(() => {
            if (bookshelfData === null) {
                dispatch(getBookshelfData());
            }
        }, 625);
    }, []);

    return (
        <>
            <Head seoTitle="Bookshelf" />

            <section className="bg-gray3 pt-5 position-relative">
                <div className="container py-3">
                    <div className="row">
                        <div className="col-sm-12 col-lg-10 offset-lg-1 col-xl-8 offset-xl-2 text-center mb-4">
                            <h1 className="mb-4">
                                {bookshelfData && bookshelfData.Header ? (
                                    bookshelfData.Header.Title
                                ) : (
                                    <Skeleton className="w-75" />
                                )}
                            </h1>

                            {bookshelfData && bookshelfData.Header ? (
                                HTMLReactParser(
                                    bookshelfData.Header.Description
                                )
                            ) : (
                                <>
                                    <Skeleton count={2} className="w-100" />
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

            {bookshelfData && (
                <section className={`py-5 ${style.bookshelf_section}`}>
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12 col-md-10 mx-auto -mb-5">
                                {bookshelfData.BookSelfCategory ? (
                                    bookshelfData.BookSelfCategory.map(
                                        (bookshelf, index) => {
                                            return (
                                                <div
                                                    key={bookshelf.id}
                                                    className="pb-0 pb-md-4 pb-lg-5 mb-5"
                                                >
                                                    <div
                                                        className={`row ${style.bookshelf_header}`}
                                                    >
                                                        <div className="col-sm-12 text-center mb-4">
                                                            <h3 className="mb-4">
                                                                {
                                                                    bookshelf.Heading
                                                                }
                                                            </h3>
                                                        </div>
                                                    </div>

                                                    <div
                                                        className={`row justify-content-center -mb-5 ${style.bookshelf_row} ${bookshelf.Heading}`}
                                                    >
                                                        {bookshelf.BookSelfItem.map(
                                                            (item, index) => {
                                                                return (
                                                                    <div
                                                                        key={
                                                                            item.id
                                                                        }
                                                                        className={`col-6 col-sm-4 col-md-4 col-lg-3 text-center mb-5 ${style.bookshelf_col}`}
                                                                    >
                                                                        <Link
                                                                            to={
                                                                                item.URL
                                                                            }
                                                                            target="_blank"
                                                                            className={`d-table mx-auto ${style.bookshelf_item}`}
                                                                        >
                                                                            <figure>
                                                                                <img
                                                                                    src={
                                                                                        item
                                                                                            .Image
                                                                                            .url
                                                                                    }
                                                                                    alt={
                                                                                        item
                                                                                            .Image
                                                                                            .alternativeText
                                                                                    }
                                                                                />
                                                                            </figure>
                                                                            <div>
                                                                                {
                                                                                    item.Title
                                                                                }
                                                                            </div>
                                                                        </Link>
                                                                    </div>
                                                                );
                                                            }
                                                        )}
                                                    </div>
                                                </div>
                                            );
                                        }
                                    )
                                ) : (
                                    <>
                                        <BookshelfSkeleton />
                                        <BookshelfSkeleton />
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </>
    );
};

export default Bookshelf;
