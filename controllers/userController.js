
import User from '../models/UserModels.js';

export  const createUser = async (req, res) =>{
    const newUser = new User(req.body);

    try {
        const savedUser = await newUser.save();
        res.status(200).json({success:true, message: 'Successfully Created', data:savedUser});
    } catch (error) {
        res.status(500).json({success:false, message:'failed to create. Try again'})
    }
}
//update user
export const updateUser = async (req, res) =>{ 
    const id = req.params.id;

    try {
        const updateUser = await User.findByIdAndUpdate(id, {
            $set: req.body,
        }, {new:true});
        res.status(200).json({success:true, message: 'Successfully Updated', data:updateUser});

    } catch (error) {
        res.status(500).json({success:false, message:'failed to update. Try again'})
    }
}

//delete user
export const deleteUser = async (req, res) =>{ 
    const id = req.params.id;

    try {
        await User.findByIdAndDelete(id);
        res.status(200).json({success:true, message: 'Deleted Successfully '});

    } catch (error) {
        res.status(500).json({success:false, message:'failed to delete'})
    }
}

// getsingle user
export const getSingleUser = async (req, res) =>{ 
       const id = req.params.id;

    try {
        const user = await User.findById(id);
        res.status(200).json({success:true, message: 'User successfully found', data:user});

    } catch (error) {
        res.status(404).json({success:false, message:'user not find.'})
    }
}

//get all user
export const getAllUser = async (req, res) =>{ 
       try {

        const user = await User.find({});

        res.status(200).json({success:true, count:user.length, message: 'Success' , data:user});
        
    } catch (error) {
        res.status(404).json({success:false, message:'user not find.'})
        
    }
}
