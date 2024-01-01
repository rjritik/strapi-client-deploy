import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getHelpData } from "../../store/homeSlice";
import HTMLReactParser from "html-react-parser";
import Skeleton from "react-loading-skeleton";

const HelpSection = () => {
  const dispatch = useDispatch();
  const { helpData } = useSelector((state) => state.home);

  useEffect(() => {
    setTimeout(() => {
      if (helpData === null) {
        dispatch(getHelpData());
      }
    }, 625);
  }, []);

  return (
    <>
      {helpData && (
        <section className="py-5">
          <div className="container">
            {helpData && helpData.Description ? (
              HTMLReactParser(helpData.Description)
            ) : (
              <div className="row">
                <div className="col-md-5 mb-2 mb-md-0 text-center">
                  <Skeleton
                    className="mx-auto"
                    circle
                    style={{
                      width: "220px",
                      height: "220px",
                    }}
                  />
                </div>
                <div className="col-md-7">
                  <h3>
                    <Skeleton className="w-50" />
                  </h3>
                  <p>
                    <Skeleton className="" />
                    <Skeleton className="w-25" />
                  </p>
                  <ul>
                    <li>
                      <Skeleton className="" />
                    </li>
                    <li>
                      <Skeleton className="" />
                    </li>
                    <li>
                      <Skeleton className="" />
                    </li>
                    <li>
                      <Skeleton className="" />
                    </li>
                    <li>
                      <Skeleton className="" />
                    </li>
                    <li>
                      <Skeleton className="" />
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default HelpSection;
