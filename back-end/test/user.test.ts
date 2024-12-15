import { User } from '../model/user';

const studentNumber = 'r0945734';
const email = ['RenzoDemuylder@student.ucll.be'];
const password = 'password123';

test('given: valid values for user; when: user is created; then: user is created with those values', () => {
    //when
    const user = new User({
        studentNumber: studentNumber,
        email: email,
        password: password,
    });

    //then
    expect(user.getStudentNumber()).toEqual(studentNumber);
    expect(user.getEmail()).toEqual(email);
    expect(user.getPassword()).toEqual(password);
});

test('given: no studentNumber; when: user is created; then: error is thrown', () => {
    //when
    const user = () => new User({ studentNumber: '', email: email, password: password });
    //then
    expect(user).toThrow('Studenten nummer is required');
});

test('given: no email; when: user is created; then: error is thrown', () => {
    //when
    const user = () => new User({ studentNumber: studentNumber, email: [], password: password });
    //then
    expect(user).toThrow('Email is required');
});

test('given: no password; when: user is created; then: error is thrown', () => {
    //when
    const user = () => new User({ studentNumber: studentNumber, email: email, password: '' });
    //then
    expect(user).toThrow('Password is required');
});
