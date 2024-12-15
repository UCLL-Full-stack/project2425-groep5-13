import { Classroom } from '../model/classroom';

const campus = 'Proximus';
const classroomNumber = 'C102';

test('given: valid values for classroom; when: classroom is created; then: classroom is created with those values', () => {
    //when
    const classroom = new Classroom({
        campus: campus,
        classroomNumber: classroomNumber,
    });

    //then
    expect(classroom.getCampus()).toEqual(campus);
    expect(classroom.getClassroomNumber()).toEqual(classroomNumber);
});

test('given: no campus; when: classroom is created; then: error is thrown', () => {
    //when
    const classroom = () => new Classroom({ campus: '', classroomNumber: classroomNumber });
    //then
    expect(classroom).toThrow('Campus is required');
});

test('given: no classroom number; when: classroom is created; then: error is thrown', () => {
    //when
    const classroom = () => new Classroom({ campus: campus, classroomNumber: '' });
    //then
    expect(classroom).toThrow('Classroom number is required');
});
