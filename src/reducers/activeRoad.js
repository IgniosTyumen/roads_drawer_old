import {SET_ROAD_ACTIVE, SET_ROAD_ACTIVE_PREVIEW} from "~/constants/RoadActiveConstants";

import {FINISH_WORK_WITH_ROAD, REMOVE_WAYPOINT, SAVE_DIRECTION} from '~/constants/WaypointsConstants'
import getLinestringFromArray from "../utils/getLinestringFromArray";


const initialState = {
    activeRoad: undefined,
    previewRoad: undefined
};

export default function activeOrders(state = initialState, action) {

    switch (action.type) {

        case SET_ROAD_ACTIVE:
            return {
                activeRoad: action.payload
            }
        case SET_ROAD_ACTIVE_PREVIEW:
            return {
                ...state,
                previewRoad: action.payload
            }
        case SAVE_DIRECTION: {
            const newState = {...state};
            newState.activeRoad = {...newState.activeRoad}
            newState.activeRoad.segments_set = [...state.activeRoad.segments_set];
            debugger
            const index = newState.activeRoad.segments_set.findIndex(element => element.id === action.payload.templateWaypoint.id);
            if (index === -1) {
                newState.activeRoad.segments_set.push(action.payload.templateWaypoint)
                newState.activeRoad.segments_set[newState.activeRoad.segments_set.length-1].line_path = getLinestringFromArray(action.payload.templateWaypoint.geometry.points);
            } else {
                newState.activeRoad.segments_set[index] = action.payload.templateWaypoint;
                newState.activeRoad.segments_set[index].line_path = getLinestringFromArray(action.payload.templateWaypoint.geometry.points);
            }
            // newState.previewRoad = {...newState.activeRoad};
            newState.previewRoad = undefined;

            return {...newState}
        }
        case REMOVE_WAYPOINT: {
            const newState = {...state};
            newState.activeRoad.segments_set = [...state.activeRoad.segments_set.filter(element=>element.id!==action.payload)];
            return newState
        }
        case FINISH_WORK_WITH_ROAD: {
            return {...initialState}
        }
        default:
            return state;
    }
}
