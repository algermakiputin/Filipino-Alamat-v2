import axios from "axios";
import { HOST_NAME, USERNAME, PASSWORD } from '@env'; 

const errorStatus = {
    error: true,
    message: "Network error, please check your internet connection and try again"
};

export const get = async (query = '') => {
    let response = [];
    await axios.get(HOST_NAME + '/wp-json/wp/v2/alamat_posts?_embed&search=' + query)
        .then(res => {  
            response = res;
        })
        .catch(() => { 
            data = errorStatus;
        })   
    return {
        data: response.data,
        totalRecords:  response.headers['x-wp-total'],
        totalPages: response.headers['x-wp-totalpages']
    };
}
// This function accept alamat ID as parameter and returns alamat object
export const getById = async (id) => {
    let data = [];
    await axios.get(HOST_NAME + '/wp-json/wp/v2/alamat_posts/' + id.toString() + '?_embed')
        .then(res => { 
            data = res.data; 
        })
        .catch(() => { 
            data = errorStatus;
        })     
    return data; 
}

export const getAlamatByCategory = async(id,query = '', page=1) => { 
    let response = [];
    const endpoint = HOST_NAME + '/wp-json/wp/v2/alamat_posts?_embed&alamat=' + id + '&search=' + query + '&per_page=10&page=' + page;
    await axios.get(endpoint)
        .then(res => { 
            response = res; 
        })
        .catch(() => { 
            data = errorStatus;
        })     
    return {
        data: response.data,
        totalRecords:  response.headers['x-wp-total'],
        totalPages: response.headers['x-wp-totalpages']
    };
}

export const getRecommendations = async() => { 
    let response = [];
    await axios.get(HOST_NAME + '/wp-json/alamat/api/recommendations?_embed')
        .then(res => { 
            response = res; 
        })
        .catch(() => { 
            data = errorStatus;
        })     
    return {
        data: response.data,
        totalRecords:  response.headers['x-wp-total'],
        totalPages: response.headers['x-wp-totalpages']
    };
}

export const getCategories = async () => {
    let data = []; 
    let url =  HOST_NAME + '/wp-json/alamat/api/taxonomies';
    await axios.get(url)
        .then(res => { 
            data = res.data;  
        })
        .catch(() => {
            data = errorStatus;
        }) 
    return data;
}

export const search = async(query) => {
    let response = [];
    await axios.get(HOST_NAME + '/wp-json/wp/v2/?search=' + query)
        .then(res => {
            response = res;
        })
        .catch(() => {
            data = errorStatus;
        }) 
    return {
        data: response.data,
        totalRecords:  response.headers['x-wp-total'],
        totalPages: response.headers['x-wp-totalpages']
    };
}

export const getToken = async() => { 
    return await axios.post(HOST_NAME + '/wp-json/jwt-auth/v1/token', {
            username: USERNAME,
            password: PASSWORD
        })
        .then(res => { 
            return res;
        })
        .catch((error) => {
            return error;
        }) 

}

export const submitFlag = async(title, flag, token) => {
    return await axios.post(HOST_NAME + '/wp-json/wp/v2/flags', { title: title, content: flag },
        {  headers: { Authorization: `Bearer ${token}`}}
    ).then(res => { 
        return res;
    })
    .catch((error) => {
        return error;
    })
}