
import Booking from "../models/bookModel.js"

//create booking
export  const createBooking = async (req, res) => { 
    const newBooking = new Booking(req.body)

    try {
        
        const savedBooking = await newBooking.save();
        res.status(200).json({status: 'success', data: savedBooking, message: 'Booking created successfully'})
    } catch (error) {
        res.status(500).json({status: 'error', message: error.message})
    }
}
 

//get single bookings
export const getBookings = async (req, res) => { 
    const id = req.params;
    try {
        const book = await Booking.find(id);
        res.status(200).json({status: 'success', data: book, message: 'Bookings fetched successfully'})
        
    } catch (error) {
        res.status(404).json({status: 'error', message: "Bookings not found"})
        
    }
}

//get all bookings
export const getAllBookings = async (req, res) => { 
    try {
        const book = await Booking.find();
        res.status(200).json({status: 'success', data: book, message: 'Bookings fetched successfully'})
        
    } catch (error) {
        res.status(500).json({status: 'error', message: "internal server error"})
        
    }
}