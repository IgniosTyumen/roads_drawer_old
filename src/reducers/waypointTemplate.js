import {
    ADD_CHECKPOINT_MARKER,
    CHANGE_ALL_CHECKPOINTS,
    CHANGE_CHECKPOINT_POSITION,
    CHANGE_DISTRICT_OF_TEMPLATE_WAYPOINT,
    CHANGE_IMPORTANCE_OF_TEMPLATE_WAYPOINT,
    CHANGE_NAME_OF_TEMPLATE_WAYPOINT,
    FINISH_WORK_WITH_ROAD,
    NEW_WAYPOINT_TEMPLATE,
    PUSH_CHECKPOINT_MARKER,
    PUSH_CHECKPOINT_MARKER_TO_START,
    REMOVE_CHECKPOINT_MARKER,
    SAVE_DIRECTION,
    SET_WAYPOINT_TEMPLATE,
    SWAP_CHECKPOINTS_DIRECTION
} from '~/constants/WaypointsConstants'
import getPointsArrayFromLinestring from "../utils/getPointsArrayFromLinestring";

const initialState = {
    templateWaypoint: undefined,
    orderNumber: undefined,
    waypointNumber: undefined,
};


const insert = (arr,index, ...newItems ) => [
    ...arr.slice(0, index),
    ...newItems,
    ...arr.slice(index)
]

export default function waypointTemplate(state = initialState, action) {
    switch (action.type) {
        case NEW_WAYPOINT_TEMPLATE:
            return {
                templateWaypoint: {},
                orderNumber: action.orderId,
                waypointNumber: action.waypointId
            }
        case CHANGE_ALL_CHECKPOINTS:
            {
                let newState = {...state};
                newState.templateWaypoint.geometry.points = [...action.payload];
                return newState;
            }
            case SWAP_CHECKPOINTS_DIRECTION:
            {
                let newState = {...state};
                newState.templateWaypoint.geometry.points = [...newState.templateWaypoint.geometry.points.reverse()];
                return newState;
            }
        case SET_WAYPOINT_TEMPLATE:
            let templateWaypoint = {...action.waypoint};
            if (!templateWaypoint.geometry) {
                templateWaypoint.geometry = {
                    points: getPointsArrayFromLinestring(templateWaypoint.line_path),
                };
            }
            return {
                templateWaypoint: {...templateWaypoint},
                orderNumber: action.orderId,
                waypointNumber: action.waypointId
            }
        case CHANGE_CHECKPOINT_POSITION: {
            let newState = {...state};
            newState.templateWaypoint.geometry.points = [...newState.templateWaypoint.geometry.points];
            newState.templateWaypoint.geometry.points[action.checkpointPosition] = action.latlng
            return newState;
        }
        case ADD_CHECKPOINT_MARKER: {
            let newState = {...state};
            const upd = insert(newState.templateWaypoint.geometry.points, action.checkpointPosition, action.latlng);
            newState.templateWaypoint.geometry.points = [...upd];
            return newState;
        }
        case PUSH_CHECKPOINT_MARKER: {
            return {
                ...state,
                templateWaypoint: {
                    ...state.templateWaypoint,
                    geometry: {
                        ...state.templateWaypoint.geometry,
                        points: [...state.templateWaypoint.geometry.points, action.payload]
                    }
                }
            }
        }
        case PUSH_CHECKPOINT_MARKER_TO_START: {
            return {
                ...state,
                templateWaypoint: {
                    ...state.templateWaypoint,
                    geometry: {
                        ...state.templateWaypoint.geometry,
                        points: [ action.payload, ...state.templateWaypoint.geometry.points]
                    }
                }
            }
        }
        case REMOVE_CHECKPOINT_MARKER: {
            return {
                ...state,
                templateWaypoint: {
                    ...state.templateWaypoint,
                    geometry: {
                        ...state.templateWaypoint.geometry,
                        points: [ ...state.templateWaypoint.geometry.points.filter((element, index)=> index!==action.payload)]
                    }
                }
            }
        }
        case SAVE_DIRECTION: {
            return {
                ...initialState
            }
        }
        case CHANGE_NAME_OF_TEMPLATE_WAYPOINT: {
            return {
                ...state,
                templateWaypoint: {
                    ...state.templateWaypoint,
                    road_name: action.payload
                }
            }
        }

        case CHANGE_DISTRICT_OF_TEMPLATE_WAYPOINT: {
            return {
                ...state,
                templateWaypoint: {
                    ...state.templateWaypoint,
                    district_id: action.districtId,
                    district_name: action.districtName
                }
            }
        }
        case CHANGE_IMPORTANCE_OF_TEMPLATE_WAYPOINT: {
            return {
                ...state,
                templateWaypoint: {
                    ...state.templateWaypoint,
                    importance: action.payload
                }
            }
        }
        case FINISH_WORK_WITH_ROAD: {
            return {...initialState}
        }
        default:
            return state;
    }
}
