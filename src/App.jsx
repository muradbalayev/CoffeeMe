import "./App.scss";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/Login/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { setTokens } from "./redux/slice/authSlice";
import { useDispatch, useSelector } from "react-redux";
import ProtectedRoute from "./pages/ProtectedRoute/ProtectedRoute";

function App() {
  const dispatch = useDispatch();
  const { accessToken } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);

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

                if (!response.ok) {
                    throw new Error("Failed to refresh token");
                }

                const data = await response.json();
                const { accessToken } = data;

                dispatch(setTokens({ accessToken, refreshToken }));
            } catch (error) {
                console.log("Token refresh failed:", error);
            }
        }

        setLoading(false); // Authentication check is done
    };

    initializeAuth();
}, [dispatch]);
  if (loading) {
    return <div>Loading...</div>; // Optional: Show a loader while checking authentication
  }

  return (
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
      <BrowserRouter>
        <Routes>
          <Route path="/" element={accessToken ? <Navigate to="/dashboard" /> : <LoginPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard/*" element={<DashboardPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;