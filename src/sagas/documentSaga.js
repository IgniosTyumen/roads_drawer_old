import {REMOVE_WAYPOINT, SAVE_DIRECTION} from '~/constants/WaypointsConstants'
import {SET_ROAD_ACTIVE, SET_ROAD_ACTIVE_PREVIEW} from "~/constants/RoadActiveConstants";


import {call, put, takeEvery} from 'redux-saga/effects'

import {documentsApi, segmentsApi} from "../api/api";
import {calculateLengthOfPolyline} from "../utils/calculateLengthOfPolyline";
import getLinestringFromArray from "../utils/getLinestringFromArray";


function* updateDocumentActionsSaga(action) {
    try {

        const waypoint = action.waypoint.templateWaypoint;
        const auth = action.auth;
        // const waypointLength = calculateLengthOfPolyline(waypoint.geometry.points)
        yield call(()=>segmentsApi.updateSegmentLinepath(waypoint));
        yield put({
            type: SAVE_DIRECTION,
            payload: action.waypoint
        });

    } catch (e) {
        console.log(e)
    }

}

function* createDocumentActionsSaga(action) {
    try {
        const waypoint = action.waypoint;
        const auth = action.auth;
        const waypointId = waypoint.templateWaypoint.id;
        const documentId = action.waypoint.orderNumber;
        const waypointLength = calculateLengthOfPolyline(waypoint.templateWaypoint.geometry.points)
        const response = yield call(()=>documentsApi.createWaypoint(waypoint,waypointId,documentId,waypointLength,auth));
        waypoint.templateWaypoint.id = response.data.id
        waypoint.templateWaypoint.path = getLinestringFromArray(waypoint.templateWaypoint.geometry.points)
        yield put({
            type: SAVE_DIRECTION,
            payload: action.waypoint
        });
    } catch (e) {
        console.log(e)
    }
}

function* deleteDocumentActionsSaga(action) {
    try {
        const waypointId = action.waypoint;
        const response = yield call(()=>documentsApi.deleteWaypoint(waypointId));

        yield put({
            type:REMOVE_WAYPOINT,
            payload:response.data.id
        })
    } catch (e) {

    }
}

function* uploadSegmentsActionsSaga(action) {
    try {
        const currentRoad = action.payload;
        yield put({
            type:SET_ROAD_ACTIVE,
            payload:currentRoad
        })
        yield put({
            type:SET_ROAD_ACTIVE_PREVIEW,
            payload:currentRoad
        })
    } catch (e) {

    }
}

export function* watchDocumentActionsSaga(){
    yield takeEvery('UPDATE_WAYPOINT', updateDocumentActionsSaga)
    yield takeEvery('SELECT_ROAD_TO_WORK', uploadSegmentsActionsSaga)
    yield takeEvery('CREATE_WAYPOINT', createDocumentActionsSaga)
    yield takeEvery('DELETE_WAYPOINT', deleteDocumentActionsSaga)
}
