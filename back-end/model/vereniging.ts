export class Vereniging{
    private kboNummer: string;
    private name: string;

    constructor(vereniging: { kboNummer: string; name: string}){
        this.kboNummer = vereniging.kboNummer
        this.name = vereniging.name;
    }

    getKboNummer(): string {
        return this.kboNummer
    }

    getName(): string {
        return this.name
    }

    equals(vereniging: Vereniging): boolean {
        return (
            this.kboNummer === vereniging.getKboNummer() &&
            this.name === vereniging.getName()
        )
    }
}