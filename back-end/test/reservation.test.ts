import set from "date-fns/set"
import { Reservation } from "../model/reservation"
import { TimeSlot } from "../model/timeSlot"
import { Classroom } from "../model/classroom"

const timeSlot = new TimeSlot(set (new Date(), {year: 2025, month: 1, date:25, hours: 10}), set (new Date(), {year: 2025, month: 1, date:25, hours: 11}))

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