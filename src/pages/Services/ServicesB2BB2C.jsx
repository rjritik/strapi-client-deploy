import React, { useEffect } from "react";
import Head from "../../components/Utilities/Head/Head";
import Skeleton from "react-loading-skeleton";
import Waves from "../../components/Utilities/Svg/Waves";
import { useDispatch, useSelector } from "react-redux";
import { getServiceB2bData } from "../../store/serviceb2bSlice";

const ServicesB2BB2C = () => {
  const dispatch = useDispatch();

  const { serviceB2bHeader, serviceB2bContent, serviceB2bSeo, status } =
    useSelector((state) => state.serviceb2b);

  console.log("serviceB2bHeader = ", serviceB2bHeader);
  console.log("serviceB2bContent = ", serviceB2bContent);
  // console.log("serviceB2bSeo = ", serviceB2bSeo[0]);
  console.log("status = ", status);

  useEffect(() => {
    if (serviceB2bHeader === null || serviceB2bContent === null) {
      dispatch(getServiceB2bData());
    }
    if (serviceB2bSeo.length === 0) {
      dispatch(getServiceB2bData());
    }
  }, []);

  return (
    <>
      {/* <Head seoTitle={aboutSeo.MetaTitle} seoContent={aboutSeo} /> */}

      <section className="bg-gray3 pt-5 position-relative">
        <div className="container py-3">
          <div className="row">
            <div className="col-sm-12 col-lg-10 offset-lg-1 col-xl-8 offset-xl-2 text-center mb-4">
              <h1 className="mb-4">{serviceB2bHeader?.title}</h1>

              <h3 className="mb-4">
                <Skeleton className="w-50" />
              </h3>
            </div>
          </div>
        </div>

        <div className="wave_icon py-4 py-md-5 mt-3">
          <Waves />
        </div>
      </section>
    </>
  );
};

export default ServicesB2BB2C;
