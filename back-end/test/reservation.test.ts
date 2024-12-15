import { Reservation } from '../model/reservation';
import { Classroom } from '../model/classroom';
import { User } from '../model/user';

const startTime = new Date('2025-10-01T10:00:00Z');
const endTime = new Date('2025-10-01T11:00:00Z');

const campus = 'Proximus';
const classroomNumber = 'C102';

const studentNumber = 'r0945734';
const email = ['RenzoDemuylder@student.ucll.be'];
const password = 'password123';

const classroom = new Classroom({
    campus: campus,
    classroomNumber: classroomNumber,
});

const user = new User({
    studentNumber: studentNumber,
    email: email,
    password: password,
});

test('given: valid values for reservation; when: reservation is created; then: reservation is created with those values', () => {
    //when
    const reservation = new Reservation({
        startTime: startTime,
        endTime: endTime,
        classroom: classroom,
        user: user,
    });

    //then
    expect(reservation.getStartTime()).toEqual(startTime);
    expect(reservation.getEndTime()).toEqual(endTime);
    expect(reservation.getClassroom()).toEqual(classroom);
    expect(reservation.getUser);
});
