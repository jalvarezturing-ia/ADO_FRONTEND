import { useNavigate } from "react-router-dom";

const PageDashboardPDF = () => {
  const navigate = useNavigate();
  const handleclicDeleteSesion = () => {
    window.localStorage.removeItem("userToken");
    return navigate("/");
  };
  return (
    <div>
      <h1>Bienvenido a la pagina principal PDFs</h1>
      <button onClick={handleclicDeleteSesion}>Salir</button>
    </div>
  );
};

export default PageDashboardPDF;
