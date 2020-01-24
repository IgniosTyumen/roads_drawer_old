import {SET_ROAD_INFO, SET_SIGNS} from "../constants/RoadsConstants";


import {all, call, put, takeEvery} from 'redux-saga/effects'

import {roadsApi, signsApi} from "../api/api";

function* getRoadsInfo(id){
    const responseRoadsInfo = yield call(()=>roadsApi.getRoadInfoById(id));
    yield put({type:SET_ROAD_INFO, payload:responseRoadsInfo, id:id});
    return responseRoadsInfo.data;
}

function* uploadChildrenByIdRoad(id, page){
    const responseSigns = yield  call(()=>signsApi.getSignsByRoadId(id,page));
    return responseSigns.data;
}

function* getFullRoadInfo(action) {
    try {
        //clean old data
        const id = action.payload;
        const responseSigns = yield call (()=>uploadChildrenByIdRoad(id,1));
        let signs = [];
        signs=[...signs, ...responseSigns.objects];
        const signsPages = responseSigns.total_pages;
        const signsSagas = [];
        for (let it=1; it<signsPages;it++){
            signsSagas.push(call(()=>uploadChildrenByIdRoad(id,it)))
        }
        const [roads, signsResponses] = yield all([ call (()=>getRoadsInfo(id)), all (signsSagas)]);
        if (signsResponses.length){
            for (let it=0;it<signsResponses.length; it++) {
                signs=[...signs,...signsResponses[it].objects]
            }
        };

        yield put({type:SET_SIGNS, payload:signs});

        yield put(
            {
                type: 'GET_FULL_ROAD_DATA_SUCCESS',
            }
        );
    } catch (e) {
        yield put({type: 'GET_FULL_ROAD_DATA_FAILURE'})
    }

}
export function* watchGetFullRoadInfoSaga(){
    yield takeEvery('GET_FULL_ROAD_DATA', getFullRoadInfo)
}
