import React from "react";
import { Helmet } from "react-helmet";
import config from "../../../config";

const Head = ({ seoContent, seoTitle }) => {
    // console.log("seoTitle = ", seoTitle);
    // console.log("seoContent = ", seoContent);
    return (
        <>
            {/* <Helmet>
                <title>
                    {seoContent?.MetaTitle ? seoContent?.MetaTitle : seoTitle}
                </title>
            </Helmet> */}

            {seoContent && (
                <Helmet>
                    <title>
                        {seoContent.MetaTitle ? seoContent.MetaTitle : seoTitle}
                    </title>
                    {seoContent.NoIndex ||
                    (seoContent.NoIndex === null && seoContent.NoFollow) ||
                    seoContent.NoFollow === null ? (
                        <meta name="robots" content="noindex, nofollow" />
                    ) : null}
                    {/* <meta name="robots" content="noindex, nofollow" /> */}
                    {/* {seoContent.NoIndex && seoContent.NoFollow ? (
                        <meta name="robots" content="noindex, nofollow" />
                    ) : null} */}
                    {seoContent.MetaDescription && (
                        <meta
                            name="description"
                            content={seoContent.MetaDescription}
                        />
                    )}

                    {seoContent.MetaKeywords && (
                        <meta
                            name="keywords"
                            content={seoContent.MetaKeywords}
                        />
                    )}
                    {seoContent.MetaAuthor && (
                        <meta name="author" content={seoContent.MetaAuthor} />
                    )}
                    {seoContent.MetaTitle && (
                        <meta name="og:title" content={seoContent.MetaTitle} />
                    )}
                    {seoContent.MetaDescription && (
                        <meta
                            name="og:description"
                            content={seoContent.MetaDescription}
                        />
                    )}
                    {seoContent.MetaURL && (
                        <meta
                            name="og:url"
                            content={`${config.FRONTEND_URL}${seoContent.MetaURL}`}
                        />
                    )}
                    {seoContent.MetaImage && (
                        <meta name="og:image" content={seoContent.MetaImage} />
                    )}
                    {seoContent.MetaScript !== "" &&
                        seoContent.MetaScript !== null && (
                            <script type="application/ld+json">{`

                                ${seoContent.MetaScript}

                        `}</script>
                        )}
                </Helmet>
            )}

            {/* {seoContent ? (
                <Helmet>
                    <title>
                        {seoContent.MetaTitle ? seoContent.MetaTitle : null}
                    </title>
                    {seoContent.NoIndex && seoContent.NoFollow ? (
                        <meta name="robots" content="noindex, nofollow" />
                    ) : null}
                    {seoContent.MetaDescription ? (
                        <meta
                            name="description"
                            content={seoContent.MetaDescription}
                        />
                    ) : null}
                    {seoContent.MetaKeywords ? (
                        <meta
                            name="keywords"
                            content={seoContent.MetaKeywords}
                        />
                    ) : null}
                    {seoContent.MetaAuthor ? (
                        <meta name="author" content={seoContent.MetaAuthor} />
                    ) : null}
                    {seoContent.MetaTitle ? (
                        <meta name="og:title" content={seoContent.MetaTitle} />
                    ) : null}
                    {seoContent.MetaDescription ? (
                        <meta
                            name="og:description"
                            content={seoContent.MetaDescription}
                        />
                    ) : null}
                    {seoContent.MetaURL ? (
                        <meta name="og:url" content={seoContent.MetaURL} />
                    ) : null}
                    {seoContent.MetaImage ? (
                        <meta name="og:image" content={seoContent.MetaImage} />
                    ) : null}
                    {seoContent.MetaScript !== "" ||
                    seoContent.MetaScript !== null ? (
                        <script type="application/ld+json">{`

                                ${seoContent.MetaScript}

                        `}</script>
                    ) : null}
                </Helmet>
                
            ) : (
                <Helmet>
                    <title>{seoContent ? seoContent.Title : seoTitle}</title>
                </Helmet>
            )} */}
        </>
    );
};

export default Head;
