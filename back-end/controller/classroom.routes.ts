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
import express, { NextFunction, Request, Response } from 'express';
import { ClassroomInput } from '../types';
import classroomService from '../service/classroom.service';

const classroomRouter = express.Router();