import "./App.css";
import Routes from "./routes";
import Sidebar from "./components/Sidebar";
import { SnackbarProvider } from "notistack";

const App = () => {
  return (
    <>
      <SnackbarProvider>
        <div style={{ display: "flex" }}>
          <Sidebar />
          <Routes />
        </div>
      </SnackbarProvider>
    </>
  );
};

export default App;
