export class Vereniging{
    private kboNummer: number;
    private name: string;

    constructor(vereniging: { kboNummer: number; name: string}){
        this.kboNummer = vereniging.kboNummer
        this.name = vereniging.name;
    }

    getKboNummer(): number {
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