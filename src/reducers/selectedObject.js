import {SELECT_BRIDGE, SELECT_DANGER_ROAD, SELECT_ROAD, SELECT_SEGMENT} from '~/constants/SelectConstants'
import {SAVE_DIRECTION,} from '~/constants/WaypointsConstants'

const initialState = {
    selectedRoad: undefined,
    selectedBridge: undefined,
    selectedDangerRoad: undefined,
    selectedSegment: undefined

};

export default function selectedObject(state = initialState, action) {
    switch (action.type) {

        case SELECT_ROAD:
            return {
                selectedRoad: action.payload
            };
        case SELECT_BRIDGE:
            return {
                selectedBridge: action.payload
            };
        case SELECT_DANGER_ROAD:
            return {
                selectedDangerRoad: action.payload
            };
            case SELECT_SEGMENT:
            return {
                selectedSegment: action.payload
            };
        case SAVE_DIRECTION:
            return {...initialState}
        default:
            return state;
    }
}
