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
 *      security:
 *        - bearerAuth: []
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
classroomRouter.get('/', async (req: Request & { auth: any }, res: Response) => {
    try {
        const classrooms = await classroomService.getAllClassrooms();
        res.status(200).json(classrooms);
    } catch (error) {
        const errorMessage = (error as Error).message;
        res.status(400).json({ status: 'error', errorMessage });
    }
});

/**
 * @swagger
 * /classrooms:
 *  post:
 *      summary: Create a new classroom
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/ClassroomInput'
 *      responses:
 *          201:
 *              description: Successfully created a new classroom
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Classroom'
 *          400:
 *              description: Bad request
 *          401:
 *              description: Unauthorized
 */
classroomRouter.post('/', async (req: Request & { auth: any }, res: Response) => {
    try {
        const role = req.auth.role;
        if (role !== 'admin') {
            throw new Error('Unauthorized');
        }
        const classroom = req.body;
        const newClassroom = await classroomService.createClassroom(classroom);
        res.status(201).json(newClassroom);
    } catch (error) {
        const errorMessage = (error as Error).message;
        res.status(400).json({ status: 'error', errorMessage });
    }
});

/**
 * @swagger
 * /classrooms/{classroomId}:
 *  delete:
 *      summary: Delete a classroom by ID
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: classroomId
 *          required: true
 *          schema:
 *            type: integer
 *            format: int64
 *          description: The ID of the classroom to delete
 *      responses:
 *          204:
 *              description: Classroom deleted successfully
 *          400:
 *              description: Bad request
 *          401:
 *              description: Unauthorized
 */
classroomRouter.delete('/:classroomId', async (req: Request & { auth: any }, res: Response) => {
    try {
        const role = req.auth.role;
        if (role !== 'admin') {
            throw new Error('Unauthorized');
        }
        const classroomId = parseInt(req.params.classroomId);
        await classroomService.deleteClassroom(classroomId);
        res.status(204).end();
    } catch (error) {
        const errorMessage = (error as Error).message;
        res.status(400).json({ status: 'error', errorMessage });
    }
});

export default classroomRouter;