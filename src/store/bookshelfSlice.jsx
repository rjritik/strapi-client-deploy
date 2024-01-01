import { createSlice } from "@reduxjs/toolkit";
import { STATUS } from "./blogSlice";
import axios from "axios";
import config from "../config";

const bookshelfSlice = createSlice({
    name: "bookshelf",
    initialState: {
        bookshelfData: null,
        status: STATUS.IDLE,
    },
    reducers: {
        setBookshelfData(state, action) {
            state.bookshelfData = action.payload;
        },
        setStatus(state, action) {
            state.status = action.payload;
        },
    },
});

export const { setBookshelfData, setStatus } = bookshelfSlice.actions;
export default bookshelfSlice.reducer;

export function getBookshelfData() {
    return async function getBookshelfDataThunk(dispatch, getState) {
        dispatch(setStatus(STATUS.LOADING));
        try {
            const bookshelfAPI = await axios.get(
                `${config.BACKEND_URL}/api/book-self?populate[0]=Header&populate[1]=BookSelfCategory.BookSelfItem.Image`
            );

            dispatch(setBookshelfData(bookshelfAPI.data.data));
            dispatch(setStatus(STATUS.IDLE));
        } catch (error) {
            console.error(error);
            dispatch(setStatus(STATUS.ERROR));
        }
    };
}
