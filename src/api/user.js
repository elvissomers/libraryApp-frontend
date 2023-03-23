import { API_ENDPOINT } from ".";
import axios from 'axios';

function getUser() {
    axios.get(`${API_ENDPOINT}/user/getbytoken/` + localStorage.getItem("token"))
        .then(response => {
            this.user = response.data
            console.log("found user" + this.user.id)
            this.getMyLoans()
            this.getMyReservations()
            this.getMyHistory()
            console.log(this.myLoans)
        })
        .catch(error => {
            console.log(error)
        })
}