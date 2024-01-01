import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Waves from "../Utilities/Svg/Waves";
import style from "./HeroSection.module.css";
import parse from "html-react-parser";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useDispatch, useSelector } from "react-redux";
import { getHeroData } from "../../store/homeSlice";
import { STATUS } from "../../store/blogSlice";

const HeroSection = () => {
  const dispatch = useDispatch();
  const { heroData: heroData, status } = useSelector((state) => state.home);
  useEffect(() => {
    setTimeout(() => {
      if (heroData === null) dispatch(getHeroData());
    }, 625);
  }, []);

  return (
    <>
      <section className="bg-primary text-white position-relative">
        <div className="container">
          <div className="row flex-column-reverse flex-lg-row">
            <>
              <div className="col-lg-5 text-center text-lg-start d-flex flex-wrap jus align-content-center py-5">
                <h4 className="font-heading fw-700 w-100">
                  {heroData && status === STATUS.IDLE ? (
                    heroData.Subtitle
                  ) : (
                    <div className="col-sm-5 col-lg-8 mx-auto mx-lg-0">
                      <Skeleton className="opacity-75" />
                    </div>
                  )}
                </h4>
                <h1 className="fs-2 fw-normal w-100">
                  {heroData && status === STATUS.IDLE ? (
                    heroData.Title
                  ) : (
                    <div className="col-sm-8 col-lg-12 mx-auto mx-lg-0">
                      <Skeleton className="opacity-75" />
                      <Skeleton className="opacity-75" width="75%" />
                    </div>
                  )}
                </h1>
                <div className="text-white link-text-white mb-3 w-100">
                  {heroData && status === STATUS.IDLE ? (
                    parse(`${heroData.Description}`)
                  ) : (
                    <div className="col-sm-10 col-lg-12 mx-auto mx-lg-0 mb-2">
                      <Skeleton className="opacity-75" count={2} />
                      <Skeleton className="opacity-75" width="75%" />
                      <br />
                      <Skeleton className="opacity-75" count={3} />
                      <Skeleton className="opacity-75" width="50%" />
                    </div>
                  )}
                </div>

                <div className="text-center text-lg-start w-100">
                  {heroData && status === STATUS.IDLE ? (
                    <Link
                      className="btn btn-outline btn-min-w mt-2 position-relative z-1"
                      to={heroData.ButtonURL}
                      target={heroData.NewTab === true ? "_blank" : ""}
                    >
                      {heroData.ButtonTitle}
                    </Link>
                  ) : (
                    <Skeleton className="btn btn-outline btn-skeleton btn-min-w w-auto opacity-75" />
                  )}
                </div>

                <div className="py-3 py-sm-5 py-lg-0 w-100"></div>
              </div>
              <div
                className={`col-lg-7 d-flex flex-wrap align-content-bottom pt-5 ${style.hero_min_h}`}
              >
                {heroData && status === STATUS.IDLE ? (
                  <figure className="d-flex flex-wrap align-content-end m-0 mx-auto">
                    <img
                      className={`${style.hero_img}`}
                      src={heroData.Image.url}
                      alt={heroData.Image.alternativeText}
                    />
                  </figure>
                ) : (
                  <figure className="d-flex flex-wrap align-content-center m-0 mx-auto">
                    <Skeleton
                      className={`opacity-75 ${style.skeleton_hero_img}`}
                      circle
                    />
                  </figure>
                )}
              </div>
            </>
          </div>
        </div>

        <Waves />
      </section>
    </>
  );
};

export default HeroSection;
