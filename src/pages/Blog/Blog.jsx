import React from "react";
import Head from "../../components/Utilities/Head/Head";
import BlogHeader from "../../components/Blog/BlogHeader";
import BlogPaginatedItems from "../../components/Blog/BlogPaginatedItems";
import style from "./Blog.module.css";
import { useState } from "react";

const Blog = () => {
    const [categoryHeaderData, setCategoryHeaderData] = useState("");
    const getCategoryHeader = (getCategoryHeaderData) => {
        setCategoryHeaderData(getCategoryHeaderData);
    };

    return (
        <>
            <Head seoTitle="Blog" />

            <BlogHeader categoryHeaderData={categoryHeaderData} />
            <section className={`py-5 ${style.blog_section}`}>
                <div className="container">
                    <BlogPaginatedItems
                        itemsPerPage={12}
                        // itemsPerPage={3}
                        getCategoryHeader={getCategoryHeader}
                    />
                </div>
            </section>
        </>
    );
};

export default Blog;
