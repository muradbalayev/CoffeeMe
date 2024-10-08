import './Login.css'
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import useLogin from '../../hooks/useLogin';
function LoginPage() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [type, setType] = useState(false)
    const [rememberMe, setRememberMe] = useState(false);

  
    const login = useLogin(); 

    const handleLogin = (e) => {
        e.preventDefault();
        login(username, password, rememberMe);
    };
    
    return (
        <div className="loginpage w-full h-screen flex items-center justify-center flex-col">
            <h1 className="text-white text-2xl font-semibold">COFFEEME</h1>
            <h1 className="text-white text-2xl font-semibold mb-10">ADMIN</h1>
            <form className=" flex flex-col items-center" onSubmit={handleLogin}>
                <div className="flex flex-col gap-1 mt-3 w-80">
                    <label className="text-white text-sm">Username</label>
                    <input
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="p-2 w-full text-white outline-none text-sm rounded-lg bg-transparent border border-white" placeholder="Enter username" />
                </div>
                <div className="flex flex-col gap-1 mt-3 w-80">
                    <label className="text-white text-sm">Password</label>
                    <div className="relative">
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type={type ? "text" : "password"}
                            required
                            className="p-2 w-full text-white outline-none text-sm rounded-lg bg-transparent border border-white" placeholder="Enter password" />

                        <span className='eye_icon absolute text-white' onClick={() => setType(!type)}>
                            {type ? <Eye size={20} /> : <EyeOff size={20} />}
                        </span>
                    </div>
                </div>
                <div className="w-full flex gap-2 items-center font-medium text-white text-sm mt-2">
                    <p>Remember me</p>

                    <input
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        type="checkbox" className="hidden" />

                    <div className="checkbox-wrapper-31" onClick={() => setRememberMe(!rememberMe)}>
                        <input type="checkbox" />
                        <svg viewBox="0 0 35.6 35.6">
                            <circle className="background" cx="17.8" cy="17.8" r="17.8"></circle>
                            <circle className="stroke" cx="17.8" cy="17.8" r="14.37"></circle>
                            <polyline className="check" points="11.78 18.12 15.55 22.23 25.17 12.87"></polyline>
                        </svg>
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