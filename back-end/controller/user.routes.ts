import express from 'express';
import userService from '../service/user.service';

export const userRouter = express.Router();

userRouter.get("/", async (req, res) => {
   res.status(200).send(await userService.getAllUsers());
});

userRouter.post("/", async (req, res) => {

});