import React, { useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import TrustedByItemSkeleton from "../Utilities/SkeletonItem/TrustedByItemSkeleton";
import { useDispatch, useSelector } from "react-redux";
import { getTrustedBy } from "../../store/homeSlice";

const TrustedBy = () => {
    const dispatch = useDispatch();
    const { trustedByHeader, trustedByData } = useSelector(
        (state) => state.home
    );

    useEffect(() => {
        setTimeout(() => {
            if (trustedByHeader === null || !trustedByData.length > 0) {
                dispatch(getTrustedBy());
            }
        }, 625);
    }, []);

    return (
        <>
            <section className="bg-primary-light2 py-5">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 col-lg-10 offset-lg-1 col-xl-8 offset-xl-2 mb-4">
                            <h2 className="text-center fw-bold mb-4">
                                {trustedByHeader &&
                                trustedByHeader.length > 0 ? (
                                    trustedByHeader
                                ) : (
                                    <div className="col-sm-8 mx-auto">
                                        <Skeleton />
                                    </div>
                                )}
                            </h2>
                        </div>
                    </div>
                    <div className="row -mb-4">
                        {trustedByData && trustedByData.length > 0 ? (
                            trustedByData.map((brand) => {
                                return (
                                    <div
                                        key={brand.id}
                                        className="col-6 col-sm-6 col-md-4 text-center mb-5"
                                    >
                                        <img
                                            className="img-theme-color"
                                            src={brand.TrustedCompany[0].url}
                                            alt={brand.TrustedCompany.name}
                                        />
                                    </div>
                                );
                            })
                        ) : (
                            <>
                                <TrustedByItemSkeleton />
                                <TrustedByItemSkeleton />
                                <TrustedByItemSkeleton />
                                <TrustedByItemSkeleton />
                                <TrustedByItemSkeleton />
                                <TrustedByItemSkeleton />
                                <TrustedByItemSkeleton />
                                <TrustedByItemSkeleton />
                                <TrustedByItemSkeleton />
                            </>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
};

export default TrustedBy;
