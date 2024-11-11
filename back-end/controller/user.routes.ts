import express from 'express';
import userService from '../service/user.service';
import { UserInput } from '../types';


export const userRouter = express.Router();

userRouter.get("/", async (req, res) => {
    res.status(200).send(await userService.getAllUsers());
});

userRouter.post("/", async (req, res) => {
    const user: UserInput = req.body;
    if (!user || !user.email || !user.password || !user.studentNumber) return res.status(400).send("Bad Request");
    res.status(201).send(await userService.createUser(user));
});