import {
    getTop2HotelByReservationNumAPI,
} from "@/api/hotel";

const initialState = {};
const types = {
    GET_TOP_2_HOTEL_BY_RESERVATION_NUM_SUCCESS: 'GET_TOP_2_HOTEL_BY_RESERVATION_NUM_SUCCESS',
    GET_TOP_2_HOTEL_BY_RESERVATION_NUM_FAIL: 'GET_TOP_2_HOTEL_BY_RESERVATION_NUM_FAIL',
}

export default function hotelSlice(state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case types.GET_TOP_2_HOTEL_BY_RESERVATION_NUM_SUCCESS:
            return {...state, payload};
        case types.GET_TOP_2_HOTEL_BY_RESERVATION_NUM_FAIL:
            return {...state, payload};
        default:
            return state;
    }
}

export const getTop2HotelByReservationNum = () => (dispatch) => {
    return new Promise((resolve, reject) => {
        getTop2HotelByReservationNumAPI().then(response => {
            if (response.data.success) {
                dispatch({
                    type: types.GET_TOP_2_HOTEL_BY_RESERVATION_NUM_SUCCESS,
                    payload: response.data.content
                })
                resolve(response.data.content);
            } else {
                dispatch({
                    type: types.GET_TOP_2_HOTEL_BY_RESERVATION_NUM_FAIL,
                    payload: response.data.message
                })
                reject(response.data.message);
            }
        }).catch(error => {
            dispatch({
                type: types.GET_TOP_2_HOTEL_BY_RESERVATION_NUM_FAIL,
                payload: error
            })
            reject(error);
        })
    })
}