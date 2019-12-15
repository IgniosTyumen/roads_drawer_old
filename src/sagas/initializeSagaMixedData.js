import {
    INITIALIZE_FAILURE,
    INITIALIZE_SUCCESS,
    SET_ROADS_DOWNLOADED,
    SET_ROADS_TO_DOWNLOAD,
} from "~/constants/AppGlobalConstants";

import {SET_ALL_USER_PREFERENCES,} from '~/constants/UserSettingsConstants'

import {SET_ROADS} from "~/constants/RoadsConstants";

import {SAVE_SCHEMA,} from "~/constants/SchemaConstants"


import {all, call, put, takeEvery} from 'redux-saga/effects'
import {roadsApi, schemaApi} from "../api/api";

let counterRoadsDownloaded = 0;


function* uploadRoads(page) {
    const responseRoads = yield call(() => roadsApi.getAllRoads());
    counterRoadsDownloaded++;
    yield put({type: SET_ROADS_DOWNLOADED, payload: counterRoadsDownloaded});
    return responseRoads.data;
}

function* initialize(action) {
    try {

        yield put({
            type: SET_ROADS_TO_DOWNLOAD,
            payload: 1,
        });

        const localSettings = localStorage.getItem('customSettings');
        if (localSettings) {
            const roadColor = localStorage.getItem('roadColor');
            const roadWidth = localStorage.getItem('roadWidth');
            const dangerRoadsWidth = localStorage.getItem('dangerRoadsWidth');
            const dangerRoadsStrokeLength = localStorage.getItem('dangerRoadsStrokeLength');
            const dangerRoadsColor1 = localStorage.getItem('dangerRoadsColor1');
            const dangerRoadsColor2 = localStorage.getItem('dangerRoadsColor2');
            const signsVisibleListStr = localStorage.getItem('signsVisibleList').split('-');
            const colorRoadFederal = localStorage.getItem('colorRoadFederal');
            const colorRoadRegional = localStorage.getItem('colorRoadRegional');
            const colorRoadMunicipal = localStorage.getItem('colorRoadMunicipal');
            const lineWidthRoadFederal = localStorage.getItem('lineWidthRoadFederal');
            const lineWidthRoadRegional = localStorage.getItem('lineWidthRoadRegional');
            const lineWidthRoadMunicipal = localStorage.getItem('lineWidthRoadMunicipal');
            const endpointRouteVisible = localStorage.getItem('endpointRouteVisible');
            const endpointRouteWidth = localStorage.getItem('endpointRouteWidth');
            const startDrawMarkerSize= localStorage.getItem('startDrawMarkerSize');
            const endDrawMarkerSize= localStorage.getItem('endDrawMarkerSize');
            const middleDrawMarkerSize= localStorage.getItem('middleDrawMarkerSize');
            const pseudoDrawMarkerSize= localStorage.getItem('pseudoDrawMarkerSize');
            const signsSize= localStorage.getItem('signsSize');
            const zoomMinSignsRender= localStorage.getItem('zoomMinSignsRender');
            const zoomMaxSignsRender= localStorage.getItem('zoomMaxSignsRender');

            yield put({
                type: SET_ALL_USER_PREFERENCES,
                signsVisibleList: signsVisibleListStr,
                roadColor,
                roadWidth,
                dangerRoadsWidth,
                dangerRoadsStrokeLength,
                dangerRoadsColor1,
                dangerRoadsColor2,
                colorRoadFederal,
                colorRoadRegional,
                colorRoadMunicipal,
                lineWidthRoadFederal,
                lineWidthRoadRegional,
                lineWidthRoadMunicipal,
                endpointRouteVisible,
                endpointRouteWidth,
                startDrawMarkerSize,
                endDrawMarkerSize,
                middleDrawMarkerSize,
                pseudoDrawMarkerSize,
                signsSize,
                zoomMinSignsRender,
                zoomMaxSignsRender,
            })

        }

        // simple road Download
        const sagasRoads = [];
        sagasRoads.push(call(() => uploadRoads()));


        const [allRoads] = yield all([all(sagasRoads)]);

        const schemaResponse = yield call(()=>schemaApi.getSchema());

        yield put({
            type:SAVE_SCHEMA,
            payload: schemaResponse.data
        })


        yield put(
            {
                type: SET_ROADS,
                roads: allRoads[0].roads,
                bridges: [],
                roadsigns: [],
                dangers: [],
            }
        );

        yield put(
            {
                type: INITIALIZE_SUCCESS,
            }
        );
    } catch (e) {
        yield put({type: INITIALIZE_FAILURE})
    }

}

export function* watchInitializeMixed() {
    yield takeEvery('INITIALIZE_APP', initialize)
}
