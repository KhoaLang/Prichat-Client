import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Outlet } from "react-router-dom";
import { authService } from "../../services/AuthService";
import { getCurrentUser } from "../../stores/actions/AuthAction";

export function ProtectedRoute() {
  const { userInfo, authenticated } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = Boolean(
    localStorage.getItem(`${process.env.REACT_APP_TOKEN}`)
  );
  if (!isLoggedIn) {
    navigate("/auth");
  }
  useEffect(() => {
    if (!userInfo && isLoggedIn) {
      dispatch(getCurrentUser());
    }
  });

  useEffect(() => {
    navigate(`/chatroom/${userInfo?.id}`);
  }, [userInfo]);
  return <Outlet />;
}
