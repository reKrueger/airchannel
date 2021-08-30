

/*
.catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
    console.log(error.config);
  });
  
*/


import axios from 'axios'
import AxiosStream from "axios-stream";

axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.xsrfCookieName = "csrftoken";

const is_local = window.location.hostname ==='localhost'

const hostUrl = process.env.REACT_APP_API_BASE_URL 
const autori = is_local? 'local' : process.env.REACT_APP_AUTORI
const _url = is_local? 'http://127.0.0.1:8000/transmit/' : hostUrl 



const configPing = {
  headers: { 
    'Content-Type': 'multipart/form-data;boundary=boundary',
    'Accept': 'application/json;text/plain'
  }
}

const configForm_ = {
  headers: { 
    'Authorization': `${autori}`,
    'Content-Type': 'multipart/form-data;boundary=boundary',
    'Accept': 'application/json;text/plain'
  }
}





const api = axios.create({
    baseURL: _url

})

export const create_ping = () => api.get(`ping/`, configPing)

export const create_major = form => api.post(`major/`, form, configForm_)
export const is_major_detail = sender => api.get(`major/${sender}`, configForm_)

export const start_chunk_upload = form => api.post(`preparation/`,form , configForm_)

export const insertfile = form => api.post(`upload/`,form , configForm_)
export const get_Item = form => api.get(`upload/`, form, configForm_)
export const upload_detail = id => api.get(`upload/${id}`, configForm_)

export const download_delete_detail = sender => api.delete(`remove/${sender}`, configForm_)
export const is_mail_detail = mail => api.get(`mailvali/${mail}`, configForm_)

export const download_stream = (downFileName,extensionName, config) => AxiosStream.download(downFileName, extensionName, config);





const apis = {
  upload_detail,
  download_delete_detail,
  create_major,
  is_major_detail,
  download_stream,
  is_mail_detail,
  insertfile,
  create_ping,
  start_chunk_upload

    
}


export default apis