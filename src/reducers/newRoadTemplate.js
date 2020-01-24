import {CLOSE_CREATE_NEW_ROAD_DIALOG, OPEN_CREATE_NEW_ROAD_DIALOG} from '../constants/NewRoadConstants'

const initialState = {
    openNewRoadDialog:false
}

export default function newRoad(state = initialState, action) {
    switch (action.type) {
        case OPEN_CREATE_NEW_ROAD_DIALOG:
            return {
                ...state,
                openNewRoadDialog: true,
            };
        case CLOSE_CREATE_NEW_ROAD_DIALOG:
            return {
                ...state,
                openNewRoadDialog: false,
            };
        default:
            return state;
    }
}
