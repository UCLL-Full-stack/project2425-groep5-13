import { Reservatie } from "../model/reservatie"
import { TimeSlot } from "../model/timeSlot"

test('given: valid values for reservatie; when: reservatie is created; then: reservatie is created with those values', () => {
    //given
    const id = 1
    const timeSlot = new TimeSlot(new Date('2025-01-01T10:00:00Z'), new Date('2025-01-01T11:00:00Z'))

    //when
    const reservatie = new Reservatie({
        id: id,
        timeSlot: timeSlot
    })

    //then
    expect(reservatie.getId()).toEqual(id);
    expect(reservatie.getTimeSlot()).toEqual(timeSlot)
})