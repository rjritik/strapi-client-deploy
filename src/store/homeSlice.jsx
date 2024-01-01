import { createSlice } from "@reduxjs/toolkit";
import { STATUS } from "./blogSlice";
import axios from "axios";
import config from "../config";

const homeSlice = createSlice({
    name: "home",
    initialState: {
        heroData: null,
        helpData: null,

        saasHomeHeader: null,
        saasHomeButton: null,

        homeServicesHeaderData: null,
        homeServicesButtonData: null,
        homeServicesListData: [],

        homeFaqHeader: null,
        homeFaqData: [],

        testimonialHeader: null,
        testimonialData: [],
        testimonialButton: null,

        processApproachHeader: null,
        processApproachData: [],
        processApproachButton: null,

        industryExtertise: null,
        industryExtertiseData: [],

        trustedByHeader: null,
        trustedByData: [],

        skillsToolsHeader: null,
        skillsToolsData: [],

        handbookData: null,

        seoData: null,
        status: STATUS.IDLE,
    },
    reducers: {
        setHeroData(state, action) {
            state.heroData = action.payload;
        },
        setHelpData(state, action) {
            state.helpData = action.payload;
        },
        setSeoData(state, action) {
            state.seoData = action.payload;
        },

        setHomeSaasHeader(state, action) {
            state.saasHomeHeader = action.payload;
        },
        setHomeSaasButton(state, action) {
            state.saasHomeButton = action.payload;
        },

        setHomeServicesHeaderData(state, action) {
            state.homeServicesHeaderData = action.payload;
        },
        setHomeServicesButtonData(state, action) {
            state.homeServicesButtonData = action.payload;
        },
        setHomeServicesListData(state, action) {
            state.homeServicesListData = action.payload;
        },

        setHomeFaqHeader(state, action) {
            state.homeFaqHeader = action.payload;
        },
        setHomeFaqData(state, action) {
            state.homeFaqData = action.payload;
        },

        setTestimonialHeader(state, action) {
            state.testimonialHeader = action.payload;
        },
        setTestimonialData(state, action) {
            state.testimonialData = action.payload;
        },
        setTestimonialButton(state, action) {
            state.testimonialButton = action.payload;
        },

        setProcessApproachHeader(state, action) {
            state.processApproachHeader = action.payload;
        },
        setProcessApproachData(state, action) {
            state.processApproachData = action.payload;
        },
        setProcessApproachButton(state, action) {
            state.processApproachButton = action.payload;
        },

        setIndustryExtertise(state, action) {
            state.industryExtertise = action.payload;
        },
        setIndustryExtertiseData(state, action) {
            state.industryExtertiseData = action.payload;
        },

        setTrustedByHeader(state, action) {
            state.trustedByHeader = action.payload;
        },
        setTrustedByData(state, action) {
            state.trustedByData = action.payload;
        },

        setSkillsToolsHeader(state, action) {
            state.skillsToolsHeader = action.payload;
        },
        setSkillsToolsData(state, action) {
            state.skillsToolsData = action.payload;
        },

        setHandbookData(state, action) {
            state.handbookData = action.payload;
        },

        setStatus(state, action) {
            state.status = action.payload;
        },
    },
});

export const {
    setHeroData,
    setHelpData,
    setSeoData,
    setHomeSaasHeader,
    setHomeSaasButton,
    setHomeServicesHeaderData,
    setHomeServicesButtonData,
    setHomeServicesListData,
    setHomeFaqHeader,
    setHomeFaqData,
    setTestimonialHeader,
    setTestimonialData,
    setTestimonialButton,
    setProcessApproachHeader,
    setProcessApproachData,
    setProcessApproachButton,
    setIndustryExtertise,
    setIndustryExtertiseData,
    setTrustedByHeader,
    setTrustedByData,
    setSkillsToolsHeader,
    setSkillsToolsData,
    setHandbookData,
    setStatus,
} = homeSlice.actions;
export default homeSlice.reducer;

export function getHeroData() {
    return async function getHeroDataThunk(dispatch, getState) {
        dispatch(setStatus(STATUS.LOADING));
        try {
            const heroAPI = await axios.get(
                `${config.BACKEND_URL}/api/home-new?populate[HeroSection][populate]=*`
            );

            dispatch(setHeroData(heroAPI.data.data.HeroSection));
            dispatch(setStatus(STATUS.IDLE));
        } catch (error) {
            console.error(error);
            dispatch(setStatus(STATUS.ERROR));
        }
    };
}

export function getHelpData() {
    return async function getHelpDataThunk(dispatch, getState) {
        dispatch(setStatus(STATUS.LOADING));
        try {
            const helpAPI = await axios.get(
                `${config.BACKEND_URL}/api/home-new?populate[HelpContentSection][populate]=*`
            );

            dispatch(setHelpData(helpAPI.data.data.HelpContentSection));
            dispatch(setStatus(STATUS.IDLE));
        } catch (error) {
            console.error(error);
            dispatch(setStatus(STATUS.ERROR));
        }
    };
}

export function getSaasProjectsHeader() {
    return async function getSaasProjectsHeaderThunk(dispatch, getState) {
        dispatch(setStatus(STATUS.LOADING));
        try {
            const saasHeaderAPI = await axios.get(
                `${config.BACKEND_URL}/api/home-new?populate[SaasProject][populate]=*&populate[Button][populate]=*`
            );

            dispatch(
                setHomeSaasHeader(saasHeaderAPI.data.data.SaasProject.Header)
            );
            dispatch(
                setHomeSaasButton(saasHeaderAPI.data.data.SaasProject.Button)
            );
            dispatch(setStatus(STATUS.IDLE));
        } catch (error) {
            console.error(error);
            dispatch(setStatus(STATUS.ERROR));
        }
    };
}

export function getHomeServicesData() {
    return async function getHomeServicesDataThunk(dispatch, getState) {
        dispatch(setStatus(STATUS.LOADING));
        try {
            const homeServiceAPI = await axios.get(
                `${config.BACKEND_URL}/api/home-new?populate[ServiceItems][populate]=*`
            );
            dispatch(
                setHomeServicesHeaderData(
                    homeServiceAPI.data.data.ServiceItems.Header
                )
            );
            dispatch(
                setHomeServicesButtonData(
                    homeServiceAPI.data.data.ServiceItems.Button
                )
            );
            dispatch(
                setHomeServicesListData(
                    homeServiceAPI.data.data.ServiceItems.ServicesList
                )
            );
            dispatch(setStatus(STATUS.IDLE));
        } catch (error) {
            console.error(error);
            dispatch(setStatus(STATUS.ERROR));
        }
    };
}

export function getHomeFaq() {
    return async function getHomeFaqThunk(dispatch, getState) {
        dispatch(setStatus(STATUS.LOADING));
        try {
            const homeFaqAPI = await axios.get(
                `${config.BACKEND_URL}/api/home-new?populate[FAQs][populate]=*`
            );
            dispatch(setHomeFaqHeader(homeFaqAPI.data.data.FAQs.Heading));
            dispatch(setHomeFaqData(homeFaqAPI.data.data.FAQs.QuestionAnswers));
            dispatch(setStatus(STATUS.IDLE));
        } catch (error) {
            console.error(error);
            dispatch(setStatus(STATUS.ERROR));
        }
    };
}

export function getTestimonials() {
    return async function getTestimonialsThunk(dispatch, getState) {
        dispatch(setStatus(STATUS.LOADING));
        try {
            const testimonialAPI = await axios.get(
                `${config.BACKEND_URL}/api/home-new?populate[0]=Testimonials.Header&populate[1]=Testimonials&populate[2]=Testimonials.TestimonialContent.Image&populate[3]=Testimonials.TestimonialContent.profileImage&populate[4]=Testimonials.Button`
            );
            dispatch(
                setTestimonialHeader(
                    testimonialAPI.data.data.Testimonials.Header
                )
            );
            dispatch(
                setTestimonialData(
                    testimonialAPI.data.data.Testimonials.TestimonialContent
                )
            );
            dispatch(
                setTestimonialButton(
                    testimonialAPI.data.data.Testimonials.Button
                )
            );

            dispatch(setStatus(STATUS.IDLE));
        } catch (error) {
            console.error(error);
            dispatch(setStatus(STATUS.ERROR));
        }
    };
}

export function getProcessApproach() {
    return async function getProcessApproachThunk(dispatch, getState) {
        dispatch(setStatus(STATUS.LOADING));
        try {
            const processApproachAPI = await axios.get(
                `${config.BACKEND_URL}/api/home-new?populate[0]=ProcessApproachComponentsNew.processHeader&populate[1]=ProcessApproachComponentsNew.ProcessSectionPart&populate[2]=ProcessApproachComponentsNew.ProcessButton`
            );
            dispatch(
                setProcessApproachHeader(
                    processApproachAPI.data.data.ProcessApproachComponentsNew
                        .processHeader
                )
            );
            dispatch(
                setProcessApproachData(
                    processApproachAPI.data.data.ProcessApproachComponentsNew
                        .ProcessSectionPart
                )
            );
            dispatch(
                setProcessApproachButton(
                    processApproachAPI.data.data.ProcessApproachComponentsNew
                        .ProcessButton
                )
            );

            dispatch(setStatus(STATUS.IDLE));
        } catch (error) {
            console.error(error);
            dispatch(setStatus(STATUS.ERROR));
        }
    };
}

export function getIndustryExpertise() {
    return async function getIndustryExpertiseThunk(dispatch, getState) {
        dispatch(setStatus(STATUS.LOADING));
        try {
            const industryExpertiseAPI = await axios.get(
                `${config.BACKEND_URL}/api/home-new?populate[0]=ExpertiseSectionComponentNew&populate[1]=ExpertiseSectionComponentNew.ExpertiseTabSectionSection.MediaImagesExpertise`
            );
            dispatch(
                setIndustryExtertise(
                    industryExpertiseAPI.data.data.ExpertiseSectionComponentNew
                )
            );
            dispatch(
                setIndustryExtertiseData(
                    industryExpertiseAPI.data.data.ExpertiseSectionComponentNew
                        .ExpertiseTabSectionSection
                )
            );

            dispatch(setStatus(STATUS.IDLE));
        } catch (error) {
            console.error(error);
            dispatch(setStatus(STATUS.ERROR));
        }
    };
}

export function getTrustedBy() {
    return async function getTrustedByThunk(dispatch, getState) {
        dispatch(setStatus(STATUS.LOADING));
        try {
            const trustedByAPI = await axios.get(
                `${config.BACKEND_URL}/api/home-new?populate[0]=TrustedNewSection&populate[1]=TrustedNewSection.TrustedCompany.TrustedCompany`
            );
            dispatch(
                setTrustedByHeader(
                    trustedByAPI.data.data.TrustedNewSection.Heading
                )
            );
            dispatch(
                setTrustedByData(
                    trustedByAPI.data.data.TrustedNewSection.TrustedCompany
                )
            );

            dispatch(setStatus(STATUS.IDLE));
        } catch (error) {
            console.error(error);
            dispatch(setStatus(STATUS.ERROR));
        }
    };
}

export function getSkillsTools() {
    return async function getSkillsToolsThunk(dispatch, getState) {
        dispatch(setStatus(STATUS.LOADING));
        try {
            const skillsToolsAPI = await axios.get(
                `${config.BACKEND_URL}/api/home-new?populate[SkillAndToolsSection][populate]=*`
            );
            dispatch(
                setSkillsToolsHeader(
                    skillsToolsAPI.data.data.SkillAndToolsSection.Header
                )
            );
            dispatch(
                setSkillsToolsData(
                    skillsToolsAPI.data.data.SkillAndToolsSection
                        .TitleAndDescriptionComponent
                )
            );

            dispatch(setStatus(STATUS.IDLE));
        } catch (error) {
            console.error(error);
            dispatch(setStatus(STATUS.ERROR));
        }
    };
}

export function getHandbook() {
    return async function getHandbookThunk(dispatch, getState) {
        dispatch(setStatus(STATUS.LOADING));
        try {
            const handbookAPI = await axios.get(
                `${config.BACKEND_URL}/api/home-new?populate[UltimateUIUXComponent][populate]=*`
            );
            dispatch(
                setHandbookData(handbookAPI.data.data.UltimateUIUXComponent)
            );

            dispatch(setStatus(STATUS.IDLE));
        } catch (error) {
            console.error(error);
            dispatch(setStatus(STATUS.ERROR));
        }
    };
}

export function getSeoData() {
    return async function getSeoDataThunk(dispatch, getState) {
        dispatch(setStatus(STATUS.LOADING));
        try {
            const homeSEOAPI = await axios.get(
                `${config.BACKEND_URL}/api/home-new?populate[HeroSection][populate]=*&populate[seo][populate]=*`
            );

            dispatch(setSeoData(homeSEOAPI.data.data));
        } catch (error) {
            console.error(error);
            dispatch(setStatus(STATUS.ERROR));
        }
    };
}
