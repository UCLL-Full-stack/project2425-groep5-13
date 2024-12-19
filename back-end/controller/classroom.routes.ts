/**
 * @swagger
 *   components:
 *    schemas:
 *      Classroom:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            campus:
 *              type: string
 *            classroomNumber:
 *              type: string
 *      ClassroomInput:
 *          type: object
 *          properties:
 *            campus:
 *              type: string
 *            classroomNumber:
 *              type: string
 */
import express, { Request, Response } from 'express';
import classroomService from '../service/classroom.service';

const classroomRouter = express.Router();

/**
 * @swagger
 * /classrooms:
 *  get:
 *      summary: Get all classrooms
 *      responses:
 *          200:
 *              description: Successfully fetched classrooms
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Classroom'
 */
classroomRouter.get('/', async (req: Request, res: Response) => {
    try {
        const classrooms = await classroomService.getAllClassrooms();
        res.status(200).json(classrooms);
    } catch (error) {
        const errorMessage = (error as Error).message;
        res.status(400).json({ status: 'error', errorMessage });
    }
});
