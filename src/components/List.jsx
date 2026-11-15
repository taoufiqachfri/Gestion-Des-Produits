import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteFromProduit, searchProduit, filterByCategory } from "../features/ProduitSlice";
import { addToCart } from "../features/PanierSlice";

const List = () => {
    const dispatch = useDispatch();
    const { produits, search, categorie } = useSelector(state => state.produit);

    const handleDelete = (ref) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            dispatch(deleteFromProduit(ref));
        }
    };

    const prodSearchs = produits.filter(
        p => p.intitule.toLowerCase().includes(search.toLowerCase())
    );

    const prodFilters = prodSearchs.filter(
        p => categorie === "Toutes" || p.categorie === categorie
    );

    const categories = [...new Set(produits.map(p => p.categorie))];
    
    return (
        <div className="container">
            <div className="d-flex justify-content-between mb-4 align-items-center">
                <h2 className="text-primary">Liste des produits</h2>
                <Link to="/add" className="btn btn-success">+ Ajouter un produit</Link>
            </div>

            {/* Recherche et filtre */}
            <div className="card shadow-sm mb-4">
                <div className="card-body">
                    <div className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Rechercher un produit</label>
                            <input 
                                type="text" 
                                value={search} 
                                placeholder="Entrer l'intitulé..." 
                                className="form-control" 
                                onChange={(e) => dispatch(searchProduit(e.target.value))}
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">Filtrer par catégorie</label>
                            <select 
                                value={categorie} 
                                onChange={(e) => dispatch(filterByCategory(e.target.value))} 
                                className="form-select"
                            >
                                <option value="Toutes">Toutes les catégories</option>
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tableau des produits (Card w Card-body mrakbin mzyan) */} 
            <div className="card shadow mb-4">
                <div className="card-header bg-primary text-white">
                    <h5 className="mb-0">Produits disponibles</h5>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered table-hover table-striped align-middle text-center mb-0">
                            <thead className="table-dark">
                                <tr>
                                    <th>Référence</th>
                                    <th>Intitulé</th>
                                    <th>Prix</th>
                                    <th>Catégorie</th>
                                    <th>Photo</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {prodFilters.length > 0 ? (
                                    prodFilters.map(p => (
                                        <tr key={p.ref}>
                                            <td>{p.ref}</td>
                                            <td>{p.intitule}</td>
                                            <td>{p.prix} DH</td>
                                            <td><span className="badge bg-info text-dark">{p.categorie}</span></td>
                                            <td>
                                                <img 
                                                    src={p.photo} 
                                                    alt={p.intitule} 
                                                    className="img-thumbnail" 
                                                    style={{ width: "80px", height: "60px", objectFit: "contain" }}
                                                />
                                            </td>
                                            <td>
                                                <div className="d-flex justify-content-center gap-2">
                                                    <Link className="btn btn-warning btn-sm" to={`/edit/${p.ref}`}>Modifier</Link>
                                                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(p.ref)}>Supprimer</button>
                                                    <button className="btn btn-success btn-sm" onClick={() => dispatch(addToCart(p))}>Ajouter au panier</button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td className="text-danger py-4" colSpan="6">Aucun produit trouvé !</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    
                    <div className="text-end mt-3">
                        <span className="badge bg-primary fs-6">
                            Nombre de produits : {prodFilters.length}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default List;