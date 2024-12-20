/**
 * @swagger
 *   components:
 *    securitySchemes:
 *     bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *    schemas:
 *      Reservation:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            startTime:
 *              type: string
 *              format: date-time
 *              description: Reseravtion starttime.
 *            endTime:
 *              type: string
 *              format: date-time
 *              description: Reservation endtime.
 *            classroom:
 *              $ref: '#/components/schemas/Classroom'
 *              description: Course classroom.
 *            user:
 *              $ref: '#/components/schemas/User'
 *              description: Course user.
 *      ReservationsInput:
 *          type: object
 *          properties:
 *              starttime:
 *                  type: string
 *                  format: date-time
 *              endtime:
 *                  type: string
 *                  format: date-time
 *              classroom:
 *                  type: object
 *                  properties:
 *                      id:
 *                          type: number
 *                          format: int64
 *              user:
 *                  type: object
 *                  properties:
 *                      id:
 *                          type: number
 *                          format: int64
 */
import express, { NextFunction, Request, Response } from 'express';
import { Request as JWTRequest } from 'express-jwt';
import reservationService from '../service/reservation.service';
import { ReservationInput } from '../types';

export const reservationRouter = express.Router();

/**
 * @swagger
 * /users:
 *  get:
 *      summary: Get all reservations
 *      security:
 *        - bearerAuth: []
 *      responses:
 *          200:
 *              description: Succesfully all reservations
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                          $ref: '#/components/schemas/User'
 *
 */
reservationRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const reservations = await reservationService.getAllReservations();
        res.status(200).json(reservations);
    } catch (error) {
        const errorMessage = (error as Error).message;
        res.status(400).json({ status: 'error', errorMessage });
    }
});

/**
 * @swagger
 * /reservations/user/{studentNumber}:
 *  get:
 *      summary: Get all reservations for a specific user
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: studentNumber
 *          required: true
 *          schema:
 *            type: string
 *          description: The student number of the user
 *      responses:
 *          200:
 *              description: Successfully fetched reservations
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Reservation'
 */
reservationRouter.get('/:studentNumber', async (req: Request & { auth: any}, res: Response, next: NextFunction) => {
    try {
        const { studentNumber } = req.params;
        const reservations = await reservationService.getReservationsByUser(studentNumber);
        res.status(200).json(reservations);
    } catch (error) {
        const errorMessage = (error as Error).message;
        res.status(400).json({ status: 'error', errorMessage });
    }
});

/**
 * @swagger
 * /reservations/{reservationId}:
 *  delete:
 *      summary: Delete a reservation by ID
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: reservationId
 *          required: true
 *          schema:
 *            type: integer
 *            format: int64
 *          description: The ID of the reservation to delete
 *      responses:
 *          200:
 *              description: Reservation deleted successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  example: Reservation deleted
 *          400:
 *              description: Bad request
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
 *                                  example: Reservation ID is required and must be a number
 *          403:
 *              description: Forbidden
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              error:
 *                                  type: string
 *                                  example: You are not authorized to delete this reservation
 */
reservationRouter.delete('/:reservationId', async (req: Request & { auth: any }, res: Response) => {
    try {
        const reservationId = parseInt(req.params.reservationId);
        if (!reservationId) {
            return res.status(400).json({ error: 'Reservation ID is required and must be a number' });
        }
        const reservation = await reservationService.getReservation(reservationId);
        if (reservation.user.studentNumber !== req.auth.studentNumber && req.auth.role !== 'admin') {
            return res.status(403).json({ error: 'You are not authorized to delete this reservation' });
        }
        await reservationService.deleteReservation(reservationId);
        res.status(200).json(reservation);
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: error.message });
    }
});

/**
 * @swagger
 * /reservations:
 *  post:
 *      summary: Create a new reservation
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/ReservationsInput'
 *      responses:
 *          201:
 *              description: Successfully created a new reservation
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Reservation'
 *          400:
 *              description: Bad request
 *          401:
 *              description: Unauthorized
 */
reservationRouter.post('/', async (req: Request & { auth: any }, res: Response) => {
    try {
        const reservationInput = req.body as ReservationInput;
        const reservation = await reservationService.createReservation(reservationInput);
        res.status(201).json(reservation);
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: error.message });
    }
});
