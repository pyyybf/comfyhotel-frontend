import HttpRequest from "@/util/request";

const api = {
    hotelPre: '/api/hotel',
}

export const getTop2HotelByReservationNumAPI = () => {
    return HttpRequest.request({
        url: `${api.hotelPre}/getTop2HotelByReservationNum`,
        method: 'GET',
    })
}
