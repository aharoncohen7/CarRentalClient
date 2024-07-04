import React, { useContext, useState } from 'react';
import axios from 'axios';
import styles from './style.module.css';
import { PopupContext } from '../../App';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const {setPopUpContent} = useContext(PopupContext)
    const navTo = useNavigate()
    const url = 'http://localhost:3355/api/customers/create';
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        driverLicense: '',
        password: '123',
        phone: '',
        address: {
            street: '',
            houseNumber: '',
            city: '',
            state: '',
            zipCode: '',
        },
    });

    const [errors, setErrors] = useState({});
    const [submitStatus, setSubmitStatus] = useState(null);

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) newErrors.name = 'שם הוא שדה חובה';
        if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) newErrors.email = 'כתובת אימייל לא תקינה';
        if (!/^\d{8}$/.test(formData.driverLicense)) newErrors.driverLicense = 'מספר רישיון נהיגה חייב להכיל 8 ספרות בדיוק';
        if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = 'מספר טלפון חייב להכיל 10 ספרות בדיוק';

        if (!formData.address.street.trim()) newErrors['address.street'] = 'רחוב הוא שדה חובה';
        if (!formData.address.houseNumber.trim()) newErrors['address.houseNumber'] = 'מספר בית הוא שדה חובה';
        if (!formData.address.city.trim()) newErrors['address.city'] = 'עיר היא שדה חובה';
        if (!formData.address.state.trim()) newErrors['address.state'] = 'מחוז הוא שדה חובה';
        if (!formData.address.zipCode.trim()) newErrors['address.zipCode'] = 'מיקוד הוא שדה חובה';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith('address.')) {
            const addressField = name.split('.')[1];
            setFormData(prevData => ({
                ...prevData,
                address: {
                    ...prevData.address,
                    [addressField]: value
                }
            }));
        } else {
            setFormData(prevData => ({
                ...prevData,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const response = await axios.post(url, formData);
                setSubmitStatus('success');
                console.log('Customer registered successfully:', response.data);
                setPopUpContent(<p className={styles.successMessage}>הרישום בוצע בהצלחה!</p>)
                navTo("/cars")
            } catch (error) {
                setSubmitStatus('error');
                console.error('Error registering customer:', error);
            }
        }
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <h2>טופס רישום לקוח</h2>

            <div className={styles.formGroup}>
                <label htmlFor="name">שם מלא</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={errors.name ? styles.error : ''}
                    required
                />
                {errors.name && <span className={styles.errorMessage}>{errors.name}</span>}
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="email">אימייל</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? styles.error : ''}
                    required
                />
                {errors.email && <span className={styles.errorMessage}>{errors.email}</span>}
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
                    required
                />
                {errors.driverLicense && <span className={styles.errorMessage}>{errors.driverLicense}</span>}
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="phone">מספר טלפון</label>
                <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={errors.phone ? styles.error : ''}
                    required
                />
                {errors.phone && <span className={styles.errorMessage}>{errors.phone}</span>}
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="address.street">רחוב</label>
                <input
                    type="text"
                    id="address.street"
                    name="address.street"
                    value={formData.address.street}
                    onChange={handleChange}
                    className={errors['address.street'] ? styles.error : ''}
                    required
                />
                {errors['address.street'] && <span className={styles.errorMessage}>{errors['address.street']}</span>}
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="address.houseNumber">מספר בית</label>
                <input
                    type="number"
                    id="address.houseNumber"
                    name="address.houseNumber"
                    value={formData.address.houseNumber}
                    onChange={handleChange}
                    className={errors['address.houseNumber'] ? styles.error : ''}
                    required
                />
                {errors['address.houseNumber'] && <span className={styles.errorMessage}>{errors['address.houseNumber']}</span>}
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="address.city">עיר</label>
                <input
                    type="text"
                    id="address.city"
                    name="address.city"
                    value={formData.address.city}
                    onChange={handleChange}
                    className={errors['address.city'] ? styles.error : ''}
                    required
                />
                {errors['address.city'] && <span className={styles.errorMessage}>{errors['address.city']}</span>}
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="address.state">מחוז</label>
                <input
                    type="text"
                    id="address.state"
                    name="address.state"
                    value={formData.address.state}
                    onChange={handleChange}
                    className={errors['address.state'] ? styles.error : ''}
                    required
                />
                {errors['address.state'] && <span className={styles.errorMessage}>{errors['address.state']}</span>}
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="address.zipCode">מיקוד</label>
                <input
                    type="text"
                    id="address.zipCode"
                    name="address.zipCode"
                    value={formData.address.zipCode}
                    onChange={handleChange}
                    className={errors['address.zipCode'] ? styles.error : ''}
                    required
                />
                {errors['address.zipCode'] && <span className={styles.errorMessage}>{errors['address.zipCode']}</span>}
            </div>

            <button type="submit" className={styles.submitButton}>הרשמה</button>

            {submitStatus === 'success' && <p className={styles.successMessage}>הרישום בוצע בהצלחה!</p>}
            {submitStatus === 'error' && <p className={styles.errorMessage}>אירעה שגיאה בעת הרישום. בדוק את מספר הרישיון ונסה שנית.</p>}
        </form>
    );
};

export default Register;