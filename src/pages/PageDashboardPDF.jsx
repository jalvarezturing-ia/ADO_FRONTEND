import { useNavigate } from "react-router-dom";

const PageDashboardPDF = () => {
  const navigate = useNavigate();

  const user = localStorage.getItem("username");
  const handleclicDeleteSesion = () => {
    window.localStorage.removeItem("access_token");
    window.localStorage.removeItem("username");
    return navigate("/");
  };
  return (
    <div>
      <h1>Bienvenido a la pagina principal {user}</h1>
      <button onClick={handleclicDeleteSesion}>Salir</button>
    </div>
  );
};

export default PageDashboardPDF;
