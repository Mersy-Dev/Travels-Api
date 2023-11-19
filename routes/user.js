import express from 'express';//create tour
import { deleteUser, getAllUser, getSingleUser, updateUser } from '../controllers/userController.js';


const router = express.Router()

import {verifyUser} from "../utilities/verifyToken.js"

// router.post('/', createUser);

//update  user
router.put('/:id', verifyUser, updateUser);

//delete user
router.delete('/:id', verifyUser, deleteUser);

// getsingle user
router.get('/:id', verifyUser, getSingleUser);

//get all  user
router.get('/', verifyUser, getAllUser);



export default router;
 