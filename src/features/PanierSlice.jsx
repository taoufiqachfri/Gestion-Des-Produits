import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    items:[]}

const PanierSlice = createSlice({
    name:"panier", initialState,
    reducers:{

addToCart : (state, action)=>{
    const produit = state.items.find(
        p=>p.ref === action.payload.ref)
        if(produit){
            produit.quantite +=1}
        else{
         state.items.push({...action.payload, quantite : 1});}
},


removeFromCart :(state, action)=>{
    state.items = state.items.filter(
        p=>p.ref !== action.payload)},


incrementQte:(state, action)=>{
    const produit = state.items.find(
        p=>p.ref === action.payload)
        if(produit){
            produit.quantite += 1}},

decrementQte:(state, action)=>{
    const produit = state.items.find(p => p.ref === action.payload);
    if(produit) {
        produit.quantite -= 1;
    }
    state.items = state.items.filter(p => p.quantite > 0);
},

clearCart:(state)=>{
    state.items=[]}}
})

export const {addToCart,removeFromCart,incrementQte,decrementQte,clearCart}= PanierSlice.actions;
export default PanierSlice.reducer;
