"use server";

import { authOptions } from "../auth";
import DBConnection from "../utils/config/db";
import BookingModel from "../utils/models/Booking";
import UserModel from "../utils/models/User";
import { getServerSession } from 'next-auth';

export async function bookingAction(bookingDetails) {
    await DBConnection();

    // Retrieve user session
    const session = await getServerSession(authOptions);

    // Check if session exists and user is authenticated
    if (!session || !session.email) {
        return { success: false, message: 'User not authenticated' };
    }

    console.log("User email:", session.email);

    try {
        // Find the user by email
        const user = await UserModel.findOne({ email: session.email });

        if (!user) {
            return { success: false, message: 'User not found' };
        }

        const userId = user._id.toString();

        console.log("Booking details:", bookingDetails);

        // Create booking entry
        const userBookingDetails = await BookingModel.create({
            startDate: bookingDetails.selectedDates.startDate, // Correct reference to startDate
            endDate: bookingDetails.selectedDates.endDate,     // Correct reference to endDate
            productName: bookingDetails.record.title,
            price: bookingDetails.record.price,
            offer: bookingDetails.record.offer,
            image: bookingDetails.record.image
        });

        // Update user model with new booking reference
        await UserModel.findByIdAndUpdate(
            userId,
            { $push: { bookings: userBookingDetails._id } },
            { new: true }
        );

        return { success: true };
    } catch (error) {
        console.error('Error creating booking:', error);
        return { success: false, message: 'Failed to create booking' };
    }
}
