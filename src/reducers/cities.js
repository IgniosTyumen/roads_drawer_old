import {ADD_FILTER, SET_ROADS, UPDATE_CITIES, UPDATE_FIELD_IN_CITY} from '../constants/RoadsConstants'

const initialState = {
    cities: undefined,
    roadsKm: undefined,
    airfieldsKm: undefined,

};

export default function cities(state = initialState, action) {
    switch (action.type) {
        case SET_ROADS:
            return {
                ...state,
                cities: action.cities
            }
        case UPDATE_FIELD_IN_CITY:{
            const indexOfCity = state.cities.findIndex(el=>el.id===action.id);
            let newCityData = state.cities[indexOfCity];
            newCityData[action.field] = action.value;
            let cityArray = [...state.cities];
            cityArray[indexOfCity] = newCityData;
            return {
                ...state,
                cities: [...cityArray]
            }
        }
        case UPDATE_CITIES:
            return {
                ...state,
                cities: action.cities,
                roadsKm : action.roadsKm,
                airfieldsKm: action.airfieldsKm
            }
        case ADD_FILTER: {
            if (action.reducer === 'city') {
                return {
                    ...state,
                    [action.key]: action.value
                }
            };
            return state;
        }
        default:
            return state;
    }
}
