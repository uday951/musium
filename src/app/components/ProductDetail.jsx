"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import CalenderComponent from '@/app/components/CalenderComponent';
import { bookingAction } from '../serverActions/bookingAction';
import { Circles } from 'react-loader-spinner';

const DynamicProduct = () => {
    const [record, setRecord] = useState("");

    const [selectedDates, setSelectedDates] = useState(null); // Corrected spelling

    const params = useParams();
    const { id } = params;

    console.log("dynamic ClientId:", id);

    const dynamicProductHandler = async () => {
        const response = await fetch(`http://localhost:3000/api/admin/product/${id}`);
        const newData = await response.json();

        console.log("dynamic data:", newData);
        setRecord(newData.data);
    };

    useEffect(() => {
        dynamicProductHandler();
    }, []);

    const bookingHandler = async () => {
        if (!selectedDates) {
            alert("Please select booking dates");
            return;
        }

        const bookingDetails = { record, selectedDates }; // Corrected spelling
        try {
            const response = await bookingAction(bookingDetails);
            if (response.success) {
                alert("Booking Successful");
            }
        } catch (error) {
            console.error("Booking error:", error);
        }
    };

    const handleDateSelect = (dates) => {
        setSelectedDates(dates); // Properly setting selectedDates
        console.log("dates coming from calenderComp:", dates);
    };

    return (
        <div>
            <CalenderComponent onDatesSelect={handleDateSelect} />
            <Link href="/">
                <p align="center">Go Back</p>
            </Link>
            {record ? (
                <div className="singleSection">
                    <div className="singleLeft">
                        <div>
                            <h2>{record.title}</h2>
                        </div>
                        <img src={record.image} alt={record.title} className="singleImage" />
                    </div>
                    <div className="singleCenter">
                        <div className="singlePrice">Rs.{record.price}</div>
                        <p className="singleDesc">{record.desc}</p>
                        <div>
                            {record.amen.map((item, i) => (
                                <div className="singleAmen" key={i}>
                                    <span>*</span> {item}
                                </div>
                            ))}
                        </div>
                        <div className="offer">
                            <span>*</span>
                            <button> Discount {record.offer}</button>
                        </div>
                        <div className="singleBtn">
                            <button className="" onClick={bookingHandler}>Book Now</button>
                        </div>
                    </div>
                </div>
            ) : (
                <h1 style={{ position: 'absolute', top: '50%', left: '50%' }}>
                    <Circles
                        height="80"
                        width="80"
                        color="#4fa94d"
                        ariaLabel="circles-loading"
                        visible={true}
                    />
                </h1>
            )}
        </div>
    );
};

export default DynamicProduct;
