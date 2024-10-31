import set from "date-fns/set"
import { Reservation } from "../model/reservation"
import { TimeSlot } from "../model/timeSlot"
import { Classroom } from "../model/classroom"

const timeSlot = new TimeSlot(new Date("2025-10-01T10:00:00Z"), new Date("2025-10-01T11:00:00Z"))
const campus = "Proximus"
const classroomNumber = "C102"

const classroom = new Classroom({
    campus: campus,
    classroomNumber: classroomNumber,
})

test('given: valid values for reservation; when: reservation is created; then: reservation is created with those values', () => {
    //when
    const reservation = new Reservation({
        timeSlot: timeSlot,
        classroom: classroom
    })

    //then
    expect(reservation.getTimeSlot()).toEqual(timeSlot)
})