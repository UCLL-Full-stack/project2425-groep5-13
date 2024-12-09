const getReservationsByUser = (userStudentNumber: string) => {

    const loggedInUser = sessionStorage.getItem("loggenInUser");
    const token = loggedInUser ? JSON.parse(loggedInUser).token : null;

    return fetch(process.env.NEXT_PUBLIC_API_URL + `/reservations/${userStudentNumber}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    })
}

const ReservationService = {
    getReservationsByUser
}