import {
    ADD_CHECKPOINT_MARKER,
    CHANGE_ALL_CHECKPOINTS,
    CHANGE_CHECKPOINT_POSITION,
    CHANGE_DISTRICT_OF_TEMPLATE_WAYPOINT,
    CHANGE_IMPORTANCE_OF_TEMPLATE_WAYPOINT,
    CHANGE_NAME_OF_TEMPLATE_WAYPOINT,
    FINISH_WORK_WITH_ROAD,
    PUSH_CHECKPOINT_MARKER,
    PUSH_CHECKPOINT_MARKER_TO_START,
    REMOVE_CHECKPOINT_MARKER,
    SET_WAYPOINT_TEMPLATE,
    SWAP_CHECKPOINTS_DIRECTION
} from '~/constants/WaypointsConstants'
import React from "react";


const waypointInitial = (userAuth) => {
    let importance='';
    if (userAuth.importanceRights.federal ) importance = 'Автомобильная дорога федерального значения';
    if (userAuth.importanceRights.regional ) importance = 'Автомобильная дорога регионального или межмуниципального значения';
    if (userAuth.importanceRights.municipal ) importance = 'Автомобильная дорога местного значения';
    if (userAuth.importanceRights.all ) importance = 'Автомобильная дорога федерального значения';

    // const user =  {
    //     can_edit_all_roads: userAuth.importanceRights.all,
    //     can_edit_federal_roads: userAuth.importanceRights.federal,
    //     can_edit_municipal_roads: userAuth.importanceRights.municipal,
    //     can_edit_regional_roads: userAuth.importanceRights.regional,
    //     can_edit_tyumen_roads: userAuth.importanceRights.tyumen,
    //     districts: [...userAuth.districtRights],
    //     first_name: userAuth.first_name,
    //     id: userAuth.userId,
    //     last_name: userAuth.last_name,
    //     middle_name: userAuth.middle_name,
    //     municipal_roads_all_districts: false,
    //     regional_roads_all_districts: false,
    // }

    return {
        case_number: "newCheckpoint",
        district_id: userAuth.districtRights[0].id,
        district_name: userAuth.districtRights[1].id,
        end_road: null,
        geometry: {
            points: []
        },
        id: "newCheckpoint",
        importance: importance,
        path: null,
        petition_status: "",
        road_length: 0,
        road_name: "Новая запись",
        save_as_template: false,
        start_road: null,
        user:userAuth
    }
}

export const selectWaypoint = (waypoint, orderId, waypointId) => dispatch => {
    dispatch({
        type: SET_WAYPOINT_TEMPLATE,
        waypoint: waypoint,
        orderId: orderId,
        waypointId: waypointId,
    })
};

export const createWaypoint = (orderId, waypointId,user) => dispatch => {
    dispatch({
        type: SET_WAYPOINT_TEMPLATE,
        waypoint: waypointInitial(user),
        orderId: orderId,
        waypointId: waypointId,
    })
};

export const moveCheckpoint = (latlng, checkpointPosition) => dispatch => {
    dispatch({
        type: CHANGE_CHECKPOINT_POSITION,
        latlng: latlng,
        checkpointPosition: checkpointPosition,
    })
};
export const addCheckpoint = (latlng, checkpointPosition) => dispatch => {
    dispatch({
        type: ADD_CHECKPOINT_MARKER,
        latlng: latlng,
        checkpointPosition: checkpointPosition,
    })
};

export const createCheckpoint = (latlng, checkpointPosition) => dispatch => {
    dispatch({
        type: ADD_CHECKPOINT_MARKER,
        latlng: latlng,
        checkpointPosition: checkpointPosition,
    })
};

export const pushCheckpoint = (latLng) => dispatch => {
    dispatch(
        {
            type: PUSH_CHECKPOINT_MARKER,
            payload: latLng
        }
    )
}
export const pushCheckpointToStart = (latLng) => dispatch => {
    dispatch(
        {
            type: PUSH_CHECKPOINT_MARKER_TO_START,
            payload: latLng
        }
    )
}

export const deleteCheckpoint = (checkpointPosition) => dispatch => {
    dispatch({
        type: REMOVE_CHECKPOINT_MARKER,
        payload: checkpointPosition,
    })
};

export const changeCheckpoint = (points) => dispatch => {
    dispatch({
        type: CHANGE_ALL_CHECKPOINTS,
        payload: points,
    })
};

export const swapDirection = () => dispatch => {
    dispatch({
        type: SWAP_CHECKPOINTS_DIRECTION,
    })
};


export const saveWaypoint = (waypoint,auth) => dispatch => {
    dispatch({
        type: 'UPDATE_WAYPOINT',
        waypoint,
        auth
    })
};

export const saveNewWaypoint = (waypoint,auth) => dispatch => {
    dispatch({
        type: 'CREATE_WAYPOINT',
        waypoint,
        auth
    })
};

export const deleteWaypoint = (waypoint) => dispatch => {
    dispatch({
        type: 'DELETE_WAYPOINT',
        waypoint
    })
};

export const changeNameOfTemplate = (value) => dispatch => {
    dispatch({
        type:CHANGE_NAME_OF_TEMPLATE_WAYPOINT,
        payload:value,
    })
}

export const changeDistrictOfTemplate = (districtId,districtName) => dispatch => {
    dispatch({
        type:CHANGE_DISTRICT_OF_TEMPLATE_WAYPOINT,
        districtId,
        districtName
    })
}

export const changeImportanceOfTemplate = (importance) => dispatch => {
    dispatch({
        type:CHANGE_IMPORTANCE_OF_TEMPLATE_WAYPOINT,
        payload: importance
    })
}

export const finishWorkWithRoad = () => dispatch => {
    dispatch({
        type:FINISH_WORK_WITH_ROAD,

    })
}
