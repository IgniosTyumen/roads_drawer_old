import {SET_VISIBLE_SIGNS_LIST,} from "../constants/SignsVisibleListConstants";

export function setVisibleList(array) {
    return {
        type: SET_VISIBLE_SIGNS_LIST,
        payload: array
    }
}

