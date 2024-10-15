import { Gebruiker } from "../model/gebruiker"

test('given: valid values for gebruiker; when: gebuiker is created; then: gebruiker is created with those values', () => {
    //given
    const studentenNummer = "r0945734"
    const email = "RenzoDemuylder@student.ucll.be"
    const password = "password123"

    //when
    const gebruiker = new Gebruiker({
        studentNummer: studentenNummer,
        email: email,
        password: password
    })

    //then
    expect(gebruiker.getStudentenNummer()).toEqual(studentenNummer)
    expect(gebruiker.getEmail()).toEqual(email)
    expect(gebruiker.getPassword()).toEqual(password)
})