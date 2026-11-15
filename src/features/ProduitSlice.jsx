import { createSlice } from "@reduxjs/toolkit";

const initialState = { produits: [
    {
      ref: 1,
      intitule: "Ordinateur",
      prix: 7500,
      categorie: "Informatique",
      photo: "https://placehold.co/100x80"
    },
    {
      ref: 2,
      intitule: "Telephone",
      prix: 3000,
      categorie: "Telephonie",
      photo: "https://placehold.co/100x80"
    }
  ], search : "",
    categorie: "Toutes",
 }

const ProduitSlice = createSlice({
    name:"produit", initialState,

    reducers: {
        addProduit: (state, action)=>{
            state.produits.push(action.payload)},

        deleteFromProduit: (state, action)=>{
            state.produits = state.produits.filter(p => p.ref !== action.payload)},
        
        updateProduit: (state, action)=>{
            const index = state.produits.findIndex(
                p=> p.ref === action.payload.ref)
                if(index !== -1){
                  state.produits[index] =action.payload
                } },
    
        searchProduit: (state, action)=>{
          state.search = action.payload},
        
        filterByCategory: (state, action)=>{
          state.categorie=action.payload}
        
        }})

export const {addProduit,deleteFromProduit,updateProduit,
  searchProduit,filterByCategory}=ProduitSlice.actions;

export default ProduitSlice.reducer;
