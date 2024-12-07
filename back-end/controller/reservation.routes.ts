import express, { NextFunction, Request, Response } from 'express';
import { ReservationInput } from '../types';
import reservationService from '../service/reservation.service';