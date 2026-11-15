import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProduitForm from "./components/ProduitForm";
import List from "./components/List";
import Cart from "./components/Cart";
import Navbar from "./components/Navbar";

const App =()=>{

  return(
    <BrowserRouter>

    <Navbar />

    <div className="container mt-4">

      <Routes>

        <Route path="/" element={<List />} />

        <Route path="/produits" element={<List />} />

        <Route path="/add" element={<ProduitForm />} />

        <Route path="/edit/:id" element={<ProduitForm />} />

        <Route path="/cart" element={<Cart />} />

      </Routes>

    </div>

  </BrowserRouter>
  )

}
export default App