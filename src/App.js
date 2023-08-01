import "./App.css";
import Routes from "./routes";
import Sidebar from "./components/Sidebar";

const App = () => {
  return (
    <>
      <div style={{ display: "flex" }}>
        <Sidebar />
        <Routes />
      </div>
    </>
  );
};

export default App;
