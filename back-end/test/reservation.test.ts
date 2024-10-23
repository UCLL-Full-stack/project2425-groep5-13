import set from "date-fns/set"
import { Reservation } from "../model/reservation"
import { TimeSlot } from "../model/timeSlot"

test('given: valid values for reservation; when: reservation is created; then: reservation is created with those values', () => {
    //given
    const id = 1
    const timeSlot = new TimeSlot(set (new Date(), {year: 2025, month: 1, date:25, hours: 10}), set (new Date(), {year: 2025, month: 1, date:25, hours: 11}))

    //when
    const reservation = new Reservation({
        id: id,
        timeSlot: timeSlot
    })

    //then
    expect(reservation.getId()).toEqual(id);
    expect(reservation.getTimeSlot()).toEqual(timeSlot)
})