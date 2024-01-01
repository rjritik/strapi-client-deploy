import ProjectItems from "./ProjectItems";
import ReactPaginate from "react-paginate";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import config from "../../../config";
import Icons from "../Icons/Icons";
import { Dropdown } from "react-bootstrap";
import style from "./../../Home/SaasProjects.module.css";

const ProjectPaginatedItems = ({ itemsPerPage }) => {
    const [itemOffset, setItemOffset] = useState(0);
    const [allProjects, setAllProjects] = useState([]);

    const [projectCategory, setProjectCategory] = useState([]);
    const [categoryName, setCategoryName] = useState("");

    useEffect(() => {
        async function AllProjectsData() {
            try {
                const allProjectsAPI = await axios.get(
                    `${config.BACKEND_URL}/api/saas-projects?populate=*`
                );

                const ProjectCategoryAPI = await axios.get(
                    `${config.BACKEND_URL}/api/project-categories?populate=*`
                );

                setTimeout(() => {
                    setAllProjects(allProjectsAPI.data.data);
                    setProjectCategory(ProjectCategoryAPI.data.data);
                }, 625);
            } catch (error) {
                console.error(error);
            }
        }

        AllProjectsData();
    }, []);

    const handlecategory = async (e) => {
        setCategoryName(e.target.text);
        const ProjectFilterCategoryAPI = await axios.get(
            `${config.BACKEND_URL}/api/project-categories?populate[0]=Category.ProjectThumbnail&filters[CategoryName][$eq]=${e.target.text}`
        );
        const allProjectsAPI = await axios.get(
            `${config.BACKEND_URL}/api/saas-projects?populate=*`
        );

        if (e.target.text !== "All") {
            setAllProjects(ProjectFilterCategoryAPI.data.data[0].Category);
        } else {
            setAllProjects(allProjectsAPI.data.data);
        }

        e.target.classList.add("clicked");

        setItemOffset(0);
    };

    const endOffset = itemOffset + itemsPerPage;

    const currentItems = allProjects.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(allProjects.length / itemsPerPage);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % allProjects.length;
        setItemOffset(newOffset);
    };

    return (
        <>
            <ProjectItems currentItems={currentItems} />

            <ReactPaginate
                className="pagination"
                breakLabel="..."
                nextLabel={
                    <span className="btn btn-primary btn-min-w mx-2">
                        <span className="d-flex justify-content-center align-items-center">
                            Next &nbsp;
                            <Icons family="BsReactIcons" name="BsArrowRight" />
                        </span>
                    </span>
                }
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel={
                    <span className="btn btn-primary btn-min-w mx-2">
                        <span className="d-flex justify-content-center align-items-center">
                            <Icons family="BsReactIcons" name="BsArrowLeft" />{" "}
                            &nbsp; Previous
                        </span>
                    </span>
                }
                renderOnZeroPageCount={null}
            />

            <div className={`row mt-4 ${style.category_dropdown_row}`}>
                <div className="col-sm-12">
                    <Dropdown
                        className={`d-flex flex-wrap justify-content-center ${style.category_dropdown}`}
                    >
                        <Dropdown.Toggle
                            className="btn btn-link btn-min-w fs-base d-flex flex-wrap justify-content-center align-items-center shadow"
                            id="dropdown-category"
                        >
                            {categoryName ? categoryName : "All"}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item
                                className={
                                    categoryName ? categoryName : "not-selected"
                                }
                                onClick={(e) => handlecategory(e)}
                            >
                                All
                            </Dropdown.Item>
                            {projectCategory &&
                                projectCategory.map((category, index) => {
                                    return (
                                        <Dropdown.Item
                                            key={category.id}
                                            onClick={(e) => handlecategory(e)}
                                            className={
                                                categoryName
                                                    ? categoryName
                                                    : "not-selected"
                                            }
                                        >
                                            {category.CategoryName}{" "}
                                        </Dropdown.Item>
                                    );
                                })}
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>
        </>
    );
};

export default ProjectPaginatedItems;
