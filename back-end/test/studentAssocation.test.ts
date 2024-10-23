import { StudentAssocation } from "../model/studentAssocation"
import { User } from "../model/user"

const kboNummer = "0123.456.789"
const name = "ISW"
const userGiven = new User({
    studentNumber: "r0945734",
    email: "RenzoDemuylder@student.ucll.be",
    password: "password123",
    studentAssocations: []
})
const studentAssocationGiven = new StudentAssocation({
    kboNumber: kboNummer,
    name: name,
    users: [userGiven]
})

test('given: valid values for lokaal; when:lokaal is created; then: lokaal is created with those values', () =>{
    //when
    const studentAssocation = new StudentAssocation({
        kboNumber: kboNummer,
        name: name,
        users: [userGiven]
    })
    //then
    expect(studentAssocation.getKboNummer()).toEqual(kboNummer)
    expect(studentAssocation.getName()).toEqual(name)
    expect(studentAssocation.getUsers()).toContain(userGiven)
})

test('given: an existing student asscocation; when: adding a student to student asscocation; then: student is registered for student assocation', () =>{
    //given
    const user = new User({
        studentNumber: "r1234567",
        email: "example@student.ucll.be",
        password: "password123",
        studentAssocations: []
    })
    //when
    studentAssocationGiven.addUserToStudentAssocation(user)
    //then
    expect(studentAssocationGiven.getUsers()).toContain(user)
})

test('given: no KBO number; when: student assocation is created; then: error is thrown', () => {
    //when
    const studentAssocation = () => new StudentAssocation({kboNumber: '', name: name, users: [userGiven]})
    //then
    expect(studentAssocation).toThrow('KBO nummer is required')
})

test('given: no name; when: student assocation is created; then: error is thrown', () => {
    //when
    const studentAssocation = () => new StudentAssocation({kboNumber: kboNummer , name: "", users: [userGiven]})
    //then
    expect(studentAssocation).toThrow('Name is required')
})

test('given: no users; when: student assocation is created; then: error is thrown', () => {
    //when
    const studentAssocation = () => new StudentAssocation({kboNumber: kboNummer , name: name, users: []})
    //then
    expect(studentAssocation).toThrow('Student assocation must have at least 1 user enrolled')
})