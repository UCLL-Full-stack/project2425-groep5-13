import { StudentAssociation } from '../model/studentAssociation';
import { User } from '../model/user';

const kboNummer = '0123.456.789';
const name = 'ISW';
const userGiven = new User({
    studentNumber: 'r0945734',
    email: ['RenzoDemuylder@student.ucll.be'],
    password: 'password123',
});
const studentAssociationGiven = new StudentAssociation({
    kboNumber: kboNummer,
    name: name,
    users: [userGiven],
});

test('given: valid values for lokaal; when:lokaal is created; then: lokaal is created with those values', () => {
    //when
    const studentAssociation = new StudentAssociation({
        kboNumber: kboNummer,
        name: name,
        users: [userGiven],
    });
    //then
    expect(studentAssociation.getKboNummer()).toEqual(kboNummer);
    expect(studentAssociation.getName()).toEqual(name);
    expect(studentAssociation.getUsers()).toContain(userGiven);
});

test('given: an existing student asscocation; when: adding a student to student asscocation; then: student is registered for student assocation', () => {
    //given
    const user = new User({
        studentNumber: 'r1234567',
        email: ['example@student.ucll.be'],
        password: 'password123',
    });
    //when
    studentAssociationGiven.addUserTostudentAssociation(user);
    //then
    expect(studentAssociationGiven.getUsers()).toContain(user);
});

test('given: no KBO number; when: student assocation is created; then: error is thrown', () => {
    //when
    const studentAssociation = () =>
        new StudentAssociation({ kboNumber: '', name: name, users: [userGiven] });
    //then
    expect(studentAssociation).toThrow('KBO nummer is required');
});

test('given: no name; when: student assocation is created; then: error is thrown', () => {
    //when
    const studentAssociation = () =>
        new StudentAssociation({ kboNumber: kboNummer, name: '', users: [userGiven] });
    //then
    expect(studentAssociation).toThrow('Name is required');
});

test('given: no users; when: student assocation is created; then: error is thrown', () => {
    //when
    const studentAssociation = () =>
        new StudentAssociation({ kboNumber: kboNummer, name: name, users: [] });
    //then
    expect(studentAssociation).toThrow('Student assocation must have at least 1 user enrolled');
});

test('given: an existing student asscocation with an student; when: adding this student to the same student asscocation; then: error is thrown', () => {
    //given
    const user = new User({
        studentNumber: 'r1234567',
        email: ['example@student.ucll.be'],
        password: 'password123',
    });
    studentAssociationGiven.addUserTostudentAssociation(user);
    //when
    const addstudent = () => studentAssociationGiven.addUserTostudentAssociation(user);
    //then
    expect(addstudent).toThrow('User is already enrolled for this student assocation');
});
