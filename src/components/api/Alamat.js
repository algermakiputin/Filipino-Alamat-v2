import axios from "axios";

const url = "http://192.168.1.7:8888/filipinoalamat/wp-json/wp/v2/";
const errorStatus = {
    error: true,
    message: "Network error, please check your internet connection and try again"
};

export const get = async () => {
    let data = [];
    await axios.get(url + 'alamat_posts?_embed&category=kalikasan')
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
    await axios.get(url + 'alamat_posts/' + id.toString() + '?_embed')
        .then(res => { 
            data = res.data; 
        })
        .catch(() => { 
            data = errorStatus;
        })     
    return data; 
}

export const getAlamatByCategory = async(id) => { 
    let data = [];
    await axios.get(url + 'alamat_posts?_embed&alamat=' + id)
        .then(res => { 
            data = res.data; 
        })
        .catch(() => { 
            data = errorStatus;
        })     
    return data;
}

export const getCategories = async () => {
    let data = []; 
    let url = 'http://192.168.1.7:8888/filipinoalamat/wp-json/alamat/api/taxonomies';
    await axios.get(url)
        .then(res => { 
            data = res.data;  
        })
        .catch(() => {
            data = errorStatus;
        }) 
    return data;
}

export const search = (query) => {
    let data = [];
    axios.get(url + '?search=' + query)
        .then(res => {
            data = res.data;
        })
        .catch(() => {
            data = errorStatus;
        }) 
    return data;
}