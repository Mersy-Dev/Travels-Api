import { parse } from 'dotenv';
import Tour from '../models/TourModels.js';

export  const createTour = async (req, res) =>{
    const newTour = new Tour(req.body);

    try {
        const savedTour = await newTour.save();
        res.status(200).json({success:true, message: 'Successfully Created', data:savedTour});
    } catch (error) {
        res.status(500).json({success:false, message:'failed to create. Try again'})
    }
}
//update tour
export const updateTour = async (req, res) =>{ 
    const id = req.params.id;

    try {
        const updateTour = await Tour.findByIdAndUpdate(id, {
            $set: req.body,
        }, {new:true});
        res.status(200).json({success:true, message: 'Successfully Updated', data:updateTour});

    } catch (error) {
        res.status(500).json({success:false, message:'failed to update. Try again'})
    }
}

//delete tour
export const deleteTour = async (req, res) =>{ 
    const id = req.params.id;

    try {
        await Tour.findByIdAndDelete(id);
        res.status(200).json({success:true, message: 'Deleted Successfully '});

    } catch (error) {
        res.status(500).json({success:false, message:'failed to delete'})
    }
}

// getsingle tour
export const getSingleTour = async (req, res) =>{ 
       const id = req.params.id;

    try {
        const tour = await Tour.findById(id).populate('reviews');
        res.status(200).json({success:true, message: 'Tour successfully found', data:tour});

    } catch (error) {
        res.status(404).json({success:false, message:'tour not find.'})
    }
}

//get all tours
export const getAllTour = async (req, res) =>{ 
    //for pagination
    const page = parseInt(req.query.page);
    console.log(page);

    try {

        const tours = await Tour.find({}).populate('reviews').skip(page * 8).limit(8);

        res.status(200).json({success:true, count:tours.length, message: 'Successf' , data:tours});
        
    } catch (error) {
        res.status(404).json({success:false, message:'tour not find.'})
        
    }
}


// get tour by search

export const getTourBySearch = async (req, res) =>{ 
    const city = new RegExp(req.query.city, 'i');
    const distance = parseInt(req.query.distance);
    const maxGroupSize = parseInt(req.query.maxGroupSize);

    try {
        const tours = await Tour.find({city, distance:{$gte:distance}, maxGroupSize:{$gte:maxGroupSize}}).populate('reviews');   
        res.status(200).json({success:true, message: 'Success' , data:tours});
    } catch (error) {
        res.status(404).json({success:false, message:'tour not find.'})
        
    }
}



//get featured tours

export const getFeaturedTour = async (req, res) =>{ 

    try {

        const tours = await Tour.find({featured:true}).populate('reviews').limit(8);

        res.status(200).json({success:true, message: 'Successf' , data:tours});
        
    } catch (error) {
        res.status(404).json({success:false, message:'tour not find.'})
        
    }
}


//get tour count

export const getTourCount = async (req, res) =>{ 
    
        try {
    
            const tourCount = await Tour.estimatedDocumentCount();  
    
            res.status(200).json({success:true, message: 'Success' , data:tourCount});
            
        } catch (error) {
            res.status(500).json({success:false, message:'failed to count.'})
            
        }
}