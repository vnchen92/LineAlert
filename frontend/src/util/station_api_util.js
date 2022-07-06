import axios from 'axios';

export const fetchStation = stationId => {
    return axios.get(`/api/stations/${stationId}`)
        .then(res => {
            console.log(res)
            return res.data;
        })
}