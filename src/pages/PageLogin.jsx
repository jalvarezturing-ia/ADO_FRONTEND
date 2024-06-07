import { useNavigate } from "react-router-dom";

const PageLogin = () => {
  const navigate = useNavigate();
  const handleClicCreateSesion = () => {
    // const backUrl = process.env.BACK_OKTA;
    window.location.href = "http://localhost:3000/api/v1/login";
  };

  return (
    <div>
      <h1>Inicio de sesión</h1>
      <button onClick={handleClicCreateSesion}>Iniciar sesión</button>
    </div>
  );
};

export default PageLogin;
