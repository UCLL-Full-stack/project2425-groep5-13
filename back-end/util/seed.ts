// Execute: npx ts=node util/seed.ts

import {PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const main = async () => {

    console.log('reset data db ...');
    await prisma.reservation.deleteMany({});
    await prisma.studentAssociation.deleteMany({});
    await prisma.user.deleteMany({});
    await prisma.classroom.deleteMany({});

    console.log('data db resetted ...');

    console.log('seeding data db ...');
    await prisma.classroom.create({
        data: {
            campus: "Proximus",
            classroomNumber: "C102"
        }
    })
    await prisma.classroom.create({
        data: {
            campus: "Proximus",
            classroomNumber: "C202"
        }
    })
    await prisma.classroom.create({
        data: {
            campus: "Proximus",
            classroomNumber: "B102"
        }
    })
    const classroomGasthuisbergD105 = await prisma.classroom.create({
        data: {
            campus: "Gasthuisberg",
            classroomNumber: "D105"
        }
    })
    const userRemcoEvenepoel = await prisma.user.create({
        data: {
            studentNumber: "r0945821",
            email: ["RemcoEvenepoel.student@ucll.be"],
            password: "Remco1234"
        }
    })
    const userTomBoonen = await prisma.user.create({
        data: {
            studentNumber: "r0985321",
            email: ["TomBoonen.student@ucll.be"],
            password: "Tom1234"
        }
    })
    const reservationByRemcoEvenepoel = await prisma.reservation.create({
        data: {
            startTime: new Date("2025-10-01T10:00:00Z"),
            endTime: new Date("2025-10-01T11:00:00Z"),
            classroom: {
                connect: {id: classroomGasthuisbergD105.id}
            },
            user: {
                connect: {id: userTomBoonen.id}
            }
        }
    })
    const reservationByTomBoonen = await prisma.reservation.create({
        data: {
            startTime: new Date("2025-10-01T11:00:00Z"),
            endTime: new Date("2025-10-01T11:30:00Z"),
            classroom: {
                connect: {id: classroomGasthuisbergD105.id}
            },
            user: {
                connect: {id: userRemcoEvenepoel.id}
            }
        }
    })
    const studentAssociationUlyssis = await prisma.studentAssociation.create({
        data: {
            kboNumber: "0123.456.789",
            name: "Ulyssis",
            users: {
                connect: [{ id: userRemcoEvenepoel.id }, { id: userTomBoonen.id }]
            }
        }
    })    
};

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
