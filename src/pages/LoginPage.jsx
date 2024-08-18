import { useNavigate } from "react-router-dom"
import { basic_eye } from 'react-icons-kit/linea/basic_eye';
import { basic_eye_closed } from 'react-icons-kit/linea/basic_eye_closed';
import Icon from "react-icons-kit";
import { useState } from "react";
function LoginPage() {

    const navigate = useNavigate()
    const [type, setType] = useState(false)


    const handleLogin = async (e) => {
        e.preventDefault();

        navigate('/dashboard')
    }



    return (
        <div className="loginpage w-full h-screen flex items-center justify-center flex-col">
            <h1 className="text-white text-2xl font-semibold mb-20">COFFEE SHOP</h1>
            <form className=" flex flex-col items-center" onSubmit={handleLogin}>
                <div className="flex flex-col gap-1 mt-3 w-80">
                    <label className="text-white text-sm">Username</label>
                    <input
                        required
                        className="p-2 w-full text-white outline-none text-sm rounded-lg bg-transparent border border-white" placeholder="Enter username" />
                </div>
                <div className="flex flex-col gap-1 mt-3 w-80">
                    <label className="text-white text-sm">Password</label>
                    <div className="relative">
                    <input
                        type={type ? "text" : "password"}
                        required
                        className="p-2 w-full text-white outline-none text-sm rounded-lg bg-transparent border border-white" placeholder="Enter password" />

                    <span className='eye_icon absolute text-white' onClick={() => setType(!type)}>
                        {type ? <Icon icon={basic_eye} size={20} /> : <Icon icon={basic_eye_closed} size={20} />}
                    </span>
                        </div>
                </div>
                <button
                    type="submit"
                    className="rounded-lg w-full p-2 border font-semibold text-white bg-transparent mt-6 flex justify-center text-center">
                    Login
                </button>

            </form>

        </div>
    )
}

export default LoginPage