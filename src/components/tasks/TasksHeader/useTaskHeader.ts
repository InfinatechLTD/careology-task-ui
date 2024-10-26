import { useDispatch } from "react-redux";
import { clearToken } from "../../../features/auth/authSlice";

const useTaskHeader = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(clearToken());
  };

  return { handleLogout };
};

export default useTaskHeader;
