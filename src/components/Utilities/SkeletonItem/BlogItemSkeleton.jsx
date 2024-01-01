import React from "react";
import Skeleton from "react-loading-skeleton";

const BlogItemSkeleton = () => {
    return (
        <>
            <div className="col-md-4 mb-4 post">
                <div className="border h-100 rounded-3 overflow-hidden">
                    <figure className="ratio ratio-4x3 mb-0">
                        <Skeleton className="align-top w-100 h-100 rounded-0" />
                    </figure>
                    <div className="p-3">
                        <h4 className="font-body fw-medium">
                            <Skeleton />
                            <Skeleton className="col-sm-10" />
                        </h4>
                        <div className="category mb-3">
                            <Skeleton className="col-sm-4" />
                        </div>
                        <div className="excerpt">
                            <Skeleton count={4} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BlogItemSkeleton;
