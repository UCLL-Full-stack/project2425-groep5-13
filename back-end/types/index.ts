type TimeSlotInput = {
    startTime: Date
    endTime: Date
}

type ClassroomInput = {
    id?: number
    campus: string
    classroomNumber: string
    reservations?: ReservationInput[]
}

type ReservationInput = {
    id?: number;
    timeSlot: TimeSlotInput
    classroom: ClassroomInput
}

export {
    TimeSlotInput,
    ClassroomInput,
    ReservationInput
}