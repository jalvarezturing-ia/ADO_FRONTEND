import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const App = () => {
  const navigate = useNavigate();
  let token = JSON.parse(localStorage.getItem("userToken"));

  useEffect(() => {
    if (token) {
      return navigate("/home");
    }
    return navigate("/login");
  }, [navigate, token]);

  return <div>Hola</div>;
};

export default App;
