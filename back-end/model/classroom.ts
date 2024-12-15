import { Classroom as ClassroomPrisma } from '@prisma/client';
export class Classroom {
    readonly id?: number;
    readonly campus: string;
    readonly classroomNumber: string;

    constructor(classroom: { id?: number; campus: string; classroomNumber: string }) {
        this.validate(classroom);

        this.id = classroom.id;
        this.campus = classroom.campus;
        this.classroomNumber = classroom.classroomNumber;
    }

    validate(classroom: { campus: string; classroomNumber: string }) {
        if (!classroom.campus) {
            throw new Error('Campus is required');
        }
        if (!classroom.classroomNumber) {
            throw new Error('Classroom number is required');
        }
    }

    static from({ id, campus, classroomNumber }: ClassroomPrisma) {
        return new Classroom({
            id,
            campus,
            classroomNumber,
        });
    }

    getId(): number | undefined {
        return this.id;
    }

    getCampus(): string {
        return this.campus;
    }

    getClassroomNumber(): string {
        return this.classroomNumber;
    }

    equal(classroom: Classroom): boolean {
        return (
            this.id === classroom.getId() &&
            this.campus === classroom.getCampus() &&
            this.classroomNumber === classroom.getClassroomNumber()
        );
    }
}
