import {SAVE_USER_REFERENCES, SET_VISUAL_PREFERENCE} from '../constants/UserSettingsConstants'

export const changeVisualPreference = (branch,key,value) => (dispatch) => {
    dispatch({
        type:SET_VISUAL_PREFERENCE,
        branch:branch,
        key:key,
        value:value,
    })
};

export const saveAllUserPreferences = () => dispatch => {
    dispatch({
        type: SAVE_USER_REFERENCES
    })
};


