import axios from 'axios';
import {FETCH_SCHEMA_FAILURE, FETCH_SCHEMA_REQUEST, FETCH_SCHEMA_SUCCESS,} from '../constants/Schema';

const schemaRequest = () => ({
  type: FETCH_SCHEMA_REQUEST,
});

const schemaSuccess = schema => ({
  type: FETCH_SCHEMA_SUCCESS,
  schema,
});

const schemaFailure = () => ({
  type: FETCH_SCHEMA_FAILURE,
});

// TODO: url импортировать тут, а не через параметр
export const getSchema = url => (dispatch) => {
  dispatch(schemaRequest());

  axios.get('https://av.admtyumen.ru/'+url)
    .then(res => dispatch(schemaSuccess(res.data)));
};

// For testing
// export const getSchema = url => (dispatch) => {
//   dispatch(schemaRequest());

//   axios.get(url)
//     .then(res => {
//       const schema = {
//         ...res.data,
//         is_round_trip: {
//           default: null,
//           info: {verbose_name: "Тип заявки"},
//           verbose_name: "Тип заявки",
//           is_required: true,
//           type: "bool",
//         },
//         __meta: {
//           ...res.data.__meta,
//           fields: [
//             ...res.data.__meta.fields,
//             'is_round_trip'
//           ]
//         }
//       }
//       dispatch(schemaSuccess(schema))
//     });
// };
