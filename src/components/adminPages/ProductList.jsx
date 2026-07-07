import React, { useEffect, useState } from 'react'
import { api } from '../../api';
import { useForm } from 'react-hook-form';

function ProductList() {
  const [products,setProducts]=useState(null);
  const [productId,setProductId]=useState(null);
  const [categories,setCategories]=useState(null);

const {handleSubmit,register,reset}= useForm();

// TO FETCH PRODUCTS
  const fetchProducts= async ()=>{
   
    try {
     const response= await api.get("/products")
     setProducts(response.data);
    } catch (error) {
      alert("something went wrong")
    }

  };

// TO FETCH CATEGORIES
const fetchCategories=async()=>{
try {
    const response=await api.get("/categories")
    setCategories(response.data._embedded.categories);
} catch (error) {
  alert("Something went wrong")
}
}

  useEffect(()=>{
    fetchProducts();
    fetchCategories();
  },[])

// DELETE PRODUCT
const deleteProduct= async(id)=>{
  const response=await api.delete(`/products/${id}`) //$ IS USED TO GET VALUE FROM VARIABLE
  fetchProducts();
  alert("Product Delete");
};

// UPDATE PRODUCT
const updateProduct= async(data)=>{
  console.log(data);
  try {
    const response= await api.put(`/products/${productId}`,data);

    if(data.productImage && data.productImage.length>0)
    {
      const formData=new FormData();
      formData.append("productImage",data.productImage[0])

      await api.post(`/products/upload-image/${productId}`,formData,{
        headers :{
          "Content-Type":"multipart/form-data"
        }
      })
    }
    alert("Product Updated");
    fetchProducts();
  } catch (error) {
    
  }
  
}

// TO ASSIGN CATEGORY TO PRODUCT
const assignCategory=async (productId,categoryId)=>{

  try {
   const response= await api.put(`/categories/${categoryId}/products/${productId}`)
    alert("Category Updated")
  } catch (error) {
    alert("Something Went Wrong")
  }
}

  return (
    <div>
      <h2>Total Products :{products && products.length}</h2>
{/* // UPDATE PRODUCT */}
{/* <!-- Modal --> */}
<div class="modal fade" id="exampleModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="staticBackdropLabel">Update Products</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
       <form action="" onSubmit={handleSubmit(updateProduct)}>
                <div class="mb-3">
                  <label for="exampleFormControlInput1" class="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="exampleFormControlInput1"
                    {...register("name")}
                  />
                </div>

                <div class="mb-3">
                  <label for="exampleFormControlInput1" class="form-label">
                    description
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="exampleFormControlInput1"
                     {...register("description")}
                  />
                </div>

                <div class="mb-3">
                  <label for="exampleFormControlInput1" class="form-label">
                    price
                  </label>
                  <input
                    type="number"
                    class="form-control"
                    id="exampleFormControlInput1"
                     {...register("price")}
                  />
                </div>

                 <div class="mb-3">
                  <label for="formFile" class="form-label">Image</label>
                  <input class="form-control" type="file" id="formFile" {...register("productImage")}/>
              </div>
                <input type="submit" className="btn btn-primary m-2" />
              </form>
      </div>
    </div>
  </div>
</div>


      {products ? 
      <div>
      <table class="table">
  <thead>
    <tr>
      <th scope="col">Id</th>
      <th scope="col">Name</th>
      <th scope="col">Description</th>
      <th scope="col">Price</th>
      <th scope="col">Category</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>

    {products.map(p=>
    <tr>
      <th scope="row">{p.id}</th>
      <td>{p.name}</td>
      <td>{p.description}</td>
      <td>{p.price}</td>
      <td>
        <div class="input-group mb-3">
        <select class="form-select" id="inputGroupSelect01"
         onChange={(e)=>assignCategory(p.id,e.target.value)}>
            <option selected>Select Category</option>
            { categories && categories.map(c=> 
            <option value={c.id}
            selected={p.category && p.category.id==c.id}>{c.id} {c.name}</option>) }
        </select>
</div>
      </td>
      <td>
         <button className='btn btn-success m-2' 
         data-bs-toggle="modal" data-bs-target="#exampleModal" 
         onClick={()=>{
          setProductId(p.id);
          reset({
            name:p.name,
            description:p.description,
            price:p.price,
          });
         }} >Update</button>
         <button className='btn btn-danger m-2' onClick={()=>deleteProduct(p.id)}>Delete</button>
      </td>
    </tr>)}

  </tbody>
</table>
      </div> 
      : <p>Loading.........</p>}
    </div>
  )
}

export default ProductList