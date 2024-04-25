import Header from "./Components/Header/Header.jsx";
import Footer from "./Components/Footer/Footer.jsx";
import Inventory from "./Components/Inventory/Inventory.jsx";
import Upgrades from "./Components/Upgrades/Upgrades.jsx";
import Research from "./Components/Research/Research.jsx";
import Shop from "./Components/Shop/Shop.jsx";
import ViewPort from "./Components/ViewPort/ViewPort.jsx";
import Total from "./Components/Total/Total.jsx";
import { GameStateProvider } from "./Context/gameStateContext.jsx";
import "./App.css";

function App() {
  return (
    <div className="mainApp">
      <GameStateProvider>
        <Header />
        <Upgrades />
        <Research />
        <Shop />
        <Inventory />
        <ViewPort />
        <Total />
        <Footer />
      </GameStateProvider>
    </div>
  );
}

export default App;
