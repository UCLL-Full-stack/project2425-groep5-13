/**
 * @swagger
 *   components:
 *      schemas:
 *          User:
 *              type: object
 *              properties:
 *                  id:
 *                      type: number
 *                      format: int64
 *                  email:
 *                      type: array
 *                      items: 
 *                          type: string
 *                      description: User email
 *                  password:
 *                      type: string
 *                      description: User password
 *                  studentNumber:
 *                      type: string
 *                      description: User student number
 *          UserInput:
 *              type: object
 *              properties:
 *                  email:
 *                      type: array
 *                      items: 
 *                          type: string
 *                      description: User email
 *                  password:
 *                      type: string
 *                      description: User password
 *                  studentNumber:
 *                      type: string
 *                      description: User student number
 */
import express, { Request, Response } from 'express';
import userService from '../service/user.service';
import { UserInput } from '../types';


export const userRouter = express.Router();

/**
 * @swagger
 * /users:
 *  get:
 *      summary: Get all users
 *      responses:
 *          200:
 *              description: Succesfully all users
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                          $ref: '#/components/schemas/User'
 *      
 */
userRouter.get("/", async (req, res) => {
    try {
        const schedules = await userService.getAllUsers();
        res.status(200).json(schedules);
    } catch (error) {
        const errorMessage = (error as Error).message;
        res.status(400).json({ status: 'error', errorMessage });
    }
});

/**
 * @swagger
 * /users:
 *  post:
 *      summary: Create a new user
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/UserInput'
 *      responses:
 *          200:
 *              description: User created successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/UserInput'
 */
userRouter.post("/", async (req: Request, res: Response) => {
    try {
        const user = <UserInput>req.body
        const result = await userService.createUser(user)
        res.status(200).json(result)
    } catch (error) {
        const errorMessage = (error as Error).message;
        res.status(400).json({ status: 'error', errorMessage })
    }
});