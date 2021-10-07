

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
import axiosRetry from 'axios-retry';

axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.xsrfCookieName = "csrftoken";

const is_local = window.location.hostname ==='localhost'

const hostUrl = process.env.REACT_APP_API_BASE_URL 
const autori = is_local? 'local' : process.env.REACT_APP_AUTORI
const _url = is_local? 'http://127.0.0.1:8000/transmit/' : hostUrl 





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
axiosRetry(api, { retries: 3 });
export const create_ping = () => api.get(`ping/`, configForm_)

export const create_major = form => api.post(`major/`, form, configForm_)
export const is_major_detail = sender => api.get(`major/${sender}`, configForm_)

export const create_file = form => api.post(`file/`,form , configForm_)
export const multi_part_create = form => api.post(`multipartcreate/`,form , configForm_) // ....UNSUSED
export const multi_part_persigned = form => api.post(`multipartpersigned/`,form , configForm_) // ....UNSUSED
export const multi_part_complete = form => api.post(`multipartcomplete/`,form , configForm_) // ....UNSUSED
export const filed = (filename, count) => api.get(`file/${filename}-${count}`, configForm_)

export const upload_detail = id => api.get(`upload/${id}`, configForm_)
export const download_delete_detail = sender => api.delete(`remove/${sender}`, configForm_)
export const remove_file_detail = (id, filename) => api.delete(`removefile/${id}/${filename}`, configForm_)
export const is_mail_detail = mail => api.get(`mailvali/${mail}`, configForm_)

export const download_stream = (downFileName,extensionName, config) => AxiosStream.download(downFileName, extensionName, config);





const apis = {
  upload_detail,
  download_delete_detail,
  create_major,
  is_major_detail,
  download_stream,
  is_mail_detail,
  create_ping,
  create_file,
  multi_part_create,
  remove_file_detail,
  filed,
  multi_part_persigned,
  multi_part_complete

    
}


export default apis