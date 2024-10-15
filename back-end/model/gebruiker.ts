export class Gebruiker{
    private studentenNummer: string;
    private email: string;
    private password: string;

    constructor(gebruiker: {studentNummer: string; email: string; password: string;}){
        this.studentenNummer = gebruiker.studentNummer;
        this.email = gebruiker.email;
        this.password = gebruiker.password;
    }

    getStudentenNummer(): string{
        return this.studentenNummer;
    }

    getEmail(): string{
        return this.email;
    }

    getPassword(): string{
        return this.password;
    }

    equal(gebruiker: Gebruiker): boolean{
        return (
            this.studentenNummer === gebruiker.getStudentenNummer() &&
            this.email === gebruiker.getEmail() &&
            this.password === gebruiker.getPassword()
        )
    }
}
