import React, { useState } from 'react';
import styles from './style.module.css';

const CustomerList = ({customers}) => {
  const [expandedCustomer, setExpandedCustomer] = useState(null);

  const toggleCustomerDetails = (customerId) => {
    setExpandedCustomer(expandedCustomer === customerId ? null : customerId);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('he-IL');
  };

  return (
    <div className={styles.customerList}>
      {customers && customers.map((customer) => (
        <div key={customer._id} className={styles.customerCard}>
          <div className={styles.customerInfo}>
            <h2>{customer.name || null}</h2>
            <p><strong>אימייל:</strong> {customer.email}</p>
            <p><strong>טלפון:</strong> {customer.phone}</p>
            <p><strong>רישיון נהיגה:</strong> {customer.driverLicense}</p>
            <p><strong>תאריך רישום:</strong> {formatDate(customer.registeredAt)}</p>
            <p><strong>כתובת:</strong> {customer.address.street || null} {customer.address.houseNumber || null}, {customer.address.city}, {customer.address.state} {customer.address.zipCode}</p>
          </div>
          <div className={styles.customerActions}>
            <button onClick={() => toggleCustomerDetails(customer._id)}>
              {expandedCustomer === customer._id ? 'הסתר היסטוריה' : 'הצג היסטוריה'}
            </button>
          </div>
          {expandedCustomer === customer._id && (
            <div className={styles.rentalHistory}>
              <h3>היסטוריית השכרות</h3>
              {customer.rentalHistory.length > 0 ? (
                customer.rentalHistory.map((rental) => (
                  <div key={rental._id} className={styles.rentalItem}>
                    <p><strong>תאריך הזמנה:</strong> {formatDate(rental.orderDate)}</p>
                    <p><strong>תקופת השכירות:</strong> {formatDate(rental.from)} - {formatDate(rental.to)}</p>
                    <p><strong>סה"כ מחיר:</strong> ₪{rental.totalPrice.toLocaleString()}</p>
                    <p><strong>סטטוס:</strong> {rental.status}</p>
                    <p><strong>שולם:</strong> {rental.isPaid ? 'כן' : 'לא'}</p>
                  </div>
                ))
              ) : (
                <p>אין היסטוריית השכרות</p>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CustomerList;


// const customers = [
//   {
//       "address": {
//           "street": "Herzl",
//           "houseNumber": 1,
//           "city": "Tel Aviv",
//           "state": "TA",
//           "zipCode": "6100000"
//       },
//       "_id": "668511da39dbaad18f7eb540",
//       "name": "Noa Cohen",
//       "email": "noa.cohen@example.com",
//       "driverLicense": "12345678",
//       "password": "<hashed password>",
//       "phone": "0501234567",
//       "rentalHistory": [
//           {
//               "_id": "6685754fb73492f5fb6143e9",
//               "customerId": {
//                   "_id": "668511da39dbaad18f7eb540",
//                   "name": "Noa Cohen",
//                   "email": "noa.cohen@example.com",
//                   "phone": "0501234567"
//               },
//               "carId": "668511dd39dbaad18f7eb558",
//               "from": "2024-09-12T00:00:00.000Z",
//               "to": "2025-04-18T00:00:00.000Z",
//               "quantity": 218,
//               "isPaid": false,
//               "status": "open",
//               "orderDate": "2024-07-03T15:59:11.595Z",
//               "totalPrice": 6653360,
//               "__v": 0
//           }
//       ],
//       "registeredAt": "2024-07-03T08:54:50.736Z",
//       "__v": 1
//   },
//   {
//       "address": {
//           "street": "Jaffa",
//           "houseNumber": 2,
//           "city": "Jerusalem",
//           "state": "JM",
//           "zipCode": "9100000"
//       },
//       "_id": "668511da39dbaad18f7eb541",
//       "name": "Eliana Levi",
//       "email": "eliana.levi@example.com",
//       "driverLicense": "23456789",
//       "password": "<hashed password>",
//       "phone": "0522345678",
//       "rentalHistory": [],
//       "registeredAt": "2024-07-03T08:54:50.738Z",
//       "__v": 0
//   },
//   {
//       "address": {
//           "street": "Haifa",
//           "houseNumber": 3,
//           "city": "Haifa",
//           "state": "HA",
//           "zipCode": "3100000"
//       },
//       "_id": "668511da39dbaad18f7eb542",
//       "name": "David Katz",
//       "email": "david.katz@example.com",
//       "driverLicense": "34567890",
//       "password": "<hashed password>",
//       "phone": "0533456789",
//       "rentalHistory": [],
//       "registeredAt": "2024-07-03T08:54:50.743Z",
//       "__v": 0
//   },
//   {
//       "address": {
//           "street": "Dizengoff",
//           "houseNumber": 4,
//           "city": "Tel Aviv",
//           "state": "TA",
//           "zipCode": "6200000"
//       },
//       "_id": "668511da39dbaad18f7eb543",
//       "name": "Yael Shapiro",
//       "email": "yael.shapiro@example.com",
//       "driverLicense": "45678901",
//       "password": "<hashed password>",
//       "phone": "0544567890",
//       "rentalHistory": [],
//       "registeredAt": "2024-07-03T08:54:50.744Z",
//       "__v": 0
//   },
//   {
//       "address": {
//           "street": "Ben Yehuda",
//           "houseNumber": 5,
//           "city": "Jerusalem",
//           "state": "JM",
//           "zipCode": "9200000"
//       },
//       "_id": "668511da39dbaad18f7eb544",
//       "name": "Moshe Friedman",
//       "email": "moshe.friedman@example.com",
//       "driverLicense": "56789012",
//       "password": "<hashed password>",
//       "phone": "0555678901",
//       "rentalHistory": [],
//       "registeredAt": "2024-07-03T08:54:50.746Z",
//       "__v": 0
//   },
//   {
//       "address": {
//           "street": "Rothschild",
//           "houseNumber": 6,
//           "city": "Tel Aviv",
//           "state": "TA",
//           "zipCode": "6300000"
//       },
//       "_id": "668511da39dbaad18f7eb545",
//       "name": "Tamar Goldstein",
//       "email": "tamar.goldstein@example.com",
//       "driverLicense": "67890123",
//       "password": "<hashed password>",
//       "phone": "0566789012",
//       "rentalHistory": [],
//       "registeredAt": "2024-07-03T08:54:50.747Z",
//       "__v": 0
//   },
//   {
//       "address": {
//           "street": "King George",
//           "houseNumber": 7,
//           "city": "Jerusalem",
//           "state": "JM",
//           "zipCode": "9300000"
//       },
//       "_id": "668511da39dbaad18f7eb546",
//       "name": "Avi Mizrachi",
//       "email": "avi.mizrachi@example.com",
//       "driverLicense": "78901234",
//       "password": "<hashed password>",
//       "phone": "0577890123",
//       "rentalHistory": [],
//       "registeredAt": "2024-07-03T08:54:50.747Z",
//       "__v": 0
//   },
//   {
//       "address": {
//           "street": "Allenby",
//           "houseNumber": 8,
//           "city": "Tel Aviv",
//           "state": "TA",
//           "zipCode": "6400000"
//       },
//       "_id": "668511da39dbaad18f7eb547",
//       "name": "Sara Levy",
//       "email": "sara.levy@example.com",
//       "driverLicense": "89012345",
//       "password": "<hashed password>",
//       "phone": "0588901234",
//       "rentalHistory": [],
//       "registeredAt": "2024-07-03T08:54:50.748Z",
//       "__v": 0
//   },
//   {
//       "address": {
//           "street": "Emek Refaim",
//           "houseNumber": 9,
//           "city": "Jerusalem",
//           "state": "JM",
//           "zipCode": "9400000"
//       },
//       "_id": "668511da39dbaad18f7eb548",
//       "name": "Yosef Cohen",
//       "email": "yosef.cohen@example.com",
//       "driverLicense": "90123456",
//       "password": "<hashed password>",
//       "phone": "0599012345",
//       "rentalHistory": [],
//       "registeredAt": "2024-07-03T08:54:50.748Z",
//       "__v": 0
//   },
//   {
//       "address": {
//           "street": "Ibn Gabirol",
//           "houseNumber": 10,
//           "city": "Tel Aviv",
//           "state": "TA",
//           "zipCode": "6500000"
//       },
//       "_id": "668511da39dbaad18f7eb549",
//       "name": "Rachel Rosenfeld",
//       "email": "rachel.rosenfeld@example.com",
//       "driverLicense": "01234567",
//       "password": "<hashed password>",
//       "phone": "0501123456",
//       "rentalHistory": [],
//       "registeredAt": "2024-07-03T08:54:50.749Z",
//       "__v": 0
//   },
//   {
//       "address": {
//           "street": "Yaffo",
//           "houseNumber": 11,
//           "city": "Jerusalem",
//           "state": "JM",
//           "zipCode": "9500000"
//       },
//       "_id": "668511da39dbaad18f7eb54a",
//       "name": "Daniel Schwartz",
//       "email": "daniel.schwartz@example.com",
//       "driverLicense": "11223344",
//       "password": "<hashed password>",
//       "phone": "0512234567",
//       "rentalHistory": [],
//       "registeredAt": "2024-07-03T08:54:50.749Z",
//       "__v": 0
//   },
//   {
//       "address": {
//           "street": "Bograshov",
//           "houseNumber": 12,
//           "city": "Tel Aviv",
//           "state": "TA",
//           "zipCode": "6600000"
//       },
//       "_id": "668511da39dbaad18f7eb54b",
//       "name": "Michal Weiss",
//       "email": "michal.weiss@example.com",
//       "driverLicense": "22334455",
//       "password": "<hashed password>",
//       "phone": "0523345678",
//       "rentalHistory": [],
//       "registeredAt": "2024-07-03T08:54:50.750Z",
//       "__v": 0
//   },
//   {
//       "address": {
//           "street": "Azza",
//           "houseNumber": 13,
//           "city": "Jerusalem",
//           "state": "JM",
//           "zipCode": "9600000"
//       },
//       "_id": "668511da39dbaad18f7eb54c",
//       "name": "Eitan Golan",
//       "email": "eitan.golan@example.com",
//       "driverLicense": "33445566",
//       "password": "<hashed password>",
//       "phone": "0534456789",
//       "rentalHistory": [],
//       "registeredAt": "2024-07-03T08:54:50.750Z",
//       "__v": 0
//   },
//   {
//       "address": {
//           "street": "Shabazi",
//           "houseNumber": 14,
//           "city": "Tel Aviv",
//           "state": "TA",
//           "zipCode": "6700000"
//       },
//       "_id": "668511da39dbaad18f7eb54d",
//       "name": "Shira Stern",
//       "email": "shira.stern@example.com",
//       "driverLicense": "44556677",
//       "password": "<hashed password>",
//       "phone": "0545567890",
//       "rentalHistory": [],
//       "registeredAt": "2024-07-03T08:54:50.751Z",
//       "__v": 0
//   },
//   {
//       "address": {
//           "street": "Beit Lechem",
//           "houseNumber": 15,
//           "city": "Jerusalem",
//           "state": "JM",
//           "zipCode": "9700000"
//       },
//       "_id": "668511da39dbaad18f7eb54e",
//       "name": "Yonatan Dayan",
//       "email": "yonatan.dayan@example.com",
//       "driverLicense": "55667788",
//       "password": "<hashed password>",
//       "phone": "0556678901",
//       "rentalHistory": [
//           {
//               "_id": "66855f3701c5bc816719d520",
//               "customerId": {
//                   "_id": "668511da39dbaad18f7eb541",
//                   "name": "Eliana Levi",
//                   "email": "eliana.levi@example.com",
//                   "phone": "0522345678"
//               },
//               "carId": "668511dd39dbaad18f7eb55b",
//               "from": "2024-07-12T00:00:00.000Z",
//               "to": "2024-07-18T00:00:00.000Z",
//               "quantity": 6,
//               "isPaid": false,
//               "status": "open",
//               "orderDate": "2024-07-03T14:24:55.357Z",
//               "totalPrice": 6480,
//               "__v": 0
//           },
//           {
//               "_id": "66856058e5cb29980d387eba",
//               "customerId": {
//                   "_id": "668511da39dbaad18f7eb541",
//                   "name": "Eliana Levi",
//                   "email": "eliana.levi@example.com",
//                   "phone": "0522345678"
//               },
//               "carId": "668511dd39dbaad18f7eb565",
//               "from": "2024-07-12T00:00:00.000Z",
//               "to": "2024-07-18T00:00:00.000Z",
//               "quantity": 6,
//               "isPaid": false,
//               "status": "open",
//               "orderDate": "2024-07-03T14:29:44.006Z",
//               "totalPrice": 4680,
//               "__v": 0
//           },
//           {
//               "_id": "668561deac0ed67948188d92",
//               "customerId": {
//                   "_id": "668511da39dbaad18f7eb541",
//                   "name": "Eliana Levi",
//                   "email": "eliana.levi@example.com",
//                   "phone": "0522345678"
//               },
//               "carId": "668511dd39dbaad18f7eb559",
//               "from": "2024-09-12T00:00:00.000Z",
//               "to": "2025-04-18T00:00:00.000Z",
//               "quantity": 218,
//               "isPaid": false,
//               "status": "open",
//               "orderDate": "2024-07-03T14:36:14.120Z",
//               "totalPrice": 11881000,
//               "__v": 0
//           },
//           {
//               "_id": "668562dbac0ed67948188d99",
//               "customerId": {
//                   "_id": "668511da39dbaad18f7eb540",
//                   "name": "Noa Cohen",
//                   "email": "noa.cohen@example.com",
//                   "phone": "0501234567"
//               },
//               "carId": "668511dd39dbaad18f7eb562",
//               "from": "2024-09-12T00:00:00.000Z",
//               "to": "2025-04-18T00:00:00.000Z",
//               "quantity": 218,
//               "isPaid": false,
//               "status": "open",
//               "orderDate": "2024-07-03T14:40:27.849Z",
//               "totalPrice": 7366220,
//               "__v": 0
//           },
//           {
//               "_id": "6685632e0ca63fb54af3143a",
//               "customerId": {
//                   "_id": "668511da39dbaad18f7eb540",
//                   "name": "Noa Cohen",
//                   "email": "noa.cohen@example.com",
//                   "phone": "0501234567"
//               },
//               "carId": "668547c364fa6abbdda1519b",
//               "from": "2024-09-12T00:00:00.000Z",
//               "to": "2025-04-18T00:00:00.000Z",
//               "quantity": 218,
//               "isPaid": false,
//               "status": "open",
//               "orderDate": "2024-07-03T14:41:50.714Z",
//               "totalPrice": 13306720,
//               "__v": 0
//           },
//           {
//               "_id": "6685638a0ca63fb54af31442",
//               "customerId": {
//                   "_id": "668511da39dbaad18f7eb551",
//                   "name": "Liat Shalom",
//                   "email": "liat.shalom@example.com",
//                   "phone": "0589901234"
//               },
//               "carId": "668547d364fa6abbdda1519f",
//               "from": "2024-09-12T00:00:00.000Z",
//               "to": "2025-04-18T00:00:00.000Z",
//               "quantity": 218,
//               "isPaid": false,
//               "status": "open",
//               "orderDate": "2024-07-03T14:43:22.341Z",
//               "totalPrice": 13306720,
//               "__v": 0
//           }
//       ],
//       "registeredAt": "2024-07-03T08:54:50.752Z",
//       "__v": 6
//   },
//   {
//       "address": {
//           "street": "Nahalat Binyamin",
//           "houseNumber": 16,
//           "city": "Tel Aviv",
//           "state": "TA",
//           "zipCode": "6800000"
//       },
//       "_id": "668511da39dbaad18f7eb54f",
//       "name": "Ayelet Goldberg",
//       "email": "ayelet.goldberg@example.com",
//       "driverLicense": "66778899",
//       "password": "<hashed password>",
//       "phone": "0567789012",
//       "rentalHistory": [],
//       "registeredAt": "2024-07-03T08:54:50.752Z",
//       "__v": 0
//   },
//   {
//       "address": {
//           "street": "Agripas",
//           "houseNumber": 17,
//           "city": "Jerusalem",
//           "state": "JM",
//           "zipCode": "9800000"
//       },
//       "_id": "668511da39dbaad18f7eb550",
//       "name": "Ronen Katz",
//       "email": "ronen.katz@example.com",
//       "driverLicense": "77889900",
//       "password": "<hashed password>",
//       "phone": "0578890123",
//       "rentalHistory": [],
//       "registeredAt": "2024-07-03T08:54:50.752Z",
//       "__v": 0
//   },
//   {
//       "address": {
//           "street": "Dizengoff",
//           "houseNumber": 18,
//           "city": "Tel Aviv",
//           "state": "TA",
//           "zipCode": "6900000"
//       },
//       "_id": "668511da39dbaad18f7eb551",
//       "name": "Liat Shalom",
//       "email": "liat.shalom@example.com",
//       "driverLicense": "88990011",
//       "password": "<hashed password>",
//       "phone": "0589901234",
//       "rentalHistory": [],
//       "registeredAt": "2024-07-03T08:54:50.752Z",
//       "__v": 0
//   },
//   {
//       "address": {
//           "street": "Hillel",
//           "houseNumber": 19,
//           "city": "Jerusalem",
//           "state": "JM",
//           "zipCode": "9900000"
//       },
//       "_id": "668511da39dbaad18f7eb552",
//       "name": "Nadav Cohen",
//       "email": "nadav.cohen@example.com",
//       "driverLicense": "99001122",
//       "password": "<hashed password>",
//       "phone": "0590012345",
//       "rentalHistory": [
//           {
//               "_id": "6685bb8f0420b6ef26a33030",
//               "customerId": {
//                   "_id": "668511da39dbaad18f7eb552",
//                   "name": "Nadav Cohen",
//                   "email": "nadav.cohen@example.com",
//                   "phone": "0590012345"
//               },
//               "carId": "66854a87b9fc7ca14b0b3237",
//               "from": "2024-09-01T00:00:00.000Z",
//               "to": "2024-10-01T00:00:00.000Z",
//               "quantity": 30,
//               "isPaid": false,
//               "status": "open",
//               "orderDate": "2024-07-03T20:58:55.998Z",
//               "totalPrice": 166500,
//               "__v": 0
//           }
//       ],
//       "registeredAt": "2024-07-03T08:54:50.753Z",
//       "__v": 1
//   },
//   {
//       "address": {
//           "street": "Frishman",
//           "houseNumber": 20,
//           "city": "Tel Aviv",
//           "state": "TA",
//           "zipCode": "6000000"
//       },
//       "_id": "668511da39dbaad18f7eb553",
//       "name": "Maya Levin",
//       "email": "maya.levin@example.com",
//       "driverLicense": "00112233",
//       "password": "<hashed password>",
//       "phone": "0501234567",
//       "rentalHistory": [],
//       "registeredAt": "2024-07-03T08:54:50.753Z",
//       "__v": 0
//   },
//   // {
//   //     "_id": "668531ffbc679eeff2d22107",
//   //     "name": "davis cohen",
//   //     "email": "david@email.com",
//   //     "driverLicense": "78965412",
//   //     "password": "123",
//   //     "phone": "0527121418",
//   //     "rentalHistory": [],
//   //     "registeredAt": "2024-07-03T11:11:59.233Z",
//   //     "__v": 0
//   // }
// ]