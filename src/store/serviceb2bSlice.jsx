import { createSlice } from "@reduxjs/toolkit";
import { STATUS } from "./blogSlice";
import axios from "axios";
import config from "../config";

const serviceb2bSlice = createSlice({
  name: "serviceb2b",
  initialState: {
    serviceB2bHeader: null,
    serviceB2bContent: null,
    serviceB2bSeo: [],
    status: STATUS.IDLE,
  },
  reducers: {
    setServiceB2bHeader(state, action) {
      state.serviceB2bHeader = action.payload;
    },
    setServiceB2bContent(state, action) {
      state.serviceB2bContent = action.payload;
    },
    setServiceB2bSeo(state, action) {
      state.serviceB2bSeo = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
  },
});

export const {
  setServiceB2bHeader,
  setServiceB2bContent,
  setServiceB2bSeo,
  setStatus,
} = serviceb2bSlice.actions;
export default serviceb2bSlice.reducer;

export function getServiceB2bData() {
  return async function getServiceB2bDataThunk(dispatch, getState) {
    dispatch(setStatus(STATUS.LOADING));

    try {
      const serviceB2bAPI = await axios.get(
        `${config.BACKEND_URL}/api/b2-b-b2-c?populate=*`
      );
      dispatch(setServiceB2bHeader(serviceB2bAPI.data.data.B2BHeader));
      dispatch(setServiceB2bContent(serviceB2bAPI.data.data.B2BContent));
      dispatch(setServiceB2bSeo(serviceB2bAPI.data.data.SEO));
      dispatch(setStatus(STATUS.IDLE));
    } catch (error) {
      console.error(error);
      dispatch(setStatus(STATUS.ERROR));
    }
  };
}
