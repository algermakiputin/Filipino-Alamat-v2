import axios from "axios";

const url = "http://192.168.1.3:8888/filipinoalamat/wp-json/wp/v2/alamat_posts";
const errorStatus = {
    error: true,
    message: "Network error, please check your internet connection and try again"
};

export const get = async () => {
    let data = [];
    await axios.get(url + '?_embed')
        .then(res => { 
            data = res.data;
        })
        .catch(() => { 
            data = errorStatus;
        }) 
    return data;
}
// This function accept alamat ID as parameter and returns alamat object
export const getById = async (id) => {
    let data = [];
    await axios.get(url + '/' + id.toString() + '?_embed')
        .then(res => { 
            data = res.data;
        })
        .catch(() => { 
            data = errorStatus;
        })     
    return data; 
}

export const getByCategories = () => {
    let data = [];
    axios.get(url)
        .then(res => {
            data = res.data;
        })
        .catch(() => {
            data = errorStatus;
        }) 
    return data;
}