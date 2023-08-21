import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppAuthContext } from "../contexts/AppAuthProvider";
import { socket } from "../../socket";

const UseLogout = () => {
  const navigate = useNavigate();
  const { setUserToken, setUserData } = useContext(AppAuthContext)

  useEffect(() => {
    setUserToken();
    setUserData();
    navigate('/signin', {replace: true});
    socket.disconnect()
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return null;
};

export default UseLogout;