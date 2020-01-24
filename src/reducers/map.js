import {
    GEOMETRY_WIGHT,
    SELECTED_TILE_LAYER_LINK,
    SET_CENTER,
    SET_CENTER_AND_ZOOM,
    SET_VIEWPORT_COORDINATES,
    SET_ZOOM
} from "../constants/Map";

import {
    DISABLE_ADD_MARKER_MODE,
    ENABLE_ADD_MARKER_MODE,
    SET_DRAW_ALGORITHM,
    SET_ROADS_TYPE_FILTER,
    SWITCH_ADD_MARKER_MODE,
    SWITCH_PULL_MARKER_MODE,
    SWITCH_RESTRICTED_ROADS_SHOW,
    SWITCH_SHOW_EDIT_MARKERS,
} from "../constants/AppGlobalConstants";

const initialState = {
  center: [57.144075, 65.5579277777778],
  zoom: 10,
  tile: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  geometryWight: 7,
  viewport : [57.144075, 65.5579277777778],
  editMode: false,
  pullMode: false,
  drawAlgorithm: 'roadpath',
  visibleRoads: ['municipal','regional','federal', 'unknown'],
  showEditMarkers : true,
  showRestrictedRoads: true
}

export default function map(state = initialState, action) {
  switch (action.type) {
    case SET_CENTER:
      return {
        ...state,
        center: action.payload
      }
    case SWITCH_SHOW_EDIT_MARKERS:
      return {
        ...state,
        showEditMarkers: !state.showEditMarkers
      }
    case SWITCH_RESTRICTED_ROADS_SHOW:
      return {
        ...state,
        showRestrictedRoads: !state.showRestrictedRoads
      }
    case SELECTED_TILE_LAYER_LINK:
      return {
        ...state,
        tile: action.payload
      }
      case SET_CENTER_AND_ZOOM:
      return {
        ...state,
        center: action.center,
        zoom: action.zoom,
        bounds: action.bounds
      }
      case SET_ZOOM:
      return {
        ...state,
        zoom: action.payload
      }
    case GEOMETRY_WIGHT:
      return {
        ...state,
        geometryWight: action.payload
      }
      case SET_VIEWPORT_COORDINATES:
        if (action.viewport && action.zoom){
          return {
            ...state,
            center: action.viewport,
            zoom: action.zoom
          }
        } else
        return state
    case ENABLE_ADD_MARKER_MODE:
      return {
        ...state,
        editMode: true,
      }
    case DISABLE_ADD_MARKER_MODE:
      return {
        ...state,
        editMode: false,
      }
    case SET_DRAW_ALGORITHM:
      return {
        ...state,
        drawAlgorithm: action.payload,
      }
    case SET_ROADS_TYPE_FILTER:
      return {
        ...state,
        visibleRoads: action.payload,
      }
      case SWITCH_ADD_MARKER_MODE:
        if (!state.pullMode) {
          return {
            ...state,
            editMode: !state.editMode,
          }
        } else {
          return {
            ...state,
            editMode: !state.editMode,
            pullMode: false
          }
        }
      case SWITCH_PULL_MARKER_MODE:
        if (!state.editMode) {
          return {
            ...state,
            pullMode: !state.pullMode,
          }
        } else {
          return {
            ...state,
            pullMode: !state.pullMode,
            editMode: false
          }
        }
    default:
      return state;
  }
}
