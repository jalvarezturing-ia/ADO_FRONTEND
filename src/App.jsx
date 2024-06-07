import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const App = () => {
  const shouldRedirect = true;
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const username = queryParams.get("username");
  const mail = queryParams.get("mail");
  const accessToken = queryParams.get("access_token");

  console.log(username);

  if (accessToken) {
    window.localStorage.setItem("access_token", accessToken);
    window.localStorage.setItem("username", username);
    //console.log("Token OKTA-> ", accessToken);
  }

  useEffect(() => {
    if (accessToken) {
      return navigate("/home");
    }
    return navigate("/login");
  }, [navigate, username]);

  return <div>Hola</div>;
};

export default App;
