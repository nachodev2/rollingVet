import Error404 from "./components/pages/error404/Error404";
import Login from "./components/pages/loginRegistro/Login";
import Registro from "./components/pages/loginRegistro/Registro";
import './index.css'

function App() {
  return (
    <>
      <Login />
      <Error404 />
      <Registro />

    </>
  );
}

export default App;
