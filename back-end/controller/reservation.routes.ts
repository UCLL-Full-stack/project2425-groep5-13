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
 *            starttime:
 *              type: string
 *              format: date-time
 *              description: Reseravtion starttime.
 *            endTIme:
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
import reservationService from '../service/reservation.service';

export const reservationRouter = express.Router();

/**
 * @swagger
 * /users:
 *  get:
 *      summary: Get all reservations
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
reservationRouter.get('/:studentNumber', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { studentNumber } = req.params;
        const reservations = await reservationService.getReservationsByUser(studentNumber);
        res.status(200).json(reservations);
    } catch (error) {
        const errorMessage = (error as Error).message;
        res.status(400).json({ status: 'error', errorMessage });
    }
});
