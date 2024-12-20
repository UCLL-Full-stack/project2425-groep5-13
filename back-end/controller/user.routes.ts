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
 *                  role:
 *                      type: string
 *                      description: User role
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
 *                  role:
 *                      type: string
 *                      description: User role
 */
import express, { NextFunction, Request, Response } from 'express';
import userService from '../service/user.service';
import { UserInput } from '../types';

export const userRouter = express.Router();

/**
 * @swagger
 * /users:
 *  get:
 *      summary: Get all users
 *      security:
 *        - bearerAuth: []
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
userRouter.get('/', async (req, res) => {
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
 *      security:
 *        - bearerAuth: []
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
userRouter.post('/', async (req: Request & { auth: any }, res: Response) => {
    try {
        const user = <UserInput>req.body;
        const result = await userService.createUser(user);
        res.status(200).json(result);
    } catch (error) {
        const errorMessage = (error as Error).message;
        res.status(400).json({ status: 'error', errorMessage });
    }
});

/**
 * @swagger
 * /users/login:
 *   post:
 *      summary: Login using studentnummer/password. Returns an object with JWT token and user name when succesful.
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/AuthenticationRequest'
 *      responses:
 *         200:
 *            description: The created user object
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/AuthenticationResponse'
 */
userRouter.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userInput = <UserInput>req.body;
        const response = await userService.authenticate(userInput);
        res.status(200).json({ message: 'Authentication succesful', ...response });
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /users/{studentNumber}:
 *  delete:
 *      summary: Delete a user by student number
 *      parameters:
 *        - in: path
 *          name: studentNumber
 *          required: true
 *          schema:
 *            type: string
 *          description: The student number of the user to delete
 *      responses:
 *          200:
 *              description: User deleted
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  example: User deleted
 *          401:
 *              description: Unauthorized
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: string
 *                                  example: error
 *                              errorMessage:
 *                                  type: string
 *                                  example: Unauthorized
 */
userRouter.delete('/:studentNumber', async (req: Request & { auth: any }, res: Response, next: NextFunction) => {
    try {
        const role = req.auth.role;
        if (role !== 'admin') {
            return res.status(401).json({ status: 'error', errorMessage: 'Unauthorized' });
        }

        await userService.deleteUser({ studentNumber: req.params.studentNumber });
        res.status(200).json({ message: 'User deleted' });
    } catch (error) {
        throw error;
    }
});

userRouter.put("/:id", async (req: Request & { auth: any }, res: Response, next: NextFunction) => {
    try {
        const role = req.auth.role;
        if (role !== 'admin') {
            return res.status(401).json({ status: 'error', errorMessage: 'Unauthorized' });
        }

        const user = req.body as UserInput;
        await userService.updateUser(user);
        res.status(200).json({ message: 'User updated' });
    } catch (error) {
        throw error;
    }
});