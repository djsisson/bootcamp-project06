import Header from "./Components/Header/Header.jsx";
import Footer from "./Components/Footer/Footer.jsx";
import ViewPort from "./Components/ViewPort/ViewPort.jsx";
import Total from "./Components/Total/Total.jsx";
import Container from "./Components/Container/Container.jsx";
import { GameStateProvider } from "./Context/gameStateContext.jsx";
import "./App.css";

function App() {
  return (
    <div className="mainApp">
      <GameStateProvider>
        <Header />
        <Container type={"Upgrades"}/>
        <Container type={"Research"}/>
        <Container type={"Inventory"}/>
        <Container type={"Shop"}/>
        <ViewPort />
        <Total />
        <Footer />
      </GameStateProvider>
    </div>
  );
}

export default App;
