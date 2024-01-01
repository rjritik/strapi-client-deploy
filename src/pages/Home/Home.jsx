import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import HeroSection from "../../components/Home/HeroSection";
import SaasProjects from "../../components/Home/SaasProjects";
import HomeServices from "../../components/Home/HomeServices";
import Head from "../../components/Utilities/Head/Head";
import TrustedBy from "../../components/Home/TrustedBy";
import IndustryExpertise from "../../components/Home/IndustryExpertise";
import ProcessApproach from "../../components/Home/ProcessApproach";
import Testimonials from "../../components/Home/Testimonials";
import HomeBlog from "../../components/Home/HomeBlog";
import Faq from "../../components/Home/Faq";
import Handbook from "../../components/Home/Handbook";
import SkillsTools from "../../components/Home/SkillsTools";
import { getSeoData } from "../../store/homeSlice";
import HelpSection from "../../components/Home/HelpSection";

const Home = () => {
    const dispatch = useDispatch();
    const { seoData: setSeoData, status } = useSelector((state) => state.home);

    useEffect(() => {
        setTimeout(() => {
            if (setSeoData === null) {
                dispatch(getSeoData());
            }
        }, 625);
    }, []);

    return (
        <>
            {setSeoData && setSeoData.HeroSection && (
                <Head
                    seoContent={setSeoData.seo}
                    seoTitle={setSeoData.HeroSection.Title}
                />
            )}

            <HeroSection />
            <HelpSection />
            <SaasProjects />
            <HomeServices />
            <Handbook />
            <SkillsTools />
            <TrustedBy />
            <IndustryExpertise />
            <ProcessApproach />
            <Testimonials />
            <HomeBlog />
            <Faq />
        </>
    );
};

export default Home;
