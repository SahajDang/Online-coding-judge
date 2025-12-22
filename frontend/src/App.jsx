import { Footer } from "./shared/components/Footer.jsx";
import {Header} from "./shared/components/Header.jsx";
import { AppRoutes } from "./shared/routes/AppRoutes";

const App = () => {
  return (
  <>
  <Header/>
  <AppRoutes />
  <Footer/>
  </>
  );
};

export default App;