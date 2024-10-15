export class Lokaal{
    private campus: string;
    private lokaalNummer: string;

    constructor(lokaal: {campus: string; lokaalNummer: string;}){
        this.campus = lokaal.campus;
        this.lokaalNummer = lokaal.lokaalNummer;
    }

    getCampus(): string{
        return this.campus;
    }

    getLokaalNummer(): string{
        return this.lokaalNummer;
    }

    equal(lokaal: Lokaal): boolean{
        return (
            this.campus === lokaal.getCampus() &&
            this.lokaalNummer === lokaal.getLokaalNummer()
        )
    }
}
