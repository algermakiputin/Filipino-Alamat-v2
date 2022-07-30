export const httpToHttps = (url) => { 
    return `https${url.slice(4)}`;
} 