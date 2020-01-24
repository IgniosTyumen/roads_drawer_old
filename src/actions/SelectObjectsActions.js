import {
    SELECT_AMBULANCE,
    SELECT_BRIDGE,
    SELECT_CITY,
    SELECT_DANGER_ROAD,
    SELECT_ROAD,
    SELECT_SEGMENT
} from "../constants/SelectConstants";

export const selectRoad = (object) => dispatch =>{
     dispatch( {
        type: SELECT_ROAD,
        payload: object
    })
}

export const selectBridge = (object) => dispatch =>{
     dispatch( {
        type: SELECT_BRIDGE,
        payload: object
    })
}

export const selectDangerRoad = (object) => dispatch =>{
     dispatch( {
        type: SELECT_DANGER_ROAD,
        payload: object
    })
}
export const selectCity = (object) => dispatch =>{
     dispatch( {
        type: SELECT_CITY,
        payload: object
    })
}

export const selectSegment = (object) => dispatch =>{
    dispatch( {
        type: SELECT_SEGMENT,
        payload: object
    })
}
export const selectAmbulance = (object) => dispatch =>{
    dispatch( {
        type: SELECT_AMBULANCE,
        payload: object
    })
}


