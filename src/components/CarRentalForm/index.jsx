
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './style.module.css';
import { PopupContext } from '../../App';
import { compareDatesWithoutTime } from '../../helpers';
import axios from 'axios';

const CarRentalForm = ({ car }) => {
    const { setPopUpContent } = useContext(PopupContext)
    const url = 'http://localhost:3355/api/rentals/create';
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        isExistingCustomer: true,
        driverLicense: '',
        from: '',
        to: '',
        notes: '',
        carId: car._id,
    });
    const [errors, setErrors] = useState({});
    const [submitStatus, setSubmitStatus] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);
    const [rentalDays, setRentalDays] = useState(0);

    useEffect(() => {
        calculateRentalDetails();
    }, [formData.from, formData.to]);

    const validateForm = () => {
        const newErrors = {};
        if ( !/^\d{8}$/.test(formData.driverLicense)) {
            newErrors.driverLicense = 'מספר רישיון נהיגה חייב להכיל 8 ספרות בדיוק';
        }
        if (!formData.from) newErrors.from = 'תאריך התחלה הוא שדה חובה';
        if (!formData.to) newErrors.to = 'תאריך סיום הוא שדה חובה';
        if (!compareDatesWithoutTime(new Date(formData.from), new Date())) {
            newErrors.from = 'תאריך התחלה חייב להיות היום או בעתיד';
        }
        if (new Date(formData.to) <= new Date(formData.from)) newErrors.to = 'תאריך סיום חייב להיות אחרי תאריך ההתחלה';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const calculateRentalDetails = () => {
        if (formData.from && formData.to) {
            const days = Math.ceil((new Date(formData.to) - new Date(formData.from)) / (1000 * 60 * 60 * 24));
            setRentalDays(days);
            setTotalPrice(car.dailyRate * days);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log('Form submitted:', {
                ...formData, carId: car._id,
                totalPrice, rentalDays
            });
            try {
                const response = await axios.post(url, {...formData, totalPrice});
                if (response) {
                    setSubmitStatus('success');
                    console.log('Rental booked successfully:', response.data);
                    setPopUpContent(<p className={styles.successMessage}>הזמנת הרכב בוצעה בהצלחה! {response.id} </p>)
                    setTimeout(() => {
                        setPopUpContent(null)
                    }, 2000)
                }
            }
            catch (error) {
                setSubmitStatus('error');
                console.error('Error booking rental:', error);
                setPopUpContent(<p className={styles.errorMessage}>{error.response.data}</p>)
            }

        }
    };

    if (!formData.isExistingCustomer) {
        return (
            <div className={styles.registerPrompt}>
                <p>נראה שאתה לקוח חדש. כדי להמשיך בהזמנה, עליך להירשם תחילה.</p>
                <button onClick={() => { navigate('/register'); setPopUpContent(null) }} className={styles.registerButton}>
                    הרשם כלקוח חדש
                </button>
                <button onClick={() => setFormData(prev => ({ ...prev, isExistingCustomer: true }))} className={styles.backButton}>
                    חזור לטופס ההזמנה
                </button>
            </div>
        );
    }

    return (
        <form className={styles.rentalForm} onSubmit={handleSubmit}>
            <h2>טופס הזמנת רכב</h2>

            <div className={styles.formGroup}>
                <label>
                    <input
                        type="checkbox"
                        name="isExistingCustomer"
                        checked={formData.isExistingCustomer}
                        onChange={handleChange}
                    />
                    לקוח קיים
                </label>
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="driverLicense">מספר רישיון נהיגה</label>
                <input
                    type="text"
                    id="driverLicense"
                    name="driverLicense"
                    value={formData.driverLicense}
                    onChange={handleChange}
                    className={errors.driverLicense ? styles.error : ''}
                />
                {errors.driverLicense && <span className={styles.errorMessage}>{errors.driverLicense}</span>}
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="from">תאריך התחלה</label>
                <input
                    type="date"
                    id="from"
                    name="from"
                    value={formData.from}
                    onChange={handleChange}
                    className={errors.from ? styles.error : ''}
                    min={new Date().toISOString().split('T')[0]}
                />
                {errors.from && <span className={styles.errorMessage}>{errors.from}</span>}
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="to">תאריך סיום</label>
                <input
                    type="date"
                    id="to"
                    name="to"
                    value={formData.to}
                    onChange={handleChange}
                    className={errors.to ? styles.error : ''}
                    min={formData.from}
                />
                {errors.to && <span className={styles.errorMessage}>{errors.to}</span>}
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="notes">הערות נוספות</label>
                <textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                />
            </div>

            <div className={styles.carDetails}>
                <h3>פרטי הרכב</h3>
                {/* <span className={styles.summary}> */}
                    <p><strong>דגם:</strong> {car.model}</p>
                    <p><strong>שנה:</strong> {car.year}</p>
                    {/* </span> */}
                {/* <span className={styles.summary}> */}
                    <p><strong>מספר רישוי:</strong> {car.carLicense}</p>
                    <p><strong>מחיר ליום:</strong> ₪{car.dailyRate}</p>
                {/* </span> */}
            </div>

            <div className={styles.rentalSummary}>
                <p><strong>מספר ימי השכרה:</strong> {rentalDays}</p>
                <h3>סה"כ לתשלום: ₪{totalPrice}</h3>
            </div>

            <div className={styles.formActions}>
                <button onClick={() => { setPopUpContent(null) }} type="submit" className={styles.submitButton}>ביטול</button>
                <button type="submit" className={styles.submitButton}>הזמן רכב</button>
            </div>
        </form>
    );
};

export default CarRentalForm;