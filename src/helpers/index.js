
// // בקשת שרת גנרית
// export const axiosReq = async ({ method = 'POST', body, url }) => {
//     try {
//        // axios.defaults.baseURL = 'http://localhost:4000/api/'
//     //    console.log('api req 😘 \n', { url, method, body })
       
//        const { data: result } = await axios({
//           baseURL: 'http://localhost:4004/api/',
//           method,
//           data: body || {},
//           url,
//           headers: {
//              Authorization: localStorage.token || ''
//           }
//        })
       
//        console.log('api req result 🐱 \n', { result })
 
 
//        return result;
 
//     } catch (error) {
//        console.log('api error 🤢 \n', { error })
//        throw error.response?.data?.my  ? error.response?.data?.message || 'something went wrong' : 'something went wrong'
//     }
//  }


 
// פונקציה לקבלת תיאור יחסי לתאריך
function getRelativeDate(date) {
   const currentDate = new Date();
   const inputDate = new Date(date);
   const timeDifference = currentDate.getTime() - inputDate.getTime();
   const oneDay = 24 * 60 * 60 * 1000; // milliseconds in a day
   const oneWeek = 7 * oneDay; // milliseconds in a week

   if (timeDifference < oneDay) {
       return "Today";
   } else if (timeDifference < 2 * oneDay) {
       return "Yesterday";
   } else if (timeDifference < oneWeek) {
       const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
       return daysOfWeek[inputDate.getDay()];
   } else {
       return "Last week";
   }
}

// פונקציה לקבלת השעה במבנה של 00:00
export function getTime(timeString) {
   const parts = timeString.split("T")[1].split(":");
   const hours = parts[0].padStart(2, "0");
   const minutes = parts[1].padStart(2, "0");
   return `${hours}:${minutes}`;
}

// פונקציה לקבלת התאריך במבנה של כיוונית 23/04/24
export function getDate(dateString) {
   const parts = dateString.split("T")[0].split("-");
   const year = parts[0].slice(-2);
   const month = parts[1];
   const day = parts[2];
   return `${day}/${month}/${year}`;
}

// פונקציה המשלבת את תוצאות שלשת הפונקציות הקודמות 
export function formatDateTime(dateTimeString) {
   const relativeDate = getRelativeDate(dateTimeString);
   const time = getTime(dateTimeString);
   const date = getDate(dateTimeString);
   return `${relativeDate}, ${date}, ${time}`;
}



export function getDescriptionOrTime(timeString) {
   const currentDate = new Date();
   const inputDate = new Date(timeString);
   const timeDifference = currentDate.getTime() - inputDate.getTime();
   const oneDay = 24 * 60 * 60 * 1000; // milliseconds in a day

   if (timeDifference < oneDay) {
       const parts = timeString.split("T")[1].split(":");
       const hours = parts[0].padStart(2, "0");
       const minutes = parts[1].padStart(2, "0");
       return `${hours}:${minutes}`;
   } else {
       return getRelativeDate(timeString);
   }
}


export  function compareDatesWithoutTime(date1, date2) {
   return new Date(date1.toDateString()) >= new Date(date2.toDateString());
 }
 



