import set from "date-fns/set"
import { Reservatie } from "../model/reservatie"
import { TimeSlot } from "../model/timeSlot"

test('given: valid values for reservatie; when: reservatie is created; then: reservatie is created with those values', () => {
    //given
    const id = 1
    const timeSlot = new TimeSlot(set (new Date(), {year: 2025, month: 1, date:25, hours: 10}), set (new Date(), {year: 2025, month: 1, date:25, hours: 11}))

    //when
    const reservatie = new Reservatie({
        id: id,
        timeSlot: timeSlot
    })

    //then
    expect(reservatie.getId()).toEqual(id);
    expect(reservatie.getTimeSlot()).toEqual(timeSlot)
})