-- CreateTable
CREATE TABLE "Classroom" (
    "id" SERIAL NOT NULL,
    "campus" TEXT NOT NULL,
    "classroomNumber" TEXT NOT NULL,

    CONSTRAINT "Classroom_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reservation" (
    "id" SERIAL NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "ClassroomId" INTEGER NOT NULL,
    "UserId" INTEGER NOT NULL,

    CONSTRAINT "Reservation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "studentNumber" TEXT NOT NULL,
    "email" TEXT[],
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentAssociation" (
    "id" SERIAL NOT NULL,
    "kboNumber" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "StudentAssociation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_StudentAssociationToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Classroom_campus_classroomNumber_key" ON "Classroom"("campus", "classroomNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Reservation_startTime_endTime_ClassroomId_key" ON "Reservation"("startTime", "endTime", "ClassroomId");

-- CreateIndex
CREATE UNIQUE INDEX "User_studentNumber_key" ON "User"("studentNumber");

-- CreateIndex
CREATE UNIQUE INDEX "StudentAssociation_kboNumber_key" ON "StudentAssociation"("kboNumber");

-- CreateIndex
CREATE UNIQUE INDEX "_StudentAssociationToUser_AB_unique" ON "_StudentAssociationToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_StudentAssociationToUser_B_index" ON "_StudentAssociationToUser"("B");

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_ClassroomId_fkey" FOREIGN KEY ("ClassroomId") REFERENCES "Classroom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_StudentAssociationToUser" ADD CONSTRAINT "_StudentAssociationToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "StudentAssociation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_StudentAssociationToUser" ADD CONSTRAINT "_StudentAssociationToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
