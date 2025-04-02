import { useParams } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { products } from "../data";

const Product = () => {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) return <h1 className="text-center">Product not found</h1>;

  return (
    <div className="container mt-4">
      <div className="card p-4">
        <h1 className="card-title">{product.name}</h1>
        <p className="card-text">${product.price}</p>
        <button onClick={() => addToCart(product)} className="btn btn-success">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Product;
