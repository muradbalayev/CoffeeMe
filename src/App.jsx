import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearTokens, setTokens } from "./redux/slice/authSlice";
import { clearUser, setUser } from "./redux/slice/userSlice";
import LoginPage from "./pages/Login/LoginPage";
import DashboardPage from "./pages/Router";
import ProtectedRoute from "./pages/ProtectedRoute/ProtectedRoute";
import { Toaster } from "react-hot-toast";
import "./App.scss";
import "./css/Loading.css";



function App() {
  return (
    <BrowserRouter>
      <div className="w-full h-screen relative">
        <Toaster
          containerClassName="toast"
          position="top-center"
          toastOptions={{
            duration: 3000,
            className: "custom-toast",
            style: {
              backgroundColor: "#fd0",
              fontWeight: "600",
              padding: "16px",
              color: "#214440",
            },
          }}
        />
        <AuthInitializer />
      </div>
    </BrowserRouter>
  );
}

function AuthInitializer() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { accessToken } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUsername = localStorage.getItem('username') || sessionStorage.getItem('username');
    if (storedUsername) {
      dispatch(setUser(storedUsername));
    }
  }, [dispatch]);

  useEffect(() => {
    const initializeAuth = async () => {
      const refreshToken = localStorage.getItem("refreshToken") || sessionStorage.getItem("refreshToken");

      if (refreshToken) {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_API_GLOBAL_URL}/api/admin/auth/refresh-token`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ token: refreshToken }),
            }
          );

          if (response.ok) {
            const data = await response.json();
            const { accessToken } = data;

            dispatch(setTokens({ accessToken, refreshToken }));
          } else {
            dispatch(clearTokens());
            dispatch(clearUser());
            localStorage.removeItem("refreshToken");
            sessionStorage.removeItem("refreshToken");
            localStorage.removeItem("username");
            sessionStorage.removeItem("username");
            navigate("/"); // Redirect to login page
          }
        } catch (error) {
          console.log("Token refresh failed:", error);
          dispatch(clearTokens());
          dispatch(clearUser());
          localStorage.removeItem("refreshToken");
          sessionStorage.removeItem("refreshToken");
          localStorage.removeItem("username");
          sessionStorage.removeItem("username");
          navigate("/"); // Redirect to login page
        }
      } else {
        dispatch(clearTokens());
        dispatch(clearUser());
        navigate("/"); // Redirect to login page
      }

      setLoading(false);
    };

    initializeAuth();
  }, [dispatch, navigate]);

  if (loading) {
    return (
      <div className="loader-container w-full flex justify-center items-center min-h-screen gap-3" >
        <div className="loader-1"></div>
        <div className="loader-2"></div>
        <div className="loader-3"></div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={accessToken ? <Navigate to="/dashboard" /> : <LoginPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard/*" element={<DashboardPage />} />
      </Route>
    </Routes>
  );
}

export default App;