import React from "react";
import Skeleton from "react-loading-skeleton";

const SkillsItemSkeleton = () => {
    return (
        <>
            <div className="col-6 col-md-3 text-center mb-4">
                <h4 className="mx-auto w-25">
                    <Skeleton />
                </h4>
                <Skeleton className="mx-auto w-50" count={6} />
            </div>
        </>
    );
};

export default SkillsItemSkeleton;
