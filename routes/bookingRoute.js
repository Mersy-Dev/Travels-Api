import express from 'express';
import { createBooking, getAllBookings, getBookings } from '../controllers/bookingController.js';
import {verifyAdmin, verifyUser} from "../utilities/verifyToken.js"


const router = express.Router()


router.post('/', verifyUser, createBooking);
router.get('/:id', verifyUser, getBookings);
router.get('/allbook', verifyAdmin, getAllBookings);



export default router;
