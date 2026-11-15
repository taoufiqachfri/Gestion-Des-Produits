import { configureStore } from "@reduxjs/toolkit";
import ProduitSlice from './ProduitSlice'
import PanierSlice from './PanierSlice'
const Store = configureStore({
    reducer : {
        produit : ProduitSlice,
        panier : PanierSlice
    }
})

export default Store;