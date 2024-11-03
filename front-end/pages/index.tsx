import { useState } from 'react';
import UserService from '@/services/UserService';

export default function Home() {
    const [formData, setFormData] = useState({studentNumber: "", email: "", password: ""});
    const [success, setSuccess] = useState<boolean>(false);

    const handleChange = (event: any) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };
    const handleSubmit = async (_: any) => {
        UserService.createUser(formData).then((result) => setSuccess(result.status === 201));
    };
    return (
        <>
            <form className="flex flex-col items-center" action={handleSubmit}>
                <p className="my-5 text-3xl">Add user</p>
                <div className="grid grid-cols-2">
                    <div className="grid grid-rows-3 [&>*]:mt-2">
                        <label htmlFor="studentNumber" className="text-2xl">Student number: </label>
                        <label htmlFor="email" className="text-2xl">Email: </label>
                        <label htmlFor="password" className="text-2xl">Password: </label>
                    </div>
                    <div className="grid grid-rows-3 [&>*]:mt-2">
                        <input type="text" id="studentNumber" name="studentNumber" onChange={handleChange} value={formData.studentNumber} className="border-grey border-2" />
                        <input type="email" id="email" name="email" onChange={handleChange} value={formData.email} className="border-grey border-2" />
                        <input type="password" id="password" name="password" onChange={handleChange} value={formData.password} className="border-grey border-2" />
                    </div>
                </div>
                <button type="submit" className="mt-6">Submit</button>
                { success ? <p>Successfully added user</p> : <p></p> }
            </form>
        </>
    );
}
