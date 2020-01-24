import {UPDATE_FIELD_IN_CITY} from "../constants/RoadsConstants";


import {all, call, put, takeEvery} from 'redux-saga/effects'

import {airfieldsApi, cityApi} from "../api/api";

function* getCityInfo(id){
    const responseCityInfo = yield call(()=>cityApi.getCityInfoById(id));
    yield put({type:UPDATE_FIELD_IN_CITY, value:responseCityInfo, id:id, field:'objectFullInfo'});

    return responseCityInfo.data;
}

function* getAirfieldInfo(id){
    const responseCityInfo = yield call(()=>airfieldsApi.getAirfieldInfoById(id));
    yield put({type:UPDATE_FIELD_IN_CITY, value:responseCityInfo, id:id, field:'objectFullInfo'});

    return responseCityInfo.data;
}

function* getFullObjectInfo(action) {
    switch (action.reducer){
        case "city": {
            try {
                const id = action.id;
                const [cityResponse] = yield all([ call (()=>getCityInfo(id))]);
                yield put(
                    {
                        type: 'GET_FULL_OBJECT_DATA_SUCCESS:'+action.reducer+' id:'+action.id,
                    }
                );
                action.callbackOnFinish('loaded')
            } catch (e) {
                yield put({type: 'GET_FULL_OBJECT_DATA_FAILURE:'+action.reducer+' id:'+action.id})
            }
            break;
        }
        case "airfield": {
            try {
                const id = action.id;
                const [objResponse] = yield all([ call (()=>getAirfieldInfo(id))]);
                yield put(
                    {
                        type: 'GET_FULL_OBJECT_DATA_SUCCESS:'+action.reducer+' id:'+action.id,
                    }
                );
                action.callbackOnFinish('loaded')
            } catch (e) {
                yield put({type: 'GET_FULL_OBJECT_DATA_FAILURE:'+action.reducer+' id:'+action.id})
            }
            break
        }
    }
}

export function* watchGetFullObjectInfoSaga(){
    yield takeEvery('GET_FULL_OBJECT_DATA', getFullObjectInfo)
}
