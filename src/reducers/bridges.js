import {SET_ROADS} from '../constants/RoadsConstants'

const initialState = {
    bridges: undefined
};

export default function bridges(state = initialState, action) {
    switch (action.type) {
        case SET_ROADS:
            return {
                ...state,
                bridges: action.bridges
            }
        default:
            return state;
    }
}
