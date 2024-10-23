import { Classroom } from "../model/classRoom"

test('given: valid values for classRoom; when:classRoom is created; then: classRoom is created with those values', () =>{
    //given
    const campus = "Proximus"
    const classroomNumber = "C102"

    //when
    const classroom = new Classroom({
        campus: campus,
        classroomNumber: classroomNumber,
        reservations: []
    })

    //then
    expect(classroom.getCampus()).toEqual(campus)
    expect(classroom.getClassroomNumber()).toEqual(classroomNumber)
    expect(classroom.getReservation()).toEqual([])
})