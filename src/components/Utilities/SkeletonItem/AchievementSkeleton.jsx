import React from "react";
import Skeleton from "react-loading-skeleton";

const AchievementSkeleton = () => {
    return (
        <>
            <div className="col-6 col-md-3 text-center mb-4">
                <div className="font-heading display-5 fw-bold mb-3">
                    <Skeleton className="px-4 w-auto" />
                </div>
                <Skeleton className="w-100" />
                <Skeleton className="mx-auto w-50" />
            </div>
        </>
    );
};

export default AchievementSkeleton;
