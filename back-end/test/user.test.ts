import { set } from "date-fns"
import { Classroom } from "../model/classroom"
import { Reservation } from "../model/reservation"
import { TimeSlot } from "../model/timeSlot"
import { User } from "../model/user"
import { StudentAssociation } from "../model/studentAssociation"

const studentNumber = "r0945734"
const email = "RenzoDemuylder@student.ucll.be"
const password = "password123"
const timeSlot = new TimeSlot(set (new Date(), {year: 2025, month: 1, date:25, hours: 10}), set (new Date(), {year: 2025, month: 1, date:25, hours: 11}))
const campus = "Proximus"
const classroomNumber = "C102"

const userGiven = new User({
    studentNumber: studentNumber,
    email: email,
    password: password
})
const studentAssocationGiven = new StudentAssociation({
    kboNumber: "1234567890",
    name: "Ulyssis",
    users: [userGiven]
})
const classroom = new Classroom({
    campus: campus,
    classroomNumber: classroomNumber,
})
const reservationGiven = new Reservation({
    timeSlot: timeSlot,
    classroom: classroom
})

test('given: valid values for user; when: user is created; then: user is created with those values', () => {
    //when
    const user = new User({
        studentNumber: studentNumber,
        email: email,
        password: password
    })

    //then
    expect(user.getStudentNumber()).toEqual(studentNumber)
    expect(user.getEmail()).toEqual(email)
    expect(user.getPassword()).toEqual(password)
    expect(user.getStudentAssociations()).toEqual([])
})

test('given: an existing user; when: adding a student assocation to user; then: student assocation is registerd for user', () => {
    //given
    const user = new User({
        studentNumber: studentNumber,
        email: email,
        password: password
    })
    //when
    user.addStudentAssociationToUser(studentAssocationGiven)
    //then
    expect(user.getStudentAssociations()).toContain(studentAssocationGiven)
})

test('given: an existing user; when: adding a reservation to user; then: reservation is registerd for user', () => {
    //given
    const user = new User({
        studentNumber: studentNumber,
        email: email,
        password: password
    })
    //when
    user.addReservationsToUser(reservationGiven)
    //then
    expect(user.getReservations()).toContain(reservationGiven)
})

test('given: an existing user; when: adding a student assocation to user; then: student assocation is added', () => {
    //given
    const user = new User({
        studentNumber: studentNumber,
        email: email,
        password: password
    })
    //when
    user.addStudentAssociationToUser(studentAssocationGiven)
    //then
    expect(user.getStudentAssociations()).toContain(studentAssocationGiven)   
})

test('given: no studentNumber; when: user is created; then: error is thrown', () => {
    //when
    const user = () => new User({studentNumber: "", email: email, password: password})
    //then
    expect(user).toThrow('Studenten nummer is required')
})

test('given: no email; when: user is created; then: error is thrown', () => {
    //when
    const user = () => new User({studentNumber: studentNumber, email: "", password: password})
    //then
    expect(user).toThrow('Email is required')
})

test('given: no password; when: user is created; then: error is thrown', () => {
    //when
    const user = () => new User({studentNumber: studentNumber, email: email, password: ""})
    //then
    expect(user).toThrow('Password is required')
})

test('given: existing user with a reservation; when: add this reservation; then: error is thrown', () => {
    //givne
    userGiven.addReservationsToUser(reservationGiven)
    //when
    const addReservation = () => (userGiven.addReservationsToUser(reservationGiven))
    //then
    expect(addReservation).toThrow('Reservation is already enrolled for this user')
})

test('given: existing user with a student assocation; when: add this student assocation; then: error is thrown', () => {
    //givne
    userGiven.addStudentAssociationToUser(studentAssocationGiven)
    //when
    const addReservation = () => (userGiven.addStudentAssociationToUser(studentAssocationGiven))
    //then
    expect(addReservation).toThrow('Student association is already enrolled for this user')
})