import React from "react";
import styles from "./homepage.module.css";
import { useValue } from "../../context/productContext";
import { useValueAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
function Homepage() {
  const { products,priceRange,handleRangeChange,handleCheckbox,inputSearch,search,clearSearch,handleAddToCart } = useValue();
  const {authentication} = useValueAuth()
  const navigate = useNavigate()
  const handleAddProductCart=(product)=>{
      if(authentication){
        handleAddToCart(product)
      }else{
        navigate('/sign-in')
      }
        
  }

  return (
    <>
      <div className={styles.container}>
        <aside className={styles.asideContainer}>
          <h2>Filter</h2>
          <form>
            <label for="price">Price: {priceRange}</label>
            <br/>
            <input
              type="range"
              min="0"
              max="10000"
              id="price"
              name="price"
              step="10"
              onChange={(e)=>handleRangeChange(e.target.value)}
              value={priceRange}
            />
            <h2>Category</h2>
            <div className={styles.categoryFilter}>
              <div>
                <input type="checkbox" name="mensClothing" id="mensClothing" onChange={(e)=>handleCheckbox("Men's Clothing",e.target.checked)}/>
                <label for="mensClothing">Men's Clothing</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  name="womensClothing"
                  id="womensClothing" onChange={(e)=>handleCheckbox("Women's Clothing",e.target.checked)}
                />
                <label for="womensClothing">Women's Clothing</label>
              </div>
              <div>
                <input type="checkbox" name="electronics" id="electronics" onChange={(e)=>handleCheckbox("Electronics",e.target.checked)}/>
                <label for="electronics">Electronics</label>
              </div>
              <div>
                <input type="checkbox" name="jewelery" id="jewelery" onChange={(e)=>handleCheckbox("Jewelery",e.target.checked)}/>
                <label for="jewelery">Jewelery</label>
              </div>
            </div>
          </form>
        </aside>
        <div className={styles.mainContainer}>
          <div>
            <input type="text" placeholder="Search By Name" onChange={(e)=>inputSearch(e.target.value)} value={search}/>
            {search&& <label onClick={clearSearch}>X</label>}
          </div>
          <div className={styles.productContainer}>
            {products.map((item) => {
              return (
                <div className={styles.cardContainer}>
                  <img src={item.url} alt={item.name} />
                  <p>{item.name}</p>

                  <h2>&#8377; {item.price}</h2>
                  <button onClick={()=>handleAddProductCart(item)}>Add to cart</button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Homepage;
