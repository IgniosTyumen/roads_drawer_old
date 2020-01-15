import {
    INITIALISATION_STARTS,
    INITIALIZE_FAILURE,
    INITIALIZE_SUCCESS,
    ITERATE_BRIDGES_DOWNLOADED,
    ITERATE_ROADS_DOWNLOADED,
    ITERATE_SIGNS_DOWNLOADED,
    SET_BRIDGES_DOWNLOADED,
    SET_BRIDGES_TO_DOWNLOAD,
    SET_DANGERS_DOWNLOADED,
    SET_DANGERS_TO_DOWNLOAD,
    SET_ROADS_DOWNLOADED,
    SET_ROADS_TO_DOWNLOAD,
    SET_SIGNS_DOWNLOADED,
    SET_SIGNS_TO_DOWNLOAD
} from "../constants/AppGlobalConstants";

const initialState = {
    isInitialized: false,
    roadsToDownload: undefined,
    signsToDownload: undefined,
    bridgesToDownload: undefined,
    dangersToDownload: undefined,
    roadsDownloaded: undefined,
    signsDownloaded: undefined,
    bridgesDownloaded: undefined,
    dangersDownloaded: undefined,
};

export default function initial(state = initialState, action) {
    switch (action.type) {
        case INITIALIZE_SUCCESS:
            return {
                ...state,
                isInitialized:true,
            };
        case INITIALISATION_STARTS:
            return {
                ...state,
                isInitialized:undefined,
            };
        case INITIALIZE_FAILURE:
            return {
                ...state,
                isInitialized:false,
            };
        case SET_ROADS_TO_DOWNLOAD:
            return {
                ...state,
                roadsToDownload: action.payload
            };
        case SET_SIGNS_TO_DOWNLOAD:
            return {
                ...state,
                signsToDownload: action.payload
            };
        case SET_BRIDGES_TO_DOWNLOAD:
            return {
                ...state,
                bridgesToDownload: action.payload
            };
        case SET_DANGERS_TO_DOWNLOAD:
            return {
                ...state,
                dangersToDownload: action.payload
            };
        case SET_ROADS_DOWNLOADED:
            return {
                ...state,
                roadsDownloaded: action.payload
            };
        case SET_SIGNS_DOWNLOADED:
            return {
                ...state,
                signsDownloaded: action.payload
            };
        case SET_BRIDGES_DOWNLOADED:
            return {
                ...state,
                bridgesDownloaded: action.payload
            };
        case SET_DANGERS_DOWNLOADED:
            return {
                ...state,
                dangersDownloaded: action.payload
            };
        case ITERATE_ROADS_DOWNLOADED:
            return {
                ...state,
                roadsDownloaded: state.roadsDownloaded++
            };
        case ITERATE_BRIDGES_DOWNLOADED:
            return {
                ...state,
                bridgesDownloaded: state.bridgesDownloaded++
            };
        case ITERATE_SIGNS_DOWNLOADED:
            return {
                ...state,
                signsDownloaded: state.signsDownloaded++
            };
        default:
            return state;
    }
}
