import {SET_ROADS} from '../constants/RoadsConstants'

const initialState = {
    dangers: undefined
};

export default function dangers(state = initialState, action) {
    switch (action.type) {
        case SET_ROADS:
            return {
                ...state,
                dangers: action.dangers
            }
        default:
            return state;
    }
}
