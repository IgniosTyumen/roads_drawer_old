import {
    INITIALIZE_FAILURE,
    INITIALIZE_SUCCESS,
    SET_ROADS_DOWNLOADED,
    SET_ROADS_TO_DOWNLOAD,
    SET_SEGMENTS_DOWNLOADED
} from "~/constants/AppGlobalConstants";

import {SET_ALL_USER_PREFERENCES,} from '~/constants/UserSettingsConstants'

import {SET_ROADS} from "~/constants/RoadsConstants";

import {SAVE_SCHEMA,} from "~/constants/SchemaConstants"


import {all, call, put, takeEvery} from 'redux-saga/effects'
import {dangersApi, dictionariesApi, roadsApi, schemaApi, userApi} from "../api/api";
import {initialState} from "../reducers/userPreferences";

let counterRoadsDownloaded = 0;
let counterDangersDownloaded = 0;
let counterSegmentsDownloaded = 0;

const modifyRoad = (roadsList, segment,dictionaries) => {

    let newRoadList = [...roadsList];
    let updated = newRoadList.find(element=>element.id == segment.road_id);
    if (updated) {
        const city_name = dictionaries.cities.find(element => element.id === updated.city_id)
        const district_name = dictionaries.districts.find(element => element.id === updated.district_id)
        updated.city_name = city_name ? city_name.name : 'Не определено';
        updated.district_name = district_name ? district_name.name : 'Не определено';
    }
    let updatedIndex = roadsList.indexOf(updated);
    if (updatedIndex>=0) {
        if (!updated.segments_set) {
            updated = {
                ...updated,
                segments_set: [{...segment}]
            }
        } else {
            updated.segments_set.push(segment)
        }
        newRoadList[updatedIndex] = updated
    }
    return newRoadList;
}


const applyModifierForSegment = (segmentList, parameter) => {
    let newList = {...segmentList}
    for (let it=0; it<segmentList.params[parameter].length; it++) {

        let updatedSegment = segmentList.segments.find(element => element.id === segmentList.params[parameter][it].segment_id);
        let updatedSegmentIndex = segmentList.segments.indexOf(updatedSegment);
        if (updatedSegment ) {

            if (updatedSegment[parameter]) {
                updatedSegment[parameter].push(segmentList.params[parameter][it])
            } else {
                updatedSegment[parameter] = [segmentList.params[parameter][it]]
            }
            newList.segments[updatedSegmentIndex] = updatedSegment
        }
    }

    return newList

}


function* uploadRoads(page) {
    const responseRoads = yield call(() => roadsApi.getAllRoads());
    counterRoadsDownloaded++;
    yield put({type: SET_ROADS_DOWNLOADED, payload: counterRoadsDownloaded});
    return responseRoads.data;
}


function* uploadSegments(page) {
    const responseSegments = yield call(() => roadsApi.getAllSegments());
    counterSegmentsDownloaded++;
    yield put({type: SET_SEGMENTS_DOWNLOADED, payload: counterSegmentsDownloaded});
    return responseSegments.data;
}

function* uploadDangerRoads(page) {
    const danger = yield  call(() => dangersApi.getAllDangers(page));
    counterDangersDownloaded++;
    yield put({type: 'SET_DANGERS_DOWNLOADED', payload: counterDangersDownloaded});
    return danger;
}
function* uploadDictionaries() {
    const [cities, districts] = yield  all( [call(() => dictionariesApi.getCities()), call(() => dictionariesApi.getDistricts())]);
    return {cities:cities.data.objects,
        districts:districts.data.objects};
}


function* uploadOrder() {
    try {
        put({
            type: 'START_USER_AUTH_FETCHING'
        })
        const auth = yield call(() => userApi.getUserAccessParams());

        const userAuthModel = {
            importanceRights: {
                all: auth.data.can_edit_all_roads,
                federal: auth.data.can_edit_federal_roads,
                regional: auth.data.can_edit_regional_roads,
                municipal: auth.data.can_edit_municipal_roads,
                tyumen: auth.data.can_edit_tyumen_roads,
            },
            districtRights: auth.data.districts,
            userId: auth.data.id,
            email: auth.data.email,
            first_name: auth.data.first_name,
            last_name: auth.data.last_name,
            phone: auth.data.phone,
            middle_name: auth.data.middle_name

        };
        yield put({
            type: 'SET_USER_AUTH_PARAMS',
            payload: userAuthModel
        })
        yield put({
            type: 'USER_AUTH_FETCHING_SUCCESS'
        })
        return auth;
    } catch (error) {
        put({
            type: 'USER_AUTH_FETCHING_FAILURE'
        })
        console.warn(error);
        throw error
    }
}


function* initialize(action) {
    try {

        yield put({
            type: SET_ROADS_TO_DOWNLOAD,
            payload: 1,
        });

        const localSettings = localStorage.getItem('customSettings');
        if (localSettings) {
            let roadColor = localStorage.getItem('roadColor')!=='null' ? localStorage.getItem('roadColor') : initialState.roadColor;
            let roadWidth = localStorage.getItem('roadWidth')!=='null' ? localStorage.getItem('roadWidth') : initialState.roadWidth;
            let dangerRoadsWidth = localStorage.getItem('dangerRoadsWidth')!=='null' ? localStorage.getItem('dangerRoadsWidth') : initialState.dangerRoadsWidth;
            let dangerRoadsStrokeLength = localStorage.getItem('dangerRoadsStrokeLength')!=='null' ? localStorage.getItem('dangerRoadsStrokeLength') : initialState.dangerRoadsStrokeLength;
            let dangerRoadsColor1 = localStorage.getItem('dangerRoadsColor1')!=='null' ? localStorage.getItem('dangerRoadsColor1') : initialState.dangerRoadsColor1;
            let dangerRoadsColor2 = localStorage.getItem('dangerRoadsColor2')!=='null' ? localStorage.getItem('dangerRoadsColor2') : initialState.dangerRoadsColor2;
            let signsVisibleListStr = localStorage.getItem('signsVisibleList')!=='null' ? localStorage.getItem('signsVisibleList').split('-')  : initialState.signsVisibleList;
            let colorRoadFederal = localStorage.getItem('colorRoadFederal')!=='null' ? localStorage.getItem('colorRoadFederal') : initialState.colorRoadFederal;
            let colorRoadRegional = localStorage.getItem('colorRoadRegional')!=='null' ? localStorage.getItem('colorRoadRegional') : initialState.colorRoadRegional;
            let colorRoadMunicipal = localStorage.getItem('colorRoadMunicipal')!=='null' ? localStorage.getItem('colorRoadMunicipal') : initialState.colorRoadMunicipal;
            let lineWidthRoadFederal = localStorage.getItem('lineWidthRoadFederal')!=='null' ? localStorage.getItem('lineWidthRoadFederal') : initialState.lineWidthRoadFederal;
            let lineWidthRoadRegional = localStorage.getItem('lineWidthRoadRegional')!=='null' ? localStorage.getItem('lineWidthRoadRegional') : initialState.lineWidthRoadRegional;
            let lineWidthRoadMunicipal = localStorage.getItem('lineWidthRoadMunicipal')!=='null' ? localStorage.getItem('lineWidthRoadMunicipal') : initialState.lineWidthRoadMunicipal;
            let endpointRouteVisible = localStorage.getItem('endpointRouteVisible')!=='null' ? localStorage.getItem('endpointRouteVisible') : initialState.endpointRouteVisible;
            let endpointRouteWidth = localStorage.getItem('endpointRouteWidth')!=='null' ? localStorage.getItem('endpointRouteWidth') : initialState.endpointRouteWidth;
            let startDrawMarkerSize= localStorage.getItem('startDrawMarkerSize')!=='null' ? localStorage.getItem('startDrawMarkerSize') : initialState.startDrawMarkerSize;
            let endDrawMarkerSize= localStorage.getItem('endDrawMarkerSize')!=='null' ? localStorage.getItem('endDrawMarkerSize') : initialState.endDrawMarkerSize;
            let middleDrawMarkerSize= localStorage.getItem('middleDrawMarkerSize')!=='null' ? localStorage.getItem('middleDrawMarkerSize') : initialState.middleDrawMarkerSize;
            let pseudoDrawMarkerSize= localStorage.getItem('pseudoDrawMarkerSize')!=='null' ? localStorage.getItem('pseudoDrawMarkerSize') : initialState.pseudoDrawMarkerSize;
            let signsSize= localStorage.getItem('signsSize')!=='null' ? localStorage.getItem('signsSize') : initialState.signsSize;
            let zoomMinSignsRender= localStorage.getItem('zoomMinSignsRender')!=='null' ? localStorage.getItem('zoomMinSignsRender') : initialState.zoomMinSignsRender;
            let zoomMaxSignsRender= localStorage.getItem('zoomMaxSignsRender')!=='null' ? localStorage.getItem('zoomMaxSignsRender') : initialState.zoomMaxSignsRender;
            let widthDrawLine= localStorage.getItem('widthDrawLine')!=='null' ? localStorage.getItem('widthDrawLine') : initialState.widthDrawLine;
            let segmentColor= localStorage.getItem('segmentColor')!=='null' ? localStorage.getItem('segmentColor') : initialState.segmentColor;
            let segmentWidth= localStorage.getItem('segmentWidth')!=='null' ? localStorage.getItem('segmentWidth') : initialState.segmentWidth;


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
                widthDrawLine,
                segmentColor,
                segmentWidth
            })

        }

        let dangers = [];
        const dangersResponse = yield call (()=>uploadDangerRoads(1))
        const order = yield call (()=>uploadOrder())
        const dictionaries = yield call(uploadDictionaries);

        yield put({type: 'UPLOAD_DICTIONARIES', payload: {
                cities:dictionaries.cities,
                districts:dictionaries.districts
            }});
        counterDangersDownloaded++;
        const totalPagesDangers = dangersResponse.data.total_pages;
        dangers = dangersResponse.data.objects;
        let sagasDangers = [];

        for (let page = 2; page <= totalPagesDangers; page++) {
        // for (let page = 2; page <= 3; page++) {
            sagasDangers.push(call(() => uploadDangerRoads(page)));
        }

        // simple road Download
        const sagasRoads = [];
        sagasRoads.push(call(() => uploadRoads()));

        const sagasSegments = [];
        sagasSegments.push(call(() => uploadSegments()));


        const [allRoads,allSegments,otherDangers] = yield all([all(sagasRoads) , all (sagasSegments),all(sagasDangers)]);

        let modifiedSegments = [];
        for (let it in allSegments[0].params){
            modifiedSegments = applyModifierForSegment(allSegments[0],it)
        }

        let roads = allRoads[0].roads;
        for (let it = 0; it<modifiedSegments.segments.length;it++){
            roads = [...modifyRoad(roads,modifiedSegments.segments[it],dictionaries)]
        }

        for (let it in otherDangers) {
            for (let it2 in otherDangers[it].data.objects) {
                dangers.push(otherDangers[it].data.objects[it2])
            }
        }

        const schemaResponse = yield call(()=>schemaApi.getSchema());

        yield put({
            type:SAVE_SCHEMA,
            payload: schemaResponse.data
        })


        yield put(
            {
                type: SET_ROADS,
                roads: roads,
                bridges: [],
                roadsigns: [],
                dangers: dangers,
            }
        );

        const roadNumberPrepared = action.url;
        if (roadNumberPrepared) {
            const road = roads.find(element=>element.id==roadNumberPrepared)
            yield  put( {
                type: 'SET_ROAD_ACTIVE',
                payload: road
            })
            yield put( {
                type: 'SET_ROAD_ACTIVE_PREVIEW',
                payload: road
            })
        }


        yield put(
            {
                type: INITIALIZE_SUCCESS,
            }
        );
    } catch (e) {
        yield put({type: INITIALIZE_FAILURE})
        console.warn(e)
        yield put({type:'INITIALIZE_APP'})
    }

}

export function* watchInitializeMixed() {
    yield takeEvery('INITIALIZE_APP', initialize)
}
