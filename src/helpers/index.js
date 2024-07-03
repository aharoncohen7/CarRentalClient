
// בקשת שרת גנרית
export const axiosReq = async ({ method = 'POST', body, url }) => {
    try {
       // axios.defaults.baseURL = 'http://localhost:4000/api/'
    //    console.log('api req 😘 \n', { url, method, body })
       
       const { data: result } = await axios({
          baseURL: 'http://localhost:4004/api/',
          method,
          data: body || {},
          url,
          headers: {
             Authorization: localStorage.token || ''
          }
       })
       
       console.log('api req result 🐱 \n', { result })
 
 
       return result;
 
    } catch (error) {
       console.log('api error 🤢 \n', { error })
       throw error.response?.data?.my  ? error.response?.data?.message || 'something went wrong' : 'something went wrong'
    }
 }