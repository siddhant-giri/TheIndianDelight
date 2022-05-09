import Axios from "axios";

//fetching products data from firebase
export default Axios.create({
    baseURL : 'https://theindiandelight-810f1-default-rtdb.firebaseio.com/'
})