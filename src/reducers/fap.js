import {ADD_FILTER, SET_ROADS} from '../constants/RoadsConstants'

const initialState = {
    fap: undefined
};

export default function fap(state = initialState, action) {
    switch (action.type) {
        case SET_ROADS:
            return {
                ...state,
                fap: action.fap
            }
        case ADD_FILTER: {
            if (action.reducer === 'fap') {
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
