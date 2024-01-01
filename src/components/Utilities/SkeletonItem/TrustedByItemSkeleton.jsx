import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const TrustedByItemSkeleton = () => {
    return (
        <>
            <div className="col-6 col-sm-6 col-md-4 text-center mb-4">
                <Skeleton className="w-50 py-3" />
            </div>
        </>
    );
};

export default TrustedByItemSkeleton;
