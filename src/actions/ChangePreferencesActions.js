import {
    SAVE_USER_REFERENCES,
    SET_DANGER_ROAD_COLOR_MAIN_PREFERENCES,
    SET_DANGER_ROAD_COLOR_SECONDARY_PREFERENCES,
    SET_DANGER_ROAD_STROKE_LENGTH_PREFERENCES,
    SET_DANGER_ROAD_WIDTH_PREFERENCES,
    SET_DRAW_MARKER_SIZE,
    SET_ROAD_COLOR,
    SET_ROAD_COLOR_SEGMENT,
    SET_ROAD_ENDPOINTS_VISIBLE,
    SET_ROAD_ENDPOINTS_WIDTH,
    SET_ROAD_WEIGHT,
    SET_ROAD_WEIGHT_SEGMENT,
    SET_ROUTE_ENDPOINTS_VISIBLE,
    SET_ROUTE_ENDPOINTS_WIDTH,
    SET_ROUTE_FEDERAL_COLOR,
    SET_ROUTE_FEDERAL_WEIGHT,
    SET_ROUTE_MUNICIPAL_COLOR,
    SET_ROUTE_MUNICIPAL_WEIGHT,
    SET_ROUTE_REGIONAL_COLOR,
    SET_ROUTE_REGIONAL_WEIGHT,
    SET_SIGNS_DRAW_MAP_ZOOM_MAX,
    SET_SIGNS_DRAW_MAP_ZOOM_MIN,
    SET_SIGNS_PREFERENCES,
    SET_SIGNS_SIZE
} from '~/constants/UserSettingsConstants'

export const changeRoadColor = (colorHexCode) => (dispatch) => {
    dispatch({
        type:SET_ROAD_COLOR,
        payload:colorHexCode
    })
};

export const changeRoadLineWeight = (lineWidth) => (dispatch) => {
    dispatch({
        type:SET_ROAD_WEIGHT,
        payload:lineWidth
    })
};

export const changeColorSegment = (colorHexCode) => (dispatch) => {
    dispatch({
        type:SET_ROAD_COLOR_SEGMENT,
        payload:colorHexCode
    })
};

export const changeSegmentLineWeight = (lineWidth) => (dispatch) => {
    dispatch({
        type:SET_ROAD_WEIGHT_SEGMENT,
        payload:lineWidth
    })
};

export const changeDangerRoadColorPrimary = (colorHexCode) => (dispatch) => {
    dispatch({
        type:SET_DANGER_ROAD_COLOR_MAIN_PREFERENCES,
        payload:colorHexCode
    })
};

export const changeDangerRoadColorSecondary = (colorHexCode) => (dispatch) => {
    dispatch({
        type:SET_DANGER_ROAD_COLOR_SECONDARY_PREFERENCES,
        payload:colorHexCode
    })
};

export const changeDangerRoadWidth = (lineWidth) => (dispatch) => {
    dispatch({
        type:SET_DANGER_ROAD_WIDTH_PREFERENCES,
        payload:lineWidth
    })
};

export const changeDangerRoadStrokeLength = (lineWidth) => (dispatch) => {
    dispatch({
        type:SET_DANGER_ROAD_STROKE_LENGTH_PREFERENCES,
        payload:lineWidth
    })
};

export const changeSignsPreferences = (signsTypeArray) => (dispatch) => {
    dispatch({
        type:SET_SIGNS_PREFERENCES,
        payload:signsTypeArray
    })
};


export const saveAllUserPreferences = () => dispatch => {
    dispatch({
        type: SAVE_USER_REFERENCES
    })
};


export const changeRoadWaypointsVisible = (bool=false) => dispatch => {
    dispatch({
        type:SET_ROAD_ENDPOINTS_VISIBLE,
        payload: bool
    })
}

export const changeRoadWaypointsWidth = (numb=10) => dispatch => {
    dispatch({
        type:SET_ROAD_ENDPOINTS_WIDTH,
        payload: numb
    })
}

export const changeRouteColor = (colorAsString, typeAsString) => dispatch =>{
    switch (typeAsString) {
        case 'Автомобильная дорога федерального значения': {
            dispatch({
                type: SET_ROUTE_FEDERAL_COLOR,
                payload: colorAsString
            })

        }
        case 'Автомобильная дорога регионального или межмуниципального значения':{
            dispatch({
                type: SET_ROUTE_REGIONAL_COLOR,
                payload: colorAsString
            })
        }
        case 'Автомобильная дорога местного значения': {
            dispatch({
                type: SET_ROUTE_MUNICIPAL_COLOR,
                payload: colorAsString
            })
        }

    }
}


export const changeRouteLineWeight = (value, typeAsString) => dispatch =>{
    switch (typeAsString) {
        case 'federal': {
            dispatch({
                type: SET_ROUTE_FEDERAL_WEIGHT,
                payload: value
            })

        }
        case 'regional':{
            dispatch({
                type: SET_ROUTE_REGIONAL_WEIGHT,
                payload: value
            })
        }
        case 'municipal': {
            dispatch({
                type: SET_ROUTE_MUNICIPAL_WEIGHT,
                payload: value
            })
        }

    }
}

export const changeRouteWaypointsVisible = (bool=false) => dispatch => {
    dispatch({
        type:SET_ROUTE_ENDPOINTS_VISIBLE,
        payload: bool
    })
}

export const changeRoutesWaypointsWidth = (numb=10) => dispatch => {
    dispatch({
        type:SET_ROUTE_ENDPOINTS_WIDTH,
        payload: numb
    })
}

export const changeDrawMarkerSize = (sizeArray=5) => dispatch => {
    dispatch({
        type:SET_DRAW_MARKER_SIZE,
        startDrawMarkerSize : sizeArray.start,
        endDrawMarkerSize : sizeArray.end,
        middleDrawMarkerSize : sizeArray.middle,
        pseudoDrawMarkerSize : sizeArray.pseudo,
        widthDrawLine : sizeArray.width,

    })
}


export const changeSignsZoomAvailable = (array) => dispatch => {
    dispatch({
        type:SET_SIGNS_DRAW_MAP_ZOOM_MIN,
        payload:array[0][0]
    })
    dispatch({
        type:SET_SIGNS_DRAW_MAP_ZOOM_MAX,
        payload:array[0][1]
    })
}

export const changeSignsSize = (size) => dispatch => {
    dispatch({
        type:SET_SIGNS_SIZE,
        payload:size
    })
}

