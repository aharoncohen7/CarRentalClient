import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CarRentalForm from './index.js';
import { BrowserRouter } from 'react-router-dom';

const car = {
    _id: '1',
    model: 'Nissan Leaf',
    year: 2021,
    carLicense: '89-012-34',
    dailyRate: 170,
};

describe('CarRentalForm Component', () => {
    test('renders without crashing', () => {
        render(
            <BrowserRouter>
                <CarRentalForm car={car} />
            </BrowserRouter>
        );

        // בדיקות בסיסיות לבדוק את קיום רכיבי הטופס
        expect(screen.getByText('טופס הזמנת רכב')).toBeInTheDocument();
    });

    test('validates form inputs', () => {
        render(
            <BrowserRouter>
                <CarRentalForm car={car} />
            </BrowserRouter>
        );

        fireEvent.click(screen.getByText('הזמן רכב'));

        expect(screen.getByText('מספר רישיון נהיגה חייב להכיל 8 ספרות בדיוק')).toBeInTheDocument();
        expect(screen.getByText('תאריך התחלה הוא שדה חובה')).toBeInTheDocument();
        expect(screen.getByText('תאריך סיום הוא שדה חובה')).toBeInTheDocument();
    });

    test('calculates total price correctly', () => {
        render(
            <BrowserRouter>
                <CarRentalForm car={car} />
            </BrowserRouter>
        );

        fireEvent.change(screen.getByLabelText('מספר רישיון נהיגה'), { target: { value: '12345678' } });
        fireEvent.change(screen.getByLabelText('תאריך התחלה'), { target: { value: '2024-07-01' } });
        fireEvent.change(screen.getByLabelText('תאריך סיום'), { target: { value: '2024-07-03' } });

        expect(screen.getByText('סה"כ לתשלום: ₪340')).toBeInTheDocument();
    });
});
