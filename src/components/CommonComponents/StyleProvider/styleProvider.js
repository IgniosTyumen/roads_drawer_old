import {initialState} from '../../../reducers/userPreferences'

const styleProvider = (preferences, branch, searchKey, defaultValue)  => {
    const initialStateOfPreference = initialState;
    if (preferences && preferences[branch] && preferences[branch][searchKey]) return preferences[branch][searchKey];
    if (preferences && preferences.userPreferences  && preferences.userPreferences[branch] && preferences.userPreferences[branch][searchKey]) return preferences.userPreferences[branch][searchKey];
    if (initialStateOfPreference && initialStateOfPreference[branch] && initialStateOfPreference[branch][searchKey]) return initialStateOfPreference[branch][searchKey];
    if (initialStateOfPreference && initialStateOfPreference.initialState && initialStateOfPreference.initialState[branch] && initialStateOfPreference.initialState[branch][searchKey]) return initialStateOfPreference.initialState[branch][searchKey];
    return defaultValue
};

export default styleProvider;

