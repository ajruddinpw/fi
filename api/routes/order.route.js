import express from "express";
import {verifyToken} from '../middelware/jwt.js'
import {getOrders, intent} from '../controller/order.controller.js'

// router.post('/:gigId',verifyToken,createOrder);

const router =express.Router();

//router.post("/:gigId",verifyToken,createOrder);
router.get('/',verifyToken,getOrders);
router.post('/create-payment-intent/:id',verifyToken,intent);

export default router;