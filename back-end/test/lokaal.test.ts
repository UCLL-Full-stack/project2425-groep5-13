import { Lokaal } from "../model/lokaal"

test('given: valid values for lokaal; when:lokaal is created; then: lokaal is created with those values', () =>{
    //given
    const campus = "Proximus"
    const lokaalNummer = "C102"

    //when
    const lokaal = new Lokaal({
        campus: campus,
        lokaalNummer: lokaalNummer
    })

    //then
    expect(lokaal.getCampus()).toEqual(campus)
    expect(lokaal.getLokaalNummer()).toEqual(lokaalNummer)
})