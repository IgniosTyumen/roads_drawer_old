import {SET_ROAD_ACTIVE, SET_ROAD_ACTIVE_PREVIEW} from "../constants/RoadActiveConstants";


export const makeRoadActive = (road) => dispatch =>{
    dispatch( {
        type: SET_ROAD_ACTIVE,
        payload: road
    })
}

export const setRoadPreview = (road) => dispatch =>{
    dispatch( {
        type: SET_ROAD_ACTIVE_PREVIEW,
        payload: road
    })
}
