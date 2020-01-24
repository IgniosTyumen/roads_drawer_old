import {ADD_FILTER, SET_ROADS} from '../constants/RoadsConstants'

const initialState = {
    airfields: undefined
};

export default function airfields(state = initialState, action) {
    switch (action.type) {
        case SET_ROADS:
            return {
                ...state,
                airfields: action.airfields
            }
        case ADD_FILTER: {
            if (action.reducer === 'airfield') {
                return {
                    ...state,
                    [action.key] : action.value
                }
            }
            return state
        }
        default:
            return state;
    }
}
