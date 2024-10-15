export class Lokaal{
    private campus: string;
    private identificatieNummer: number;

    constructor(lokaal: {campus: string; identificatieNummer: number;}){
        this.campus = lokaal.campus;
        this.identificatieNummer = lokaal.identificatieNummer;
    }

    getCampus(): string{
        return this.campus;
    }

    getIdentificatieNummer(): number{
        return this.identificatieNummer;
    }

    equal(lokaal: Lokaal): boolean{
        return (
            this.campus === lokaal.getCampus() &&
            this.identificatieNummer === lokaal.getIdentificatieNummer()
        )
    }
}
