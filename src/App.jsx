import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const App = () => {
  const navigate = useNavigate();

  // obtener los query params
  // guardarlos en el local storage
  let ejTok = "12345";

  if (ejTok) {
    window.localStorage.setItem("userToken", ejTok);
  }

  useEffect(() => {
    if (ejTok) {
      return navigate("/home");
    }
    return navigate("/login");
  }, [navigate, ejTok]);

  return <div>Hola</div>;
};

export default App;
