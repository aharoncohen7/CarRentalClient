import React, { useContext } from 'react';
import styles from './style.module.css';
import { PopupContext } from '../../App';
import CarRentalForm from '../CarRentalForm';

const CarList = ({ cars }) => {
    const { setPopUpContent } = useContext(PopupContext)
    const handleRentCar = (car) => {
        console.log(`Rent car ${car}`);
        setPopUpContent(<CarRentalForm car={car}/>)

    };

    const handleViewDetails = (car) => {
        console.log(`View details for car ${car}`);
    };

    return (
        <div className={styles.carList}>
            {cars.map((car) => (
                <div key={car._id} className={styles.carCard}>
                    <div className={styles.carImages}>
                        {car.images.slice(0, 2).map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                alt={`${car.model} - תמונה ${index + 1}`}
                                className={styles.carImage}
                            />
                        ))}
                    </div>
                    <div className={styles.carInfo}>
                        <h2>{car.model} ({car.year})</h2>
                        <p><strong>מספר רישוי:</strong> {car.carLicense}</p>
                        <p><strong>מחיר ליום:</strong> ₪{car.dailyRate}</p>
                        <p><strong>סוג דלק:</strong> {car.fuelType}</p>
                        <p><strong>הנחה:</strong> {car.discount}%</p>
                        <p><strong>זמינות:</strong> {car.isAvailable ? 'זמין' : 'לא זמין'}</p>
                        <p><strong>עודכן לאחרונה:</strong> {new Date(car.updatedAt).toLocaleDateString('he-IL')}</p>
                    </div>
                    <div className={styles.carActions}>
                        <button onClick={() => handleRentCar(car)} disabled={!car.isAvailable}>
                            {car.isAvailable ? 'השכר רכב' : 'לא זמין להשכרה'}
                        </button>
                        <button onClick={() => handleViewDetails(car._id)}>צפה בפרטים נוספים</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CarList;


// const cars = [
//     {
//         "_id": "668511dd39dbaad18f7eb557",
//         "carLicense": "12-345-67",
//         "model": "Toyota Corolla",
//         "year": 2022,
//         "dailyRate": 150,
//         "isAvailable": false,
//         "fuelType": "hybrid",
//         "discount": 5,
//         "images": [
//             "corolla_front.jpg",
//             "corolla_side.jpg"
//         ],
//         "updatedAt": "2023-06-15T00:00:00.000Z",
//         "__v": 0
//     },
//     {
//         "_id": "668511dd39dbaad18f7eb558",
//         "carLicense": "23-456-78",
//         "model": "Honda Civic",
//         "year": 2021,
//         "dailyRate": 140,
//         "isAvailable": false,
//         "fuelType": "petrol",
//         "discount": 0,
//         "images": [
//             "civic_front.jpg",
//             "civic_interior.jpg"
//         ],
//         "updatedAt": "2023-07-01T00:00:00.000Z",
//         "__v": 0
//     },
//     {
//         "_id": "668511dd39dbaad18f7eb559",
//         "carLicense": "34-567-89",
//         "model": "Tesla Model 3",
//         "year": 2023,
//         "dailyRate": 250,
//         "isAvailable": false,
//         "fuelType": "electric",
//         "discount": 10,
//         "images": [
//             "tesla_front.jpg",
//             "tesla_interior.jpg",
//             "tesla_rear.jpg"
//         ],
//         "updatedAt": "2023-06-28T00:00:00.000Z",
//         "__v": 0
//     },
//     {
//         "_id": "668511dd39dbaad18f7eb55a",
//         "carLicense": "45-678-90",
//         "model": "Ford Focus",
//         "year": 2020,
//         "dailyRate": 130,
//         "isAvailable": false,
//         "fuelType": "petrol",
//         "discount": 0,
//         "images": [
//             "focus_side.jpg"
//         ],
//         "updatedAt": "2023-06-20T00:00:00.000Z",
//         "__v": 0
//     },
//     {
//         "_id": "668511dd39dbaad18f7eb55b",
//         "carLicense": "56-789-01",
//         "model": "Hyundai Ioniq",
//         "year": 2022,
//         "dailyRate": 180,
//         "isAvailable": false,
//         "fuelType": "hybrid",
//         "discount": 7,
//         "images": [
//             "ioniq_front.jpg",
//             "ioniq_rear.jpg"
//         ],
//         "updatedAt": "2023-07-05T00:00:00.000Z",
//         "__v": 0
//     },
//     {
//         "_id": "668511dd39dbaad18f7eb55c",
//         "carLicense": "67-890-12",
//         "model": "Mazda 3",
//         "year": 2021,
//         "dailyRate": 145,
//         "isAvailable": true,
//         "fuelType": "petrol",
//         "discount": 0,
//         "images": [
//             "mazda3_side.jpg",
//             "mazda3_interior.jpg"
//         ],
//         "updatedAt": "2023-06-25T00:00:00.000Z",
//         "__v": 0
//     },
//     {
//         "_id": "668511dd39dbaad18f7eb55d",
//         "carLicense": "78-901-23",
//         "model": "Volkswagen Golf",
//         "year": 2022,
//         "dailyRate": 155,
//         "isAvailable": true,
//         "fuelType": "diesel",
//         "discount": 3,
//         "images": [
//             "golf_front.jpg"
//         ],
//         "updatedAt": "2023-07-10T00:00:00.000Z",
//         "__v": 0
//     },
//     {
//         "_id": "668511dd39dbaad18f7eb55e",
//         "carLicense": "89-012-34",
//         "model": "Nissan Leaf",
//         "year": 2021,
//         "dailyRate": 170,
//         "isAvailable": false,
//         "fuelType": "electric",
//         "discount": 5,
//         "images": [
//             "leaf_front.jpg",
//             "leaf_charging.jpg"
//         ],
//         "updatedAt": "2023-06-30T00:00:00.000Z",
//         "__v": 0
//     },
//     {
//         "_id": "668511dd39dbaad18f7eb55f",
//         "carLicense": "90-123-45",
//         "model": "Kia Sportage",
//         "year": 2023,
//         "dailyRate": 200,
//         "isAvailable": true,
//         "fuelType": "hybrid",
//         "discount": 8,
//         "images": [
//             "sportage_front.jpg",
//             "sportage_rear.jpg"
//         ],
//         "updatedAt": "2023-07-08T00:00:00.000Z",
//         "__v": 0
//     },
//     {
//         "_id": "668511dd39dbaad18f7eb560",
//         "carLicense": "01-234-56",
//         "model": "Skoda Octavia",
//         "year": 2022,
//         "dailyRate": 160,
//         "isAvailable": false,
//         "fuelType": "petrol",
//         "discount": 0,
//         "images": [
//             "octavia_side.jpg"
//         ],
//         "updatedAt": "2023-06-22T00:00:00.000Z",
//         "__v": 0
//     },
//     {
//         "_id": "668511dd39dbaad18f7eb561",
//         "carLicense": "12-345-68",
//         "model": "Renault Zoe",
//         "year": 2021,
//         "dailyRate": 165,
//         "isAvailable": true,
//         "fuelType": "electric",
//         "discount": 6,
//         "images": [
//             "zoe_front.jpg",
//             "zoe_interior.jpg"
//         ],
//         "updatedAt": "2023-07-03T00:00:00.000Z",
//         "__v": 0
//     },
//     {
//         "_id": "668511dd39dbaad18f7eb562",
//         "carLicense": "23-456-79",
//         "model": "Peugeot 308",
//         "year": 2022,
//         "dailyRate": 155,
//         "isAvailable": false,
//         "fuelType": "diesel",
//         "discount": 0,
//         "images": [
//             "308_front.jpg",
//             "308_rear.jpg"
//         ],
//         "updatedAt": "2023-06-27T00:00:00.000Z",
//         "__v": 0
//     },
//     {
//         "_id": "668511dd39dbaad18f7eb563",
//         "carLicense": "34-567-90",
//         "model": "BMW i3",
//         "year": 2021,
//         "dailyRate": 210,
//         "isAvailable": true,
//         "fuelType": "electric",
//         "discount": 10,
//         "images": [
//             "i3_side.jpg",
//             "i3_interior.jpg"
//         ],
//         "updatedAt": "2023-07-12T00:00:00.000Z",
//         "__v": 0
//     },
//     {
//         "_id": "668511dd39dbaad18f7eb564",
//         "carLicense": "45-678-91",
//         "model": "Audi A3",
//         "year": 2023,
//         "dailyRate": 220,
//         "isAvailable": true,
//         "fuelType": "petrol",
//         "discount": 5,
//         "images": [
//             "a3_front.jpg"
//         ],
//         "updatedAt": "2023-07-06T00:00:00.000Z",
//         "__v": 0
//     },
//     {
//         "_id": "668511dd39dbaad18f7eb565",
//         "carLicense": "56-789-02",
//         "model": "Fiat 500",
//         "year": 2022,
//         "dailyRate": 130,
//         "isAvailable": false,
//         "fuelType": "hybrid",
//         "discount": 0,
//         "images": [
//             "500_side.jpg",
//             "500_rear.jpg"
//         ],
//         "updatedAt": "2023-06-29T00:00:00.000Z",
//         "__v": 0
//     },
//     {
//         "_id": "668511dd39dbaad18f7eb566",
//         "carLicense": "67-890-13",
//         "model": "Volvo XC40",
//         "year": 2023,
//         "dailyRate": 240,
//         "isAvailable": true,
//         "fuelType": "hybrid",
//         "discount": 8,
//         "images": [
//             "xc40_front.jpg",
//             "xc40_interior.jpg"
//         ],
//         "updatedAt": "2023-07-11T00:00:00.000Z",
//         "__v": 0
//     },
//     {
//         "_id": "668511dd39dbaad18f7eb567",
//         "carLicense": "78-901-24",
//         "model": "Opel Corsa",
//         "year": 2021,
//         "dailyRate": 135,
//         "isAvailable": false,
//         "fuelType": "petrol",
//         "discount": 0,
//         "images": [
//             "corsa_side.jpg"
//         ],
//         "updatedAt": "2023-06-24T00:00:00.000Z",
//         "__v": 0
//     },
//     {
//         "_id": "668511dd39dbaad18f7eb568",
//         "carLicense": "89-012-35",
//         "model": "Citroen C3",
//         "year": 2022,
//         "dailyRate": 140,
//         "isAvailable": true,
//         "fuelType": "diesel",
//         "discount": 3,
//         "images": [
//             "c3_front.jpg",
//             "c3_rear.jpg"
//         ],
//         "updatedAt": "2023-07-02T00:00:00.000Z",
//         "__v": 0
//     },
//     {
//         "_id": "668511dd39dbaad18f7eb569",
//         "carLicense": "90-123-46",
//         "model": "Mercedes A-Class",
//         "year": 2023,
//         "dailyRate": 230,
//         "isAvailable": true,
//         "fuelType": "hybrid",
//         "discount": 7,
//         "images": [
//             "aclass_front.jpg",
//             "aclass_interior.jpg"
//         ],
//         "updatedAt": "2023-07-09T00:00:00.000Z",
//         "__v": 0
//     },
//     {
//         "_id": "668511dd39dbaad18f7eb56a",
//         "carLicense": "01-234-57",
//         "model": "Suzuki Swift",
//         "year": 2021,
//         "dailyRate": 125,
//         "isAvailable": true,
//         "fuelType": "petrol",
//         "discount": 0,
//         "images": [
//             "swift_side.jpg"
//         ],
//         "updatedAt": "2023-06-26T00:00:00.000Z",
//         "__v": 0
//     },
//     {
//         "_id": "668547c364fa6abbdda1519b",
//         "carLicense": "87452136",
//         "model": "Toyota",
//         "year": 1980,
//         "dailyRate": 280,
//         "isAvailable": false,
//         "fuelType": null,
//         "discount": 0,
//         "images": [],
//         "updatedAt": "2024-07-03T12:44:51.542Z",
//         "__v": 0
//     },
//     {
//         "_id": "668547d364fa6abbdda1519f",
//         "carLicense": "87452106",
//         "model": "Toyota",
//         "year": 1980,
//         "dailyRate": 280,
//         "isAvailable": false,
//         "fuelType": null,
//         "discount": 0,
//         "images": [],
//         "updatedAt": "2024-07-03T12:45:07.024Z",
//         "__v": 0
//     },
//     {
//         "_id": "66854a87b9fc7ca14b0b3237",
//         "carLicense": "chaim",
//         "model": "chaim",
//         "year": 1990,
//         "dailyRate": 185,
//         "isAvailable": false,
//         "fuelType": "petrol",
//         "discount": 0,
//         "images": [],
//         "updatedAt": "2024-07-03T12:56:39.339Z",
//         "__v": 0
//     },
//     {
//         "_id": "6685aedbcb7d8d8107932c8c",
//         "carLicense": "22-258-06",
//         "model": "mazda-71",
//         "year": 2090,
//         "dailyRate": 260,
//         "isAvailable": true,
//         "fuelType": "petrol",
//         "discount": 0,
//         "images": [],
//         "updatedAt": "2024-07-03T20:04:43.905Z",
//         "__v": 0
//     }
// ]