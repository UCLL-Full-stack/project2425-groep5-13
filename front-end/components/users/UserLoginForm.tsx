import UserService from '@/services/UserService';
import { StatusMessage } from '@/types';
import { useRouter } from 'next/router';
import { useState } from 'react';

const UserLoginForm: React.FC = () => {
    const [studentNumber, setStudentNumber] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [studenNumberError, setStudentNumberError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [statusMessages, setStatusMessage] = useState<StatusMessage[]>([]);
    const router = useRouter();

    const clearErrors = () => {
        setStudentNumberError(null);
        setPasswordError(null);
        setStatusMessage([]);
    };

    const validate = (): boolean => {
        let result = true;

        if (!studentNumber && studentNumber.trim() === '') {
            setStudentNumberError('StudentNumber is required');
            result = false;
        }

        if (!password && password.trim() === '') {
            setPasswordError('Password is required');
            result = false;
        }

        return result;
    };

    const handleSubmit = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        clearErrors();

        if (!validate()) {
            return;
        }

        const user = { studentNumber: studentNumber, password };
        const response = await UserService.loginUser(user);

        if (response.status === 200) {
            setStatusMessage([
                {
                    message: `Login successful. Redirecting to homepage of ${studentNumber}`,
                    type: 'success',
                },
            ]);
            const user = await response.json();
            sessionStorage.setItem(
                'loggedInUser',
                JSON.stringify({
                    token: user.token,
                    id: user.id,
                    studentNumber: user.studentNumber,
                    role: user.role,
                })
            );

            setTimeout(() => {
                router.push('/');
            }, 2000);
        } else if (response.status === 401) {
            const { errorMessage } = await response.json();
            setStatusMessage([{ message: errorMessage, type: 'error' }]);
        } else {
            setStatusMessage([
                { message: 'An error has occurred. Please try again later.', type: 'error' },
            ]);
        }
    };
    return (
        <>
            <h3 className="px-0">Login</h3>
            {statusMessages && (
                <div className="row">
                    <ul className="list-none mb-3 mx-auto ">
                        {statusMessages.map(({ message, type }, index) => (
                            <li key={index}>{message}</li>
                        ))}
                    </ul>
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <label htmlFor="nameInput" className="block mb-2 text-sm font-medium">
                    Student number:
                </label>
                <div className="block mb-2 text-sm font-medium">
                    <input
                        id="nameInput"
                        type="text"
                        value={studentNumber}
                        onChange={(event) => setStudentNumber(event.target.value)}
                        className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue:500 block w-full p-2.5"
                    />
                    {studenNumberError && <p className="text-red-800">{studenNumberError}</p>}
                </div>

                <label htmlFor="passwordInput" className="block mb-2 text-sm font-medium">
                    Password:
                </label>
                <div className="block mb-2 text-sm font-medium">
                    <input
                        id="passwordInput"
                        type="text"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue:500 block w-full p-2.5"
                    />
                    {passwordError && <p className="text-red-800">{passwordError}</p>}
                </div>

                <button
                    className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    type="submit"
                >
                    Login
                </button>
            </form>
        </>
    );
};

export default UserLoginForm;
