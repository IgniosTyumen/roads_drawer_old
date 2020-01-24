import {ADD_FILTER, UPDATE_CITIES, UPDATE_FIELD_IN_CITY} from '../constants/RoadsConstants'
import {cityApi} from "../api/api";

export const updateCities = (cities, roadsKm, airfieldsKm) => (dispatch) => {
    dispatch({
        type: UPDATE_CITIES,
        cities: cities,
        roadsKm: roadsKm,
        airfieldsKm: airfieldsKm

    })
};

export const saveUpdatesInCities = (data) => (dispatch) => {
    const response = cityApi.updateCities(data);
};

export const updateFieldInCity = (id, field, value) => (dispatch) => {
    dispatch({
        type: UPDATE_FIELD_IN_CITY,
        id,
        field,
        value
    })
};

export const addReducerValue = (type, key, value) => (dispatch) => {
    dispatch({
        type: ADD_FILTER,
        reducer: type,
        key,
        value
    })
}


