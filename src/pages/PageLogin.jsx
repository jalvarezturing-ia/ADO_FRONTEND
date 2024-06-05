import { useNavigate } from "react-router-dom";

const PageLogin = () => {
    const navigate = useNavigate();
  const handleClicCreateSesion = () => {
    const dataUser = {
      Username: "Juanito",
      Email: "example@gmail.com",
    };
      localStorage.setItem("userToken", JSON.stringify(dataUser));
      return navigate("/");
  };

  return (
    <div>
      <h1>Inicio de sesión</h1>
      <button onClick={handleClicCreateSesion}>Iniciar sesión</button>
    </div>
  );
};

export default PageLogin;
