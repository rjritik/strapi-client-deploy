import React from "react";
import Skeleton from "react-loading-skeleton";
import style from "./../../../pages/Bookshelf/Bookshelf.module.css";

const BookshelfSkeleton = () => {
    return (
        <>
            <div className="row">
                <div className="col-sm-12 text-center mb-4">
                    <h3 className="mb-4">
                        <Skeleton className="col-sm-6" />
                    </h3>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-6 col-sm-4 col-md-4 col-lg-3 text-center mb-5">
                    <figure>
                        <Skeleton className={`${style.skeleton_img}`} />
                    </figure>
                    <div>
                        <Skeleton count={2} />
                    </div>
                </div>
                <div className="col-6 col-sm-4 col-md-4 col-lg-3 text-center mb-5">
                    <figure>
                        <Skeleton className={`${style.skeleton_img}`} />
                    </figure>
                    <div>
                        <Skeleton count={2} />
                    </div>
                </div>
                <div className="col-6 col-sm-4 col-md-4 col-lg-3 text-center mb-5">
                    <figure>
                        <Skeleton className={`${style.skeleton_img}`} />
                    </figure>
                    <div>
                        <Skeleton count={2} />
                    </div>
                </div>
                <div className="col-6 col-sm-4 col-md-4 col-lg-3 text-center mb-5">
                    <figure>
                        <Skeleton className={`${style.skeleton_img}`} />
                    </figure>
                    <div>
                        <Skeleton count={2} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default BookshelfSkeleton;
