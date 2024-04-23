
import Header from "./Components/Header/Header.jsx"
import Footer from "./Components/Footer/Footer.jsx"
import Container from "./Components/Container/Container.jsx"
import ViewPort from "./Components/ViewPort/ViewPort.jsx"
import Total from "./Components/Total/Total.jsx"
import './App.css'

function App() {

  return (
    <div className="mainApp">
      <Header />
      <Container />
      <Container />
      <Container />
      <Container />
      <ViewPort />
      <Total />
      <Footer />
    </div>
  )
}

export default App
