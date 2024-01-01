import ProjectItems from "./ProjectItems";
import ReactPaginate from "react-paginate";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Icons from "./../Utilities/Icons/Icons";
import { Dropdown } from "react-bootstrap";
import style from "./../Home/SaasProjects.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllProjects, getProjectCategory } from "../../store/projectSlice";

const ProjectPaginatedItems = ({ itemsPerPage, sticky }) => {
  const [itemOffset, setItemOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [categoryName, setCategoryName] = useState("");

  const dispatch = useDispatch();
  const { allProjects } = useSelector((state) => state.projects);
  useEffect(() => {
    setTimeout(() => {
      if (!allProjects.length > 0) {
        dispatch(getAllProjects());
      }
    }, 625);
  }, []);

  const { projectCategory } = useSelector((state) => state.projects);
  useEffect(() => {
    setTimeout(() => {
      if (!projectCategory.length > 0) {
        dispatch(getProjectCategory());
      }
    }, 625);
  }, []);

  const handlecategory = async (e) => {
    setCategoryName(e.target.text);
    dispatch(getAllProjects(e.target.text));

    e.target.classList.add("clicked");

    setItemOffset(0);
    setCurrentPage(0);
  };

  const endOffset = itemOffset + itemsPerPage;

  const currentItems = allProjects.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(allProjects.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % allProjects.length;
    setItemOffset(newOffset);
    setCurrentPage(event.selected);
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
        forcePage={currentPage}
        previousLabel={
          <span className="btn btn-primary btn-min-w mx-2">
            <span className="d-flex justify-content-center align-items-center">
              <Icons family="BsReactIcons" name="BsArrowLeft" /> &nbsp; Previous
            </span>
          </span>
        }
        renderOnZeroPageCount={null}
      />

      <div
        className={`row d-table mt-4 mx-auto z-1 transition ${
          style.category_dropdown_row
        } ${sticky ? "position-sticky" : ""}`}
        style={{ bottom: "3rem" }}
      >
        <div className="col-sm-12">
          <Dropdown
            className={`d-flex flex-wrap justify-content-center mb-555 ${style.category_dropdown}`}
          >
            <Dropdown.Toggle
              className="btn btn-link btn-min-w bg-white fs-base d-flex flex-wrap justify-content-center align-items-center shadow"
              id="dropdown-category"
            >
              {categoryName ? categoryName : "All"}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item
                className={categoryName ? categoryName : "not-selected"}
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
                      className={categoryName ? categoryName : "not-selected"}
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
