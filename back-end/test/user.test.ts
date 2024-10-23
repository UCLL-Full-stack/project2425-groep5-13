import { StudentAssocation } from "../model/studentAssocation"
import { User } from "../model/user"

const studentNumber = "r0945734"
const email = "RenzoDemuylder@student.ucll.be"
const password = "password123"
const userGiven = new User({
    studentNumber: studentNumber,
    email: email,
    password: password,
    studentAssocations: []
})
const studentAssocationGiven = new StudentAssocation({
    kboNumber: "1234567890",
    name: "Ulyssis",
    users: [userGiven]
})

test('given: valid values for user; when: user is created; then: user is created with those values', () => {
    //when
    const user = new User({
        studentNumber: studentNumber,
        email: email,
        password: password,
        studentAssocations: []
    })

    //then
    expect(user.getStudentNumber()).toEqual(studentNumber)
    expect(user.getEmail()).toEqual(email)
    expect(user.getPassword()).toEqual(password)
    expect(user.getStudentAssocations()).toEqual([])
})

test('given: an existing user; when: adding a student assocation to user; then: student assocation is registerd for user', () => {
    //given
    const user = new User({
        studentNumber: studentNumber,
        email: email,
        password: password,
        studentAssocations: [],
    })
    //when
    user.addStudentAssocationToUser(studentAssocationGiven)
    //then
    expect(user.getStudentAssocations()).toContain(studentAssocationGiven)
})

test('given: no studentNumber; when: user is created; then: error is thrown', () => {
    //when
    const user = () => new User({studentNumber: "", email: email, password: password, studentAssocations: []})
    //then
    expect(user).toThrow('Studenten nummer is required')
})

test('given: no email; when: user is created; then: error is thrown', () => {
    //when
    const user = () => new User({studentNumber: studentNumber, email: "", password: password, studentAssocations: []})
    //then
    expect(user).toThrow('Email is required')
})

test('given: no password; when: user is created; then: error is thrown', () => {
    //when
    const user = () => new User({studentNumber: studentNumber, email: email, password: "", studentAssocations: []})
    //then
    expect(user).toThrow('Password is required')
})