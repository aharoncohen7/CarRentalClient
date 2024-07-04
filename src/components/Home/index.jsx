import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import CarList from '../CarList'
import CustomerList from '../CustomersList'
import OrderList from '../OrderList'
import axios from 'axios'

const Home = () => {
    const { categoryName } = useParams()
    const [change, setChange] = useState(false)
    const url = 'http://localhost:3355/api/';
    const [data, setData] = useState([]);


    // קבלת תוכן טבלה
    useEffect(() => {
        const fetchTableData = async () => {
            try {
                const response = await axios.post(url  + categoryName);
                if (response.status == 200) {
                    console.log(response.data);
                    setData(response.data);
                }

            } catch (err) {
                console.log("Error in fetching data");
                console.error(err);
            }
        };

        // setTimeout(()=>{
            fetchTableData()
        // },1000)
    }, [categoryName, change])

    console.log(categoryName)
    return (
        <div style={{paddingTop: "60px"}}>
            {categoryName == "rentals" && <OrderList orders={data} onChange={setChange}/>}
            {categoryName == "cars" && <CarList cars={data} onChange={setChange} />}
            {categoryName == "customers" && <CustomerList customers={data} onChange={setChange} />}
        </div>
    )
}

export default Home
