
import axios from 'axios';
import styles from './style.module.css';
import React, { useContext, useState } from 'react';
import { PopupContext } from '../../App';


const OrderList = ({ orders, onChange }) => {
    const [expandedOrder, setExpandedOrder] = useState(null);
    const url = 'http://localhost:3355/api/rentals/';
    const { setPopUpContent } = useContext(PopupContext)

    const handleDeleteOrder = async (orderId) => {
        try {
            const response = await axios.delete(url + orderId);
            if (response.data.deletedCount < 0) {
                // setPopUpContent(<h1>{`הזמנה ${orderId} נמחקה`}</h1>)
                onChange(prev => {
                    return !prev
                })
            }
        } catch (err) {
            console.log("Error in fetching data");
            setPopUpContent(<h1>{`"Error in delete order ${orderId} `}</h1>)
            console.error(err);
        }

    };
    const handleChangeStatus = async (order) => {
        const newStatus = order.status === "open" ?  "closed" : "open";
        try {
            const response = await axios.patch(url + order._id, {status: newStatus});
            if (response.data.status ==  newStatus) {
                onChange(prev => {
                    return !prev
                })
            }
        } catch (err) {
            console.log("Error in fetching data");
            setPopUpContent(<h1>{`"Error in update status ${order._id} `}</h1>)
            console.error(err);
        }

    };


    const handleViewDetails = (orderId) => {
        setExpandedOrder(expandedOrder === orderId ? null : orderId);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('he-IL');
    };




    return (
        <div className={styles.orderList}>
            {orders && orders.map((order) => (
                <div key={order._id} className={styles.orderCard}>
                    <div className={styles.orderInfo}>
                        <h2 style={{ textAlign: "center" }}>Order No:  {order._id}</h2>
                        <p> {order.customerId?.name && order.customerId.name} <strong>  :שם לקוח</strong></p>
                        <p> {order.carId?.model && order.carId.model}<strong >  :דגם רכב</strong></p>
                        <p> {new Date(order.from).toLocaleDateString('he-IL')}<strong> :תאריך השכרה</strong></p>
                        <p> {new Date(order.to).toLocaleDateString('he-IL')}<strong> :תאריך החזרה</strong></p>
                        <p> ₪{order.totalPrice && order.totalPrice.toLocaleString()}<strong>  :מחיר כולל</strong></p>
                        <p>{order.status}<strong>  :סטטוס</strong> </p>
                    </div>
                    <div className={styles.orderActions}>
                        <button onClick={() => handleViewDetails(order._id)}>
                            {expandedOrder === order._id ? 'הסתר פרטים' : 'צפה בפרטים'}
                        </button>
                        <button onClick={() => handleChangeStatus(order)}>שנה סטטוס</button>
                        <button onClick={() => handleDeleteOrder(order._id)}>מחק</button>
                    </div>
                    {expandedOrder === order._id && (
                        <div className={styles.expandedDetails}>
                            <h3>פרטי לקוח</h3>
                            <p>{order.customerId.email}<strong> :אימייל</strong> </p>
                            <p><strong>טלפון</strong> {order.customerId.phone}</p>
                            <p><strong>רישיון נהיגה</strong> {order.customerId.driverLicense}</p>
                            <p> {order.customerId.address.street} {order.customerId.address.houseNumber}, {order.customerId.address.city}<strong> :כתובת</strong></p>

                            <h3>פרטי רכב</h3>
                            <img src={order.carId.images[0]} width={"120px"} />
                            <img src={order.carId.images[1]} width={"120px"} />
                            <p><strong>מספר רישוי</strong> {order.carId.carLicense}</p>
                            <p><strong>שנת ייצור</strong> {order.carId.year}</p>
                            <p><strong>מחיר ליום</strong> ₪{order.carId.dailyRate}</p>
                            <p> {order.carId.fuelType}<strong>  :סוג דלק</strong></p>
                            <p><strong>הנחה</strong> {order.carId.discount}%</p>

                            <h3>פרטי הזמנה נוספים</h3>
                            <p><strong>כמות ימים</strong> {order.quantity}</p>
                            <p><strong>תשלום</strong> {order.isPaid ? 'שולם' : 'טרם שולם'}</p>
                            <p><strong> תאריך הזמנה</strong> {formatDate(order.orderDate)}</p>
                            <p> {order.notes || 'אין הערות'}<strong>  :הערות</strong></p>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default OrderList;




// const orders = [
//     {
//         "_id": "668513fa9716bd32930fde48",
//         "customerId": {
//             "address": {
//                 "street": "Jaffa",
//                 "houseNumber": 2,
//                 "city": "Jerusalem",
//                 "state": "JM",
//                 "zipCode": "9100000"
//             },
//             "_id": "668511da39dbaad18f7eb541",
//             "name": "Eliana Levi",
//             "email": "eliana.levi@example.com",
//             "driverLicense": "23456789",
//             "password": "<hashed password>",
//             "phone": "0522345678",
//             "rentalHistory": [],
//             "registeredAt": "2024-07-03T08:54:50.738Z",
//             "__v": 0
//         },
//         "carId": {
//             "_id": "668511dd39dbaad18f7eb55e",
//             "carLicense": "89-012-34",
//             "model": "Nissan Leaf",
//             "year": 2021,
//             "dailyRate": 170,
//             "isAvailable": false,
//             "fuelType": "electric",
//             "discount": 5,
//             "images": [
//                 "leaf_front.jpg",
//                 "leaf_charging.jpg"
//             ],
//             "updatedAt": "2023-06-30T00:00:00.000Z",
//             "__v": 0
//         },
//         "from": "2024-07-10T00:00:00.000Z",
//         "to": "2024-07-15T00:00:00.000Z",
//         "quantity": 1,
//         "totalPrice": 750,
//         "notes": "First time customer",
//         "isPaid": true,
//         "status": "open",
//         "orderDate": "2024-07-03T00:00:00.000Z",
//         "__v": 0
//     },
//     {
//         "_id": "668513fa9716bd32930fde49",
//         "customerId": {
//             "address": {
//                 "street": "Haifa",
//                 "houseNumber": 3,
//                 "city": "Haifa",
//                 "state": "HA",
//                 "zipCode": "3100000"
//             },
//             "_id": "668511da39dbaad18f7eb542",
//             "name": "David Katz",
//             "email": "david.katz@example.com",
//             "driverLicense": "34567890",
//             "password": "<hashed password>",
//             "phone": "0533456789",
//             "rentalHistory": [],
//             "registeredAt": "2024-07-03T08:54:50.743Z",
//             "__v": 0
//         },
//         "carId": {
//             "_id": "668511dd39dbaad18f7eb557",
//             "carLicense": "12-345-67",
//             "model": "Toyota Corolla",
//             "year": 2022,
//             "dailyRate": 150,
//             "isAvailable": false,
//             "fuelType": "hybrid",
//             "discount": 5,
//             "images": [
//                 "corolla_front.jpg",
//                 "corolla_side.jpg"
//             ],
//             "updatedAt": "2023-06-15T00:00:00.000Z",
//             "__v": 0
//         },
//         "from": "2024-07-12T00:00:00.000Z",
//         "to": "2024-07-14T00:00:00.000Z",
//         "quantity": 1,
//         "totalPrice": 280,
//         "notes": "Weekend rental",
//         "isPaid": false,
//         "status": "open",
//         "orderDate": "2024-07-03T00:00:00.000Z",
//         "__v": 0
//     },
//     {
//         "_id": "668513fa9716bd32930fde4a",
//         "customerId": {
//             "address": {
//                 "street": "Dizengoff",
//                 "houseNumber": 4,
//                 "city": "Tel Aviv",
//                 "state": "TA",
//                 "zipCode": "6200000"
//             },
//             "_id": "668511da39dbaad18f7eb543",
//             "name": "Yael Shapiro",
//             "email": "yael.shapiro@example.com",
//             "driverLicense": "45678901",
//             "password": "<hashed password>",
//             "phone": "0544567890",
//             "rentalHistory": [],
//             "registeredAt": "2024-07-03T08:54:50.744Z",
//             "__v": 0
//         },
//         "carId": {
//             "_id": "668511dd39dbaad18f7eb557",
//             "carLicense": "12-345-67",
//             "model": "Toyota Corolla",
//             "year": 2022,
//             "dailyRate": 150,
//             "isAvailable": false,
//             "fuelType": "hybrid",
//             "discount": 5,
//             "images": [
//                 "corolla_front.jpg",
//                 "corolla_side.jpg"
//             ],
//             "updatedAt": "2023-06-15T00:00:00.000Z",
//             "__v": 0
//         },
//         "from": "2024-07-15T00:00:00.000Z",
//         "to": "2024-07-22T00:00:00.000Z",
//         "quantity": 1,
//         "totalPrice": 1750,
//         "notes": "Business trip",
//         "isPaid": true,
//         "status": "open",
//         "orderDate": "2024-07-03T00:00:00.000Z",
//         "__v": 0
//     },
//     {
//         "_id": "668513fa9716bd32930fde4b",
//         "customerId": {
//             "address": {
//                 "street": "Ben Yehuda",
//                 "houseNumber": 5,
//                 "city": "Jerusalem",
//                 "state": "JM",
//                 "zipCode": "9200000"
//             },
//             "_id": "668511da39dbaad18f7eb544",
//             "name": "Moshe Friedman",
//             "email": "moshe.friedman@example.com",
//             "driverLicense": "56789012",
//             "password": "<hashed password>",
//             "phone": "0555678901",
//             "rentalHistory": [],
//             "registeredAt": "2024-07-03T08:54:50.746Z",
//             "__v": 0
//         },
//         "carId": {
//             "_id": "668511dd39dbaad18f7eb557",
//             "carLicense": "12-345-67",
//             "model": "Toyota Corolla",
//             "year": 2022,
//             "dailyRate": 150,
//             "isAvailable": false,
//             "fuelType": "hybrid",
//             "discount": 5,
//             "images": [
//                 "corolla_front.jpg",
//                 "corolla_side.jpg"
//             ],
//             "updatedAt": "2023-06-15T00:00:00.000Z",
//             "__v": 0
//         },
//         "from": "2024-07-20T00:00:00.000Z",
//         "to": "2024-07-25T00:00:00.000Z",
//         "quantity": 1,
//         "totalPrice": 650,
//         "notes": "Family vacation",
//         "isPaid": false,
//         "status": "open",
//         "orderDate": "2024-07-03T00:00:00.000Z",
//         "__v": 0
//     },
//     {
//         "_id": "668513fa9716bd32930fde4c",
//         "customerId": {
//             "address": {
//                 "street": "Rothschild",
//                 "houseNumber": 6,
//                 "city": "Tel Aviv",
//                 "state": "TA",
//                 "zipCode": "6300000"
//             },
//             "_id": "668511da39dbaad18f7eb545",
//             "name": "Tamar Goldstein",
//             "email": "tamar.goldstein@example.com",
//             "driverLicense": "67890123",
//             "password": "<hashed password>",
//             "phone": "0566789012",
//             "rentalHistory": [],
//             "registeredAt": "2024-07-03T08:54:50.747Z",
//             "__v": 0
//         },
//         "carId": {
//             "_id": "668511dd39dbaad18f7eb558",
//             "carLicense": "23-456-78",
//             "model": "Honda Civic",
//             "year": 2021,
//             "dailyRate": 140,
//             "isAvailable": false,
//             "fuelType": "petrol",
//             "discount": 0,
//             "images": [
//                 "civic_front.jpg",
//                 "civic_interior.jpg"
//             ],
//             "updatedAt": "2023-07-01T00:00:00.000Z",
//             "__v": 0
//         },
//         "from": "2024-07-18T00:00:00.000Z",
//         "to": "2024-07-23T00:00:00.000Z",
//         "quantity": 1,
//         "totalPrice": 900,
//         "notes": "Airport pickup",
//         "isPaid": true,
//         "status": "open",
//         "orderDate": "2024-07-03T00:00:00.000Z",
//         "__v": 0
//     },
//     {
//         "_id": "668513fa9716bd32930fde4d",
//         "customerId": {
//             "address": {
//                 "street": "King George",
//                 "houseNumber": 7,
//                 "city": "Jerusalem",
//                 "state": "JM",
//                 "zipCode": "9300000"
//             },
//             "_id": "668511da39dbaad18f7eb546",
//             "name": "Avi Mizrachi",
//             "email": "avi.mizrachi@example.com",
//             "driverLicense": "78901234",
//             "password": "<hashed password>",
//             "phone": "0577890123",
//             "rentalHistory": [],
//             "registeredAt": "2024-07-03T08:54:50.747Z",
//             "__v": 0
//         },
//         "carId": {
//             "_id": "668511dd39dbaad18f7eb558",
//             "carLicense": "23-456-78",
//             "model": "Honda Civic",
//             "year": 2021,
//             "dailyRate": 140,
//             "isAvailable": false,
//             "fuelType": "petrol",
//             "discount": 0,
//             "images": [
//                 "civic_front.jpg",
//                 "civic_interior.jpg"
//             ],
//             "updatedAt": "2023-07-01T00:00:00.000Z",
//             "__v": 0
//         },
//         "from": "2024-07-25T00:00:00.000Z",
//         "to": "2024-07-28T00:00:00.000Z",
//         "quantity": 1,
//         "totalPrice": 435,
//         "notes": "City tour",
//         "isPaid": false,
//         "status": "open",
//         "orderDate": "2024-07-03T00:00:00.000Z",
//         "__v": 0
//     },
//     {
//         "_id": "668513fa9716bd32930fde4e",
//         "customerId": {
//             "address": {
//                 "street": "Allenby",
//                 "houseNumber": 8,
//                 "city": "Tel Aviv",
//                 "state": "TA",
//                 "zipCode": "6400000"
//             },
//             "_id": "668511da39dbaad18f7eb547",
//             "name": "Sara Levy",
//             "email": "sara.levy@example.com",
//             "driverLicense": "89012345",
//             "password": "<hashed password>",
//             "phone": "0588901234",
//             "rentalHistory": [],
//             "registeredAt": "2024-07-03T08:54:50.748Z",
//             "__v": 0
//         },
//         "carId": {
//             "_id": "668511dd39dbaad18f7eb559",
//             "carLicense": "34-567-89",
//             "model": "Tesla Model 3",
//             "year": 2023,
//             "dailyRate": 250,
//             "isAvailable": false,
//             "fuelType": "electric",
//             "discount": 10,
//             "images": [
//                 "tesla_front.jpg",
//                 "tesla_interior.jpg",
//                 "tesla_rear.jpg"
//             ],
//             "updatedAt": "2023-06-28T00:00:00.000Z",
//             "__v": 0
//         },
//         "from": "2024-08-01T00:00:00.000Z",
//         "to": "2024-08-08T00:00:00.000Z",
//         "quantity": 1,
//         "totalPrice": 1085,
//         "notes": "Long-term rental",
//         "isPaid": true,
//         "status": "open",
//         "orderDate": "2024-07-03T00:00:00.000Z",
//         "__v": 0
//     },
//     {
//         "_id": "668513fa9716bd32930fde4f",
//         "customerId": {
//             "address": {
//                 "street": "Emek Refaim",
//                 "houseNumber": 9,
//                 "city": "Jerusalem",
//                 "state": "JM",
//                 "zipCode": "9400000"
//             },
//             "_id": "668511da39dbaad18f7eb548",
//             "name": "Yosef Cohen",
//             "email": "yosef.cohen@example.com",
//             "driverLicense": "90123456",
//             "password": "<hashed password>",
//             "phone": "0599012345",
//             "rentalHistory": [],
//             "registeredAt": "2024-07-03T08:54:50.748Z",
//             "__v": 0
//         },
//         "carId": {
//             "_id": "668511dd39dbaad18f7eb559",
//             "carLicense": "34-567-89",
//             "model": "Tesla Model 3",
//             "year": 2023,
//             "dailyRate": 250,
//             "isAvailable": false,
//             "fuelType": "electric",
//             "discount": 10,
//             "images": [
//                 "tesla_front.jpg",
//                 "tesla_interior.jpg",
//                 "tesla_rear.jpg"
//             ],
//             "updatedAt": "2023-06-28T00:00:00.000Z",
//             "__v": 0
//         },
//         "from": "2024-07-30T00:00:00.000Z",
//         "to": "2024-08-02T00:00:00.000Z",
//         "quantity": 1,
//         "totalPrice": 510,
//         "notes": "Weekend getaway",
//         "isPaid": false,
//         "status": "open",
//         "orderDate": "2024-07-03T00:00:00.000Z",
//         "__v": 0
//     },
//     {
//         "_id": "668513fa9716bd32930fde50",
//         "customerId": {
//             "address": {
//                 "street": "Ibn Gabirol",
//                 "houseNumber": 10,
//                 "city": "Tel Aviv",
//                 "state": "TA",
//                 "zipCode": "6500000"
//             },
//             "_id": "668511da39dbaad18f7eb549",
//             "name": "Rachel Rosenfeld",
//             "email": "rachel.rosenfeld@example.com",
//             "driverLicense": "01234567",
//             "password": "<hashed password>",
//             "phone": "0501123456",
//             "rentalHistory": [],
//             "registeredAt": "2024-07-03T08:54:50.749Z",
//             "__v": 0
//         },
//         "carId": {
//             "_id": "668511dd39dbaad18f7eb559",
//             "carLicense": "34-567-89",
//             "model": "Tesla Model 3",
//             "year": 2023,
//             "dailyRate": 250,
//             "isAvailable": false,
//             "fuelType": "electric",
//             "discount": 10,
//             "images": [
//                 "tesla_front.jpg",
//                 "tesla_interior.jpg",
//                 "tesla_rear.jpg"
//             ],
//             "updatedAt": "2023-06-28T00:00:00.000Z",
//             "__v": 0
//         },
//         "from": "2024-08-05T00:00:00.000Z",
//         "to": "2024-08-10T00:00:00.000Z",
//         "quantity": 1,
//         "totalPrice": 1000,
//         "notes": "Business conference",
//         "isPaid": true,
//         "status": "open",
//         "orderDate": "2024-07-03T00:00:00.000Z",
//         "__v": 0
//     },
//     {
//         "_id": "668513fa9716bd32930fde51",
//         "customerId": {
//             "address": {
//                 "street": "Ibn Gabirol",
//                 "houseNumber": 10,
//                 "city": "Tel Aviv",
//                 "state": "TA",
//                 "zipCode": "6500000"
//             },
//             "_id": "668511da39dbaad18f7eb549",
//             "name": "Rachel Rosenfeld",
//             "email": "rachel.rosenfeld@example.com",
//             "driverLicense": "01234567",
//             "password": "<hashed password>",
//             "phone": "0501123456",
//             "rentalHistory": [],
//             "registeredAt": "2024-07-03T08:54:50.749Z",
//             "__v": 0
//         },
//         "carId": {
//             "_id": "668511dd39dbaad18f7eb55a",
//             "carLicense": "45-678-90",
//             "model": "Ford Focus",
//             "year": 2020,
//             "dailyRate": 130,
//             "isAvailable": false,
//             "fuelType": "petrol",
//             "discount": 0,
//             "images": [
//                 "focus_side.jpg"
//             ],
//             "updatedAt": "2023-06-20T00:00:00.000Z",
//             "__v": 0
//         },
//         "from": "2024-08-12T00:00:00.000Z",
//         "to": "2024-08-14T00:00:00.000Z",
//         "quantity": 1,
//         "totalPrice": 320,
//         "notes": "Short trip",
//         "isPaid": false,
//         "status": "open",
//         "orderDate": "2024-07-03T00:00:00.000Z",
//         "__v": 0
//     },
//     {
//         "_id": "668513fa9716bd32930fde52",
//         "customerId": {
//             "address": {
//                 "street": "King George",
//                 "houseNumber": 7,
//                 "city": "Jerusalem",
//                 "state": "JM",
//                 "zipCode": "9300000"
//             },
//             "_id": "668511da39dbaad18f7eb546",
//             "name": "Avi Mizrachi",
//             "email": "avi.mizrachi@example.com",
//             "driverLicense": "78901234",
//             "password": "<hashed password>",
//             "phone": "0577890123",
//             "rentalHistory": [],
//             "registeredAt": "2024-07-03T08:54:50.747Z",
//             "__v": 0
//         },
//         "carId": {
//             "_id": "668511dd39dbaad18f7eb55a",
//             "carLicense": "45-678-90",
//             "model": "Ford Focus",
//             "year": 2020,
//             "dailyRate": 130,
//             "isAvailable": false,
//             "fuelType": "petrol",
//             "discount": 0,
//             "images": [
//                 "focus_side.jpg"
//             ],
//             "updatedAt": "2023-06-20T00:00:00.000Z",
//             "__v": 0
//         },
//         "from": "2024-08-15T00:00:00.000Z",
//         "to": "2024-08-22T00:00:00.000Z",
//         "quantity": 1,
//         "totalPrice": 1155,
//         "notes": "Family reunion",
//         "isPaid": true,
//         "status": "open",
//         "orderDate": "2024-07-03T00:00:00.000Z",
//         "__v": 0
//     },
//     {
//         "_id": "668513fa9716bd32930fde53",
//         "customerId": {
//             "address": {
//                 "street": "Haifa",
//                 "houseNumber": 3,
//                 "city": "Haifa",
//                 "state": "HA",
//                 "zipCode": "3100000"
//             },
//             "_id": "668511da39dbaad18f7eb542",
//             "name": "David Katz",
//             "email": "david.katz@example.com",
//             "driverLicense": "34567890",
//             "password": "<hashed password>",
//             "phone": "0533456789",
//             "rentalHistory": [],
//             "registeredAt": "2024-07-03T08:54:50.743Z",
//             "__v": 0
//         },
//         "carId": {
//             "_id": "668511dd39dbaad18f7eb55b",
//             "carLicense": "56-789-01",
//             "model": "Hyundai Ioniq",
//             "year": 2022,
//             "dailyRate": 180,
//             "isAvailable": false,
//             "fuelType": "hybrid",
//             "discount": 7,
//             "images": [
//                 "ioniq_front.jpg",
//                 "ioniq_rear.jpg"
//             ],
//             "updatedAt": "2023-07-05T00:00:00.000Z",
//             "__v": 0
//         },
//         "from": "2024-08-20T00:00:00.000Z",
//         "to": "2024-08-25T00:00:00.000Z",
//         "quantity": 1,
//         "totalPrice": 775,
//         "notes": "Road trip",
//         "isPaid": false,
//         "status": "open",
//         "orderDate": "2024-07-03T00:00:00.000Z",
//         "__v": 0
//     },
//     {
//         "_id": "668513fa9716bd32930fde54",
//         "customerId": {
//             "address": {
//                 "street": "Jaffa",
//                 "houseNumber": 2,
//                 "city": "Jerusalem",
//                 "state": "JM",
//                 "zipCode": "9100000"
//             },
//             "_id": "668511da39dbaad18f7eb541",
//             "name": "Eliana Levi",
//             "email": "eliana.levi@example.com",
//             "driverLicense": "23456789",
//             "password": "<hashed password>",
//             "phone": "0522345678",
//             "rentalHistory": [],
//             "registeredAt": "2024-07-03T08:54:50.738Z",
//             "__v": 0
//         },
//         "carId": {
//             "_id": "668511dd39dbaad18f7eb55b",
//             "carLicense": "56-789-01",
//             "model": "Hyundai Ioniq",
//             "year": 2022,
//             "dailyRate": 180,
//             "isAvailable": false,
//             "fuelType": "hybrid",
//             "discount": 7,
//             "images": [
//                 "ioniq_front.jpg",
//                 "ioniq_rear.jpg"
//             ],
//             "updatedAt": "2023-07-05T00:00:00.000Z",
//             "__v": 0
//         },
//         "from": "2024-08-25T00:00:00.000Z",
//         "to": "2024-08-30T00:00:00.000Z",
//         "quantity": 1,
//         "totalPrice": 1050,
//         "notes": "Wedding transportation",
//         "isPaid": true,
//         "status": "open",
//         "orderDate": "2024-07-03T00:00:00.000Z",
//         "__v": 0
//     },
//     {
//         "_id": "668513fa9716bd32930fde56",
//         "customerId": {
//             "address": {
//                 "street": "Emek Refaim",
//                 "houseNumber": 9,
//                 "city": "Jerusalem",
//                 "state": "JM",
//                 "zipCode": "9400000"
//             },
//             "_id": "668511da39dbaad18f7eb548",
//             "name": "Yosef Cohen",
//             "email": "yosef.cohen@example.com",
//             "driverLicense": "90123456",
//             "password": "<hashed password>",
//             "phone": "0599012345",
//             "rentalHistory": [],
//             "registeredAt": "2024-07-03T08:54:50.748Z",
//             "__v": 0
//         },
//         "carId": {
//             "_id": "668511dd39dbaad18f7eb55c",
//             "carLicense": "67-890-12",
//             "model": "Mazda 3",
//             "year": 2021,
//             "dailyRate": 145,
//             "isAvailable": true,
//             "fuelType": "petrol",
//             "discount": 0,
//             "images": [
//                 "mazda3_side.jpg",
//                 "mazda3_interior.jpg"
//             ],
//             "updatedAt": "2023-06-25T00:00:00.000Z",
//             "__v": 0
//         },
//         "from": "2024-09-05T00:00:00.000Z",
//         "to": "2024-09-10T00:00:00.000Z",
//         "quantity": 1,
//         "totalPrice": 650,
//         "notes": "College move-in",
//         "isPaid": true,
//         "status": "open",
//         "orderDate": "2024-07-03T00:00:00.000Z",
//         "__v": 0
//     },
//     {
//         "_id": "668513fa9716bd32930fde57",
//         "customerId": {
//             "address": {
//                 "street": "Dizengoff",
//                 "houseNumber": 4,
//                 "city": "Tel Aviv",
//                 "state": "TA",
//                 "zipCode": "6200000"
//             },
//             "_id": "668511da39dbaad18f7eb543",
//             "name": "Yael Shapiro",
//             "email": "yael.shapiro@example.com",
//             "driverLicense": "45678901",
//             "password": "<hashed password>",
//             "phone": "0544567890",
//             "rentalHistory": [],
//             "registeredAt": "2024-07-03T08:54:50.744Z",
//             "__v": 0
//         },
//         "carId": {
//             "_id": "668511dd39dbaad18f7eb55c",
//             "carLicense": "67-890-12",
//             "model": "Mazda 3",
//             "year": 2021,
//             "dailyRate": 145,
//             "isAvailable": true,
//             "fuelType": "petrol",
//             "discount": 0,
//             "images": [
//                 "mazda3_side.jpg",
//                 "mazda3_interior.jpg"
//             ],
//             "updatedAt": "2023-06-25T00:00:00.000Z",
//             "__v": 0
//         },
//         "from": "2024-09-12T00:00:00.000Z",
//         "to": "2024-09-15T00:00:00.000Z",
//         "quantity": 1,
//         "totalPrice": 720,
//         "notes": "Business meeting",
//         "isPaid": false,
//         "status": "open",
//         "orderDate": "2024-07-03T00:00:00.000Z",
//         "__v": 0
//     },
//     {
//         "_id": "668513fa9716bd32930fde58",
//         "customerId": {
//             "address": {
//                 "street": "Ibn Gabirol",
//                 "houseNumber": 10,
//                 "city": "Tel Aviv",
//                 "state": "TA",
//                 "zipCode": "6500000"
//             },
//             "_id": "668511da39dbaad18f7eb549",
//             "name": "Rachel Rosenfeld",
//             "email": "rachel.rosenfeld@example.com",
//             "driverLicense": "01234567",
//             "password": "<hashed password>",
//             "phone": "0501123456",
//             "rentalHistory": [],
//             "registeredAt": "2024-07-03T08:54:50.749Z",
//             "__v": 0
//         },
//         "carId": {
//             "_id": "668511dd39dbaad18f7eb55d",
//             "carLicense": "78-901-23",
//             "model": "Volkswagen Golf",
//             "year": 2022,
//             "dailyRate": 155,
//             "isAvailable": true,
//             "fuelType": "diesel",
//             "discount": 3,
//             "images": [
//                 "golf_front.jpg"
//             ],
//             "updatedAt": "2023-07-10T00:00:00.000Z",
//             "__v": 0
//         },
//         "from": "2024-09-18T00:00:00.000Z",
//         "to": "2024-09-25T00:00:00.000Z",
//         "quantity": 1,
//         "totalPrice": 945,
//         "notes": "Extended test drive",
//         "isPaid": true,
//         "status": "open",
//         "orderDate": "2024-07-03T00:00:00.000Z",
//         "__v": 0
//     },
//     {
//         "_id": "668513fa9716bd32930fde59",
//         "customerId": {
//             "address": {
//                 "street": "Herzl",
//                 "houseNumber": 1,
//                 "city": "Tel Aviv",
//                 "state": "TA",
//                 "zipCode": "6100000"
//             },
//             "_id": "668511da39dbaad18f7eb540",
//             "name": "Noa Cohen",
//             "email": "noa.cohen@example.com",
//             "driverLicense": "12345678",
//             "password": "<hashed password>",
//             "phone": "0501234567",
//             "rentalHistory": [
//                 "6685754fb73492f5fb6143e9"
//             ],
//             "registeredAt": "2024-07-03T08:54:50.736Z",
//             "__v": 1
//         },
//         "carId": {
//             "_id": "668511dd39dbaad18f7eb55d",
//             "carLicense": "78-901-23",
//             "model": "Volkswagen Golf",
//             "year": 2022,
//             "dailyRate": 155,
//             "isAvailable": true,
//             "fuelType": "diesel",
//             "discount": 3,
//             "images": [
//                 "golf_front.jpg"
//             ],
//             "updatedAt": "2023-07-10T00:00:00.000Z",
//             "__v": 0
//         },
//         "from": "2024-09-28T00:00:00.000Z",
//         "to": "2024-09-30T00:00:00.000Z",
//         "quantity": 1,
//         "totalPrice": 270,
//         "notes": "Weekend rental",
//         "isPaid": false,
//         "status": "open",
//         "orderDate": "2024-07-03T00:00:00.000Z",
//         "__v": 0
//     },
//     {
//         "_id": "668513fa9716bd32930fde5a",
//         "customerId": {
//             "address": {
//                 "street": "Jaffa",
//                 "houseNumber": 2,
//                 "city": "Jerusalem",
//                 "state": "JM",
//                 "zipCode": "9100000"
//             },
//             "_id": "668511da39dbaad18f7eb541",
//             "name": "Eliana Levi",
//             "email": "eliana.levi@example.com",
//             "driverLicense": "23456789",
//             "password": "<hashed password>",
//             "phone": "0522345678",
//             "rentalHistory": [],
//             "registeredAt": "2024-07-03T08:54:50.738Z",
//             "__v": 0
//         },
//         "carId": {
//             "_id": "668511dd39dbaad18f7eb55d",
//             "carLicense": "78-901-23",
//             "model": "Volkswagen Golf",
//             "year": 2022,
//             "dailyRate": 155,
//             "isAvailable": true,
//             "fuelType": "diesel",
//             "discount": 3,
//             "images": [
//                 "golf_front.jpg"
//             ],
//             "updatedAt": "2023-07-10T00:00:00.000Z",
//             "__v": 0
//         },
//         "from": "2024-10-01T00:00:00.000Z",
//         "to": "2024-10-08T00:00:00.000Z",
//         "quantity": 1,
//         "totalPrice": 1610,
//         "notes": "Fall foliage tour",
//         "isPaid": true,
//         "status": "open",
//         "orderDate": "2024-07-03T00:00:00.000Z",
//         "__v": 0
//     },
//     {
//         "_id": "668513fa9716bd32930fde5b",
//         "customerId": {
//             "address": {
//                 "street": "Jaffa",
//                 "houseNumber": 2,
//                 "city": "Jerusalem",
//                 "state": "JM",
//                 "zipCode": "9100000"
//             },
//             "_id": "668511da39dbaad18f7eb541",
//             "name": "Eliana Levi",
//             "email": "eliana.levi@example.com",
//             "driverLicense": "23456789",
//             "password": "<hashed password>",
//             "phone": "0522345678",
//             "rentalHistory": [],
//             "registeredAt": "2024-07-03T08:54:50.738Z",
//             "__v": 0
//         },
//         "carId": {
//             "_id": "668511dd39dbaad18f7eb55e",
//             "carLicense": "89-012-34",
//             "model": "Nissan Leaf",
//             "year": 2021,
//             "dailyRate": 170,
//             "isAvailable": false,
//             "fuelType": "electric",
//             "discount": 5,
//             "images": [
//                 "leaf_front.jpg",
//                 "leaf_charging.jpg"
//             ],
//             "updatedAt": "2023-06-30T00:00:00.000Z",
//             "__v": 0
//         },
//         "from": "2024-10-10T00:00:00.000Z",
//         "to": "2024-10-12T00:00:00.000Z",
//         "quantity": 1,
//         "totalPrice": 250,
//         "notes": "Quick trip",
//         "isPaid": false,
//         "status": "open",
//         "orderDate": "2024-07-03T00:00:00.000Z",
//         "__v": 0
//     },
//     {
//         "_id": "668558a76812f17109b5d3b3",
//         "customerId": {
//             "address": {
//                 "street": "Jaffa",
//                 "houseNumber": 2,
//                 "city": "Jerusalem",
//                 "state": "JM",
//                 "zipCode": "9100000"
//             },
//             "_id": "668511da39dbaad18f7eb541",
//             "name": "Eliana Levi",
//             "email": "eliana.levi@example.com",
//             "driverLicense": "23456789",
//             "password": "<hashed password>",
//             "phone": "0522345678",
//             "rentalHistory": [],
//             "registeredAt": "2024-07-03T08:54:50.738Z",
//             "__v": 0
//         },
//         "carId": {
//             "_id": "668511dd39dbaad18f7eb55e",
//             "carLicense": "89-012-34",
//             "model": "Nissan Leaf",
//             "year": 2021,
//             "dailyRate": 170,
//             "isAvailable": false,
//             "fuelType": "electric",
//             "discount": 5,
//             "images": [
//                 "leaf_front.jpg",
//                 "leaf_charging.jpg"
//             ],
//             "updatedAt": "2023-06-30T00:00:00.000Z",
//             "__v": 0
//         },
//         "from": "2024-07-12T00:00:00.000Z",
//         "to": "2024-07-14T00:00:00.000Z",
//         "quantity": 2,
//         "isPaid": false,
//         "status": "open",
//         "orderDate": "2024-07-03T13:56:55.559Z",
//         "totalPrice": 680,
//         "__v": 0
//     },
//     {
//         "_id": "6685590c3b214c9d8c015527",
//         "customerId": {
//             "address": {
//                 "street": "Jaffa",
//                 "houseNumber": 2,
//                 "city": "Jerusalem",
//                 "state": "JM",
//                 "zipCode": "9100000"
//             },
//             "_id": "668511da39dbaad18f7eb541",
//             "name": "Eliana Levi",
//             "email": "eliana.levi@example.com",
//             "driverLicense": "23456789",
//             "password": "<hashed password>",
//             "phone": "0522345678",
//             "rentalHistory": [],
//             "registeredAt": "2024-07-03T08:54:50.738Z",
//             "__v": 0
//         },
//         "carId": {
//             "_id": "668511dd39dbaad18f7eb557",
//             "carLicense": "12-345-67",
//             "model": "Toyota Corolla",
//             "year": 2022,
//             "dailyRate": 150,
//             "isAvailable": false,
//             "fuelType": "hybrid",
//             "discount": 5,
//             "images": [
//                 "corolla_front.jpg",
//                 "corolla_side.jpg"
//             ],
//             "updatedAt": "2023-06-15T00:00:00.000Z",
//             "__v": 0
//         },
//         "from": "2024-07-12T00:00:00.000Z",
//         "to": "2024-10-08T00:00:00.000Z",
//         "quantity": 88,
//         "isPaid": false,
//         "status": "open",
//         "orderDate": "2024-07-03T13:58:36.750Z",
//         "totalPrice": 1161600,
//         "__v": 0
//     },
//     {
//         "_id": "66855f3701c5bc816719d520",
//         "customerId": {
//             "address": {
//                 "street": "Jaffa",
//                 "houseNumber": 2,
//                 "city": "Jerusalem",
//                 "state": "JM",
//                 "zipCode": "9100000"
//             },
//             "_id": "668511da39dbaad18f7eb541",
//             "name": "Eliana Levi",
//             "email": "eliana.levi@example.com",
//             "driverLicense": "23456789",
//             "password": "<hashed password>",
//             "phone": "0522345678",
//             "rentalHistory": [],
//             "registeredAt": "2024-07-03T08:54:50.738Z",
//             "__v": 0
//         },
//         "carId": {
//             "_id": "668511dd39dbaad18f7eb55b",
//             "carLicense": "56-789-01",
//             "model": "Hyundai Ioniq",
//             "year": 2022,
//             "dailyRate": 180,
//             "isAvailable": false,
//             "fuelType": "hybrid",
//             "discount": 7,
//             "images": [
//                 "ioniq_front.jpg",
//                 "ioniq_rear.jpg"
//             ],
//             "updatedAt": "2023-07-05T00:00:00.000Z",
//             "__v": 0
//         },
//         "from": "2024-07-12T00:00:00.000Z",
//         "to": "2024-07-18T00:00:00.000Z",
//         "quantity": 6,
//         "isPaid": false,
//         "status": "open",
//         "orderDate": "2024-07-03T14:24:55.357Z",
//         "totalPrice": 6480,
//         "__v": 0
//     },
//     {
//         "_id": "66856058e5cb29980d387eba",
//         "customerId": {
//             "address": {
//                 "street": "Jaffa",
//                 "houseNumber": 2,
//                 "city": "Jerusalem",
//                 "state": "JM",
//                 "zipCode": "9100000"
//             },
//             "_id": "668511da39dbaad18f7eb541",
//             "name": "Eliana Levi",
//             "email": "eliana.levi@example.com",
//             "driverLicense": "23456789",
//             "password": "<hashed password>",
//             "phone": "0522345678",
//             "rentalHistory": [],
//             "registeredAt": "2024-07-03T08:54:50.738Z",
//             "__v": 0
//         },
//         "carId": {
//             "_id": "668511dd39dbaad18f7eb565",
//             "carLicense": "56-789-02",
//             "model": "Fiat 500",
//             "year": 2022,
//             "dailyRate": 130,
//             "isAvailable": false,
//             "fuelType": "hybrid",
//             "discount": 0,
//             "images": [
//                 "500_side.jpg",
//                 "500_rear.jpg"
//             ],
//             "updatedAt": "2023-06-29T00:00:00.000Z",
//             "__v": 0
//         },
//         "from": "2024-07-12T00:00:00.000Z",
//         "to": "2024-07-18T00:00:00.000Z",
//         "quantity": 6,
//         "isPaid": false,
//         "status": "open",
//         "orderDate": "2024-07-03T14:29:44.006Z",
//         "totalPrice": 4680,
//         "__v": 0
//     },
//     {
//         "_id": "668561deac0ed67948188d92",
//         "customerId": {
//             "address": {
//                 "street": "Jaffa",
//                 "houseNumber": 2,
//                 "city": "Jerusalem",
//                 "state": "JM",
//                 "zipCode": "9100000"
//             },
//             "_id": "668511da39dbaad18f7eb541",
//             "name": "Eliana Levi",
//             "email": "eliana.levi@example.com",
//             "driverLicense": "23456789",
//             "password": "<hashed password>",
//             "phone": "0522345678",
//             "rentalHistory": [],
//             "registeredAt": "2024-07-03T08:54:50.738Z",
//             "__v": 0
//         },
//         "carId": {
//             "_id": "668511dd39dbaad18f7eb559",
//             "carLicense": "34-567-89",
//             "model": "Tesla Model 3",
//             "year": 2023,
//             "dailyRate": 250,
//             "isAvailable": false,
//             "fuelType": "electric",
//             "discount": 10,
//             "images": [
//                 "tesla_front.jpg",
//                 "tesla_interior.jpg",
//                 "tesla_rear.jpg"
//             ],
//             "updatedAt": "2023-06-28T00:00:00.000Z",
//             "__v": 0
//         },
//         "from": "2024-09-12T00:00:00.000Z",
//         "to": "2025-04-18T00:00:00.000Z",
//         "quantity": 218,
//         "isPaid": false,
//         "status": "open",
//         "orderDate": "2024-07-03T14:36:14.120Z",
//         "totalPrice": 11881000,
//         "__v": 0
//     },
//     {
//         "_id": "668562dbac0ed67948188d99",
//         "customerId": {
//             "address": {
//                 "street": "Herzl",
//                 "houseNumber": 1,
//                 "city": "Tel Aviv",
//                 "state": "TA",
//                 "zipCode": "6100000"
//             },
//             "_id": "668511da39dbaad18f7eb540",
//             "name": "Noa Cohen",
//             "email": "noa.cohen@example.com",
//             "driverLicense": "12345678",
//             "password": "<hashed password>",
//             "phone": "0501234567",
//             "rentalHistory": [
//                 "6685754fb73492f5fb6143e9"
//             ],
//             "registeredAt": "2024-07-03T08:54:50.736Z",
//             "__v": 1
//         },
//         "carId": {
//             "_id": "668511dd39dbaad18f7eb562",
//             "carLicense": "23-456-79",
//             "model": "Peugeot 308",
//             "year": 2022,
//             "dailyRate": 155,
//             "isAvailable": false,
//             "fuelType": "diesel",
//             "discount": 0,
//             "images": [
//                 "308_front.jpg",
//                 "308_rear.jpg"
//             ],
//             "updatedAt": "2023-06-27T00:00:00.000Z",
//             "__v": 0
//         },
//         "from": "2024-09-12T00:00:00.000Z",
//         "to": "2025-04-18T00:00:00.000Z",
//         "quantity": 218,
//         "isPaid": false,
//         "status": "open",
//         "orderDate": "2024-07-03T14:40:27.849Z",
//         "totalPrice": 7366220,
//         "__v": 0
//     },
//     {
//         "_id": "6685632e0ca63fb54af3143a",
//         "customerId": {
//             "address": {
//                 "street": "Herzl",
//                 "houseNumber": 1,
//                 "city": "Tel Aviv",
//                 "state": "TA",
//                 "zipCode": "6100000"
//             },
//             "_id": "668511da39dbaad18f7eb540",
//             "name": "Noa Cohen",
//             "email": "noa.cohen@example.com",
//             "driverLicense": "12345678",
//             "password": "<hashed password>",
//             "phone": "0501234567",
//             "rentalHistory": [
//                 "6685754fb73492f5fb6143e9"
//             ],
//             "registeredAt": "2024-07-03T08:54:50.736Z",
//             "__v": 1
//         },
//         "carId": {
//             "_id": "668547c364fa6abbdda1519b",
//             "carLicense": "87452136",
//             "model": "Toyota",
//             "year": 1980,
//             "dailyRate": 280,
//             "isAvailable": false,
//             "fuelType": null,
//             "discount": 0,
//             "images": [],
//             "updatedAt": "2024-07-03T12:44:51.542Z",
//             "__v": 0
//         },
//         "from": "2024-09-12T00:00:00.000Z",
//         "to": "2025-04-18T00:00:00.000Z",
//         "quantity": 218,
//         "isPaid": false,
//         "status": "open",
//         "orderDate": "2024-07-03T14:41:50.714Z",
//         "totalPrice": 13306720,
//         "__v": 0
//     },
//     {
//         "_id": "6685638a0ca63fb54af31442",
//         "customerId": {
//             "address": {
//                 "street": "Dizengoff",
//                 "houseNumber": 18,
//                 "city": "Tel Aviv",
//                 "state": "TA",
//                 "zipCode": "6900000"
//             },
//             "_id": "668511da39dbaad18f7eb551",
//             "name": "Liat Shalom",
//             "email": "liat.shalom@example.com",
//             "driverLicense": "88990011",
//             "password": "<hashed password>",
//             "phone": "0589901234",
//             "rentalHistory": [],
//             "registeredAt": "2024-07-03T08:54:50.752Z",
//             "__v": 0
//         },
//         "carId": {
//             "_id": "668547d364fa6abbdda1519f",
//             "carLicense": "87452106",
//             "model": "Toyota",
//             "year": 1980,
//             "dailyRate": 280,
//             "isAvailable": false,
//             "fuelType": null,
//             "discount": 0,
//             "images": [],
//             "updatedAt": "2024-07-03T12:45:07.024Z",
//             "__v": 0
//         },
//         "from": "2024-09-12T00:00:00.000Z",
//         "to": "2025-04-18T00:00:00.000Z",
//         "quantity": 218,
//         "isPaid": false,
//         "status": "open",
//         "orderDate": "2024-07-03T14:43:22.341Z",
//         "totalPrice": 13306720,
//         "__v": 0
//     },
//     {
//         "_id": "6685754fb73492f5fb6143e9",
//         "customerId": {
//             "address": {
//                 "street": "Herzl",
//                 "houseNumber": 1,
//                 "city": "Tel Aviv",
//                 "state": "TA",
//                 "zipCode": "6100000"
//             },
//             "_id": "668511da39dbaad18f7eb540",
//             "name": "Noa Cohen",
//             "email": "noa.cohen@example.com",
//             "driverLicense": "12345678",
//             "password": "<hashed password>",
//             "phone": "0501234567",
//             "rentalHistory": [
//                 "6685754fb73492f5fb6143e9"
//             ],
//             "registeredAt": "2024-07-03T08:54:50.736Z",
//             "__v": 1
//         },
//         "carId": {
//             "_id": "668511dd39dbaad18f7eb558",
//             "carLicense": "23-456-78",
//             "model": "Honda Civic",
//             "year": 2021,
//             "dailyRate": 140,
//             "isAvailable": false,
//             "fuelType": "petrol",
//             "discount": 0,
//             "images": [
//                 "civic_front.jpg",
//                 "civic_interior.jpg"
//             ],
//             "updatedAt": "2023-07-01T00:00:00.000Z",
//             "__v": 0
//         },
//         "from": "2024-09-12T00:00:00.000Z",
//         "to": "2025-04-18T00:00:00.000Z",
//         "quantity": 218,
//         "isPaid": false,
//         "status": "open",
//         "orderDate": "2024-07-03T15:59:11.595Z",
//         "totalPrice": 6653360,
//         "__v": 0
//     },
//     {
//         "_id": "6685bb8f0420b6ef26a33030",
//         "customerId": {
//             "address": {
//                 "street": "Hillel",
//                 "houseNumber": 19,
//                 "city": "Jerusalem",
//                 "state": "JM",
//                 "zipCode": "9900000"
//             },
//             "_id": "668511da39dbaad18f7eb552",
//             "name": "Nadav Cohen",
//             "email": "nadav.cohen@example.com",
//             "driverLicense": "99001122",
//             "password": "<hashed password>",
//             "phone": "0590012345",
//             "rentalHistory": [
//                 "6685bb8f0420b6ef26a33030"
//             ],
//             "registeredAt": "2024-07-03T08:54:50.753Z",
//             "__v": 1
//         },
//         "carId": {
//             "_id": "66854a87b9fc7ca14b0b3237",
//             "carLicense": "chaim",
//             "model": "chaim",
//             "year": 1990,
//             "dailyRate": 185,
//             "isAvailable": false,
//             "fuelType": "petrol",
//             "discount": 0,
//             "images": [],
//             "updatedAt": "2024-07-03T12:56:39.339Z",
//             "__v": 0
//         },
//         "from": "2024-09-01T00:00:00.000Z",
//         "to": "2024-10-01T00:00:00.000Z",
//         "quantity": 30,
//         "isPaid": false,
//         "status": "open",
//         "orderDate": "2024-07-03T20:58:55.998Z",
//         "totalPrice": 166500,
//         "__v": 0
//     }
// ]