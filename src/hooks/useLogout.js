import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { clearTokens } from "../redux/slice/authSlice";
import { clearUser } from "../redux/slice/userSlice";

const useLogout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const username = useSelector((state) => state.user.username);

  const logout = async (e) => {
    e.preventDefault()
    dispatch(clearTokens());
    localStorage.removeItem("refreshToken");
    sessionStorage.removeItem("refreshToken");
    toast.success(`${username} logged out successfully.`);
    localStorage.removeItem("username");
    sessionStorage.removeItem("username");
    dispatch(clearUser());
    navigate("/");
  };


  return logout;
};

export default useLogout;
