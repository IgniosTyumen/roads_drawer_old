import {
    DISABLE_ADD_MARKER_MODE,
    ENABLE_ADD_MARKER_MODE,
    INITIALIZE_APP,
    SET_DRAW_ALGORITHM,
    SET_ROADS_TYPE_FILTER,
    SWITCH_ADD_MARKER_MODE,
    SWITCH_PULL_MARKER_MODE
} from "../constants/AppGlobalConstants";

export const initApp = (props,nonLoaded) => (dispatch) => {
    dispatch(
        {
            type: INITIALIZE_APP,
            url:props.location.pathname.replace('/',''),
            nonLoaded
        }
    );
};

export const enableAddMarkerMode = () => (dispatch) => {
    dispatch({type: ENABLE_ADD_MARKER_MODE})
}

export const disableAddMarkerMode = () => (dispatch) => {
    dispatch({type: DISABLE_ADD_MARKER_MODE})
}

export const switchAddMarkerMode = () => (dispatch) => {
    dispatch({type: SWITCH_ADD_MARKER_MODE})
}
export const switchPullMarkerMode = () => (dispatch) => {
    dispatch({type: SWITCH_PULL_MARKER_MODE})
}
export const setDrawAlgorithm = (value) => (dispatch) => {
    dispatch({type: SET_DRAW_ALGORITHM,
    payload:value})
}

export const setRoadsTypeFilter = (array) => dispatch => {
    dispatch({
        type:SET_ROADS_TYPE_FILTER,
        payload:array
    })
}
