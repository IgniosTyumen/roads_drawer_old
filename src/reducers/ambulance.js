import {ADD_FILTER, SET_ROADS} from '../constants/RoadsConstants'

const initialState = {
    ambulance: undefined
};

export default function ambulance(state = initialState, action) {
    switch (action.type) {
        case SET_ROADS:
            return {
                ...state,
                ambulance: action.ambulance
            }
        case ADD_FILTER: {
            if (action.reducer === 'ambulance') {
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
