import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CarRentalForm from './index.jsx';
import { BrowserRouter } from 'react-router-dom';

const car = {
    _id: "1",
    model: "Toyota Corolla",
    year: 2020,
    carLicense: "12345678",
    dailyRate: 100,
};

test('renders CarRentalForm and handles form submission', () => {
    render(
        <BrowserRouter>
            <CarRentalForm car={car} />
        </BrowserRouter>
    );

    // בודק אם הטופס מוצג נכון
    expect(screen.getByText(/טופס הזמנת רכב/i)).toBeInTheDocument();

    // ממלא שדות בטופס
    fireEvent.change(screen.getByLabelText(/מספר רישיון נהיגה/i), { target: { value: '12345678' } });
    fireEvent.change(screen.getByLabelText(/תאריך התחלה/i), { target: { value: '2024-07-10' } });
    fireEvent.change(screen.getByLabelText(/תאריך סיום/i), { target: { value: '2024-07-15' } });
    fireEvent.change(screen.getByLabelText(/הערות נוספות/i), { target: { value: 'Test note' } });

    // לוחץ על כפתור ההזמנה
    fireEvent.click(screen.getByText(/הזמן רכב/i));

   
});
