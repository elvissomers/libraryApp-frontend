import { API_ENDPOINT } from ".";
import axios from 'axios';

export const getBooks = async (req, rsp) => {
  axios.get(`${API_ENDPOINT}/book`)
    .then(response => {
      // console.log(response.data)
      // console.log("2:", response.json())
      // return response.data;
      rsp.send(response)
    })
    .catch(error => {
      console.log(error);
    });
  }
