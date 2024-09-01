import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setTokens } from "../redux/slice/authSlice";
import { setUser } from "../redux/slice/userSlice";

const useLogin = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const login = async  (username, password, rememberMe) => {

        try {
            const response = await fetch(`${import.meta.env.VITE_API_GLOBAL_URL}/api/admin/auth`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    password,
                }),
            });

            if (!response.ok) {
                toast.error('Login failed');
                return;                
            }

            const data = await response.json();

            const { refreshToken, accessToken } = data;

            dispatch(setTokens({ accessToken, refreshToken }));
            dispatch(setUser( username ));

            if (rememberMe) {
                localStorage.setItem('refreshToken', refreshToken);
                localStorage.setItem('username', username);
            } else {
                sessionStorage.setItem('refreshToken', refreshToken);
                sessionStorage.setItem('username', username);
            }

            toast.success(`${username} logged in.`);
            navigate('/dashboard');
        } catch (error) {
            toast.error('Login failed');
            toast.error(error);
        }
    };
  return login
}

export default useLogin
