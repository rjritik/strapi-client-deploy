import { configureStore } from "@reduxjs/toolkit";
import headerReducer from "./headerSlice";
import footerReducer from "./footerSlice";
import homeReducer from "./homeSlice";
import aboutReducer from "./aboutSlice";
import serviceReducer from "./serviceSlice";
import bookshelfReducer from "./bookshelfSlice";
import artshopReducer from "./artshopSlice";
import contactReducer from "./contactSlice";
import blogReducer from "./blogSlice";
import projectsReducer from "./projectSlice";
import letstalkReducer from "./letstalkSlice";
import policyReducer from "./policySlice";
import serviceb2bSlice from "./serviceb2bSlice";

const store = configureStore({
  reducer: {
    header: headerReducer,
    footer: footerReducer,
    home: homeReducer,
    about: aboutReducer,
    service: serviceReducer,
    serviceb2b: serviceb2bSlice,
    bookshelf: bookshelfReducer,
    artshop: artshopReducer,
    contact: contactReducer,
    blog: blogReducer,
    projects: projectsReducer,
    letstalk: letstalkReducer,
    policy: policyReducer,
  },
});

export default store;
