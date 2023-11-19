import Tour from "../models/TourModels.js";
import Review from "../models/ReviewModels.js";




export const createReview = async (req, res) => { 
    const tourId = req.params.tourId;
    const newReview = new Review({...req.body});

    try {
        const savedReview = await newReview.save();

        //after updating the review, update the review array in the tour model
        await  Tour.findByIdAndUpdate(tourId, {
            $push:{
                reviews:savedReview._id
            }
        }, {new:true});
        res.status(200).json({success:true, message: 'review submitted', data:savedReview});
    } catch (error) {
        res.status(500).json({success:false, message:'Failed to submit review'}) 
        console.log(error);
        
    } 
}