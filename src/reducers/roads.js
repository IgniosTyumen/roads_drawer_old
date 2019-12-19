import {SET_ROAD_INFO, SET_ROADS,} from '~/constants/RoadsConstants'


import {SAVE_DIRECTION} from '~/constants/WaypointsConstants'
import getLinestringFromArray from "../utils/getLinestringFromArray";

const initialState = {
    roads: undefined,

};

export default function road(state = initialState, action) {
    switch (action.type) {
        case SET_ROADS:
            return {
                // roads: action.roads.filter(el=>el.line_path)
                roads: action.roads
            };
        case SET_ROAD_INFO: {
            const replacedElement = state.roads.indexOf(state.roads.find(element => element.id === action.id));
            let newState = {...state};
            newState.roads[replacedElement] = {
                ...newState.roads[replacedElement],
                roadFullInfo: action.payload
            }
            newState.selectedRoad = newState.roads[replacedElement]
            return newState;
        }
        case SAVE_DIRECTION: {
            debugger
            let newState = {...state};
            const roadSearch = state.roads.find(element => element.id == action.payload.templateWaypoint.road_id);
            const stateIndex = state.roads.indexOf(roadSearch);
            if (roadSearch) {
                const replacedSegment = roadSearch.segments_set.find(element => element.id === action.payload.templateWaypoint.id)
                const replacedIndex = roadSearch.segments_set.indexOf(replacedSegment);
                newState.roads[stateIndex].segments_set[replacedIndex] = action.payload.templateWaypoint;
                newState.roads[stateIndex].segments_set[replacedIndex].line_path = getLinestringFromArray(action.payload.templateWaypoint.geometry.points);
                return newState
            }
            return state;
        }
        default:
            return state;
    }
}
