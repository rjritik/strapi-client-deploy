import React from "react";
import Head from "../../components/Utilities/Head/Head";
import { useDispatch, useSelector } from "react-redux";
import { getContactData } from "../../store/contactSlice";
import { useEffect } from "react";
import HTMLReactParser from "html-react-parser";
import Skeleton from "react-loading-skeleton";
import TrustedBy from "./../../components/Home/TrustedBy";
import AchievementSkeleton from "../../components/Utilities/SkeletonItem/AchievementSkeleton";

const Contact = () => {
    const dispatch = useDispatch();
    const { contactData } = useSelector((state) => state.contact);

    useEffect(() => {
        setTimeout(() => {
            if (contactData === null) {
                dispatch(getContactData());
            }
        }, 625);
    }, []);

    return (
        <>
            <Head seoTitle="Contact" />

            {contactData && (
                <section className="py-5">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6">
                                {contactData.Description ? (
                                    HTMLReactParser(contactData.Description)
                                ) : (
                                    <>
                                        <h2>
                                            <Skeleton />
                                        </h2>
                                        <p>
                                            <Skeleton />
                                            <Skeleton className="w-75" />
                                        </p>
                                        <p>
                                            <Skeleton />
                                            <Skeleton className="w-50" />
                                            <Skeleton />
                                            <Skeleton className="w-50" />
                                            <Skeleton />
                                            <Skeleton className="w-50" />
                                        </p>
                                        <p>
                                            <Skeleton className="w-75" />
                                        </p>
                                    </>
                                )}
                            </div>
                            <div className="col-md-6">
                                {contactData.IframeCalendar ? (
                                    HTMLReactParser(contactData.IframeCalendar)
                                ) : (
                                    <Skeleton className="w-100 h-100" />
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            <TrustedBy />

            {contactData && (
                <section className="py-5">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 text-center mb-4">
                                {contactData.AchievementsToShow ? (
                                    <h2 className="mb-4">
                                        {contactData.AchievementsToShow.Heading}{" "}
                                    </h2>
                                ) : (
                                    <h2 className="mb-4">
                                        <Skeleton className="w-50" />
                                    </h2>
                                )}
                            </div>
                        </div>
                        <div className="row -mb-4">
                            {contactData.AchievementsToShow ? (
                                contactData.AchievementsToShow.Items.map(
                                    (item, index) => {
                                        return (
                                            <div
                                                key={item.id}
                                                className="col-6 col-md-3 text-center mb-4"
                                            >
                                                <div className="font-heading display-5 fw-bold mb-3">
                                                    {item.Title}
                                                </div>
                                                <p>{item.Content}</p>
                                            </div>
                                        );
                                    }
                                )
                            ) : (
                                <>
                                    <AchievementSkeleton />
                                    <AchievementSkeleton />
                                    <AchievementSkeleton />
                                    <AchievementSkeleton />
                                </>
                            )}
                        </div>
                    </div>
                </section>
            )}
        </>
    );
};

export default Contact;
