import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { setTokens } from "./redux/slice/authSlice";
import { useDispatch } from "react-redux";
function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    const getAuthToken = async () => {
      const refreshToken = localStorage.getItem("refreshToken") || "";

      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_GLOBAL_URL}/api/admin/auth/refresh-token`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              token: refreshToken,
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Login failed");
        }

        const data = await response.json();

        const { accessToken } = data;

        dispatch(setTokens({ accessToken, refreshToken }));

      } catch (error) {
        console.log(error);
      }
    };

    getAuthToken();
  }, [dispatch]);

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
          <Route path="/" element={<LoginPage />} />
          <Route path="/dashboard/*" element={<DashboardPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
