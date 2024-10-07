import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authslice";
import { Outlet } from "react-router-dom";
import Header from "./component/Header/header";
import Footer from "./component/Footer/footer";

function App() {
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((user) => {
        if (user) {
          dispatch(login(user));
        } else {
          dispatch(logout(user));
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
      <div className="w-full block">
        <Header />
        <main>
          TODO: <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null;
}

export default App;
