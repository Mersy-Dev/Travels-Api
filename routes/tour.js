import express from 'express';
import { createTour, deleteTour, getAllTour, getFeaturedTour, getSingleTour, getTourBySearch, getTourCount, updateTour } from './../controllers/tourController.js';
import {verifyUser} from "../utilities/verifyToken.js"
const router = express.Router()

//create tour
router.post('/', verifyUser, createTour);

//update tour
router.put('/:id', verifyUser, updateTour);

//delete tour
router.delete('/:id', verifyUser, deleteTour);

// getsingle tour
router.get('/:id', getSingleTour);

//get all tours
router.get('/',  getAllTour);

// get tour by search
router.get('/search/getTourBySearch',getTourBySearch);

// get featured tours
router.get('/search/getFeaturedTours', getFeaturedTour);

// get tour count
router.get('/search/getTourCount',  getTourCount);




export default router;