import React, { useEffect, useState } from "react";
import { api } from "../../api";

function Products() {
  const [products, setProducts] = useState(null);
  const [categories,setCategories] = useState(null);

  const fetchProducts = async () => {
    try {
      const response = await api.get("/products");
      setProducts(response.data);
    } catch (error) {}
  };

  const fetchProductsBasedOnCategory= async(categoryId)=>
  {
      try {
       const response= await api.get(`categories/${categoryId}/products`)
       setProducts(response.data);
       
      } catch (error) {
        console.log(error);
        
      }
  }

  const fetchCategories =async ()=>{
    try {
        const response=await api.get("/categories");
        setCategories(response.data._embedded.categories);
    } catch (error) {}
  }

  const addToCart = async (productId)=>{
     try {
      const response=await api.post(`/cart/${productId}`,{quantity:1});
     console.log("Add To Cart",response);
     alert("Product Added Into Cart");
     } catch (error) {
      alert("Something Went Wrong")
     }
     

  }

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  return (
    <div>

      {/* // Categories */}
        {categories ? 
        categories.map(c=><button className="btn btn-danger m-2" 
        onClick={()=>fetchProductsBasedOnCategory(c.id)}>{c.name}</button> ) : <p>Loading......</p>}

           <button className="btn btn-danger m-2" 
        onClick={()=>fetchProducts()}>All Products</button>

      {/* // Products */}
      {products ? (
        <div className="row row-cols-1 row-cols-md-4 g-4">
          {products.map((p) => (
            <div class="col">
              <div class="card">
                <img
                  src={`http://localhost:8080/products/get-image/${p.id}`}
                  class="card-img-top"
                  alt="..."
                />
                <div class="card-body">
                  <h5 class="card-title">{p.name}</h5>
                  <p class="card-text">{p.description}</p>

                  <p class="card-text">Price :{p.price}</p>
                  <button className="btn btn-primary m-3" onClick={()=>addToCart(p.id)}> ADD to cart </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading.......</p>
      )}
    </div>
  );
}

export default Products;
