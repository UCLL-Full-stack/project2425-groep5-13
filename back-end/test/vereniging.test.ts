import { Vereniging } from "../model/vereniging"

test('given: valid values for lokaal; when:lokaal is created; then: lokaal is created with those values', () =>{
    //given
    const kboNummer = "0123.456.789"
    const name = "ISW"

    //when
    const vereniging = new Vereniging({
        kboNummer: kboNummer,
        name: name
    })

    //then
    expect(vereniging.getKboNummer()).toEqual(kboNummer)
    expect(vereniging.getName()).toEqual(name)
})