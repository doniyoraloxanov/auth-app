import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";

const App = () => {
  return (
    <>
      <Header />

      <main className="py-3 ">
        <Container>
          <Outlet />
        </Container>
      </main>
      <Footer />

      <ToastContainer />
    </>
  );
};

export default App;
