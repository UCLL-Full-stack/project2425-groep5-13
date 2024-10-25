import { Classroom } from "../model/classroom"
import { Reservation } from "../model/reservation"
import { TimeSlot } from "../model/timeSlot"

const campus = "Proximus"
const classroomNumber = "C102"

const classroom = new Classroom({
    campus: campus,
    classroomNumber: classroomNumber,
})
const timeSlot = new TimeSlot(
    new Date("2025-10-01T10:00:00Z"),
    new Date("2025-10-01T12:00:00Z")
)
const reservation = new Reservation({
    timeSlot: timeSlot,
    classroom: classroom
})

test('given: valid values for classroom; when: classroom is created; then: classroom is created with those values', () =>{
    //when
    const classroom = new Classroom({
        campus: campus,
        classroomNumber: classroomNumber,
    })

    //then
    expect(classroom.getCampus()).toEqual(campus)
    expect(classroom.getClassroomNumber()).toEqual(classroomNumber)
    expect(classroom.getReservations()).toEqual([])
})

test('given: existing classroom; when: add reservation to classroom; then: reservation is added to classroom', () => {
    //when
    classroom.addReservationToClassroom(reservation)
    //given
    expect(classroom.getReservations()).toContain(reservation)
})

test('given: no campus; when: classroom is created; then: error is thrown', () => {
    //when
    const classroom = () => new Classroom({campus: "", classroomNumber: classroomNumber})
    //then
    expect(classroom).toThrow('Campus is required')
})

test('given: no classroom number; when: classroom is created; then: error is thrown', () => {
    //when
    const classroom = () => new Classroom({campus: campus, classroomNumber: ""})
    //then
    expect(classroom).toThrow('Classroom number is required')
})

test('given: existing classroom with a reservation; when: add reservation with the same an overlapping timeslot; then: error is thrown', () => {
    //given
    const classroom = new Classroom({
        campus: campus,
        classroomNumber: classroomNumber,
    })
    classroom.addReservationToClassroom(reservation)
    //when
    const addReservation = () => classroom.addReservationToClassroom(new Reservation({
        timeSlot: new TimeSlot(new Date("2025-10-01T11:00:00Z"), new Date("2025-10-01T13:00:00Z")),
        classroom: classroom
    }))
    //given
    expect(addReservation).toThrow("Reservation you want to add has overlapping timeslots with another reservation")
})