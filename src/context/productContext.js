import { createContext, useContext, useState, useEffect } from "react";
import { collection, getDocs, getFirestore, addDoc,doc } from "firebase/firestore";
import { app } from "../config/firebase";
import { useValueAuth } from "./authContext";
const productContext = createContext();

function useValue() {
  return useContext(productContext);
}

function CustomProductContext({ children }) {
  const [products, setProducts] = useState([]);
  const [priceRange, setPriceRange] = useState(10000);
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [search,setSearch] = useState('')
  const [cart,setCart]=useState([])
  const db = getFirestore(app);
  const {authentication}= useValueAuth()

  useEffect(()=>{
    const fetchData=async ()=>{
      if(authentication){
        const cartDocRef = collection(db, "userCarts", authentication.userId,'myCart');
      const response = await getDocs(cartDocRef)
      response.forEach((doc)=>{
        setCart((prevCart)=>[...prevCart,doc.data()])
      })
      }
    }
    fetchData()
  },[authentication])


  useEffect(() => {
    (async function () {
      const querySnapshot = await getDocs(collection(db, "products"));
      let productData = [];
      querySnapshot.forEach((doc) => {
        if (
          doc.data().price <= priceRange &&
          (categoryFilter.length === 0 ||
            categoryFilter.includes(doc.data().category)) && (search==null || doc.data().name.toLowerCase().includes(search))
        ) {
          productData.push({...doc.data(),id:doc.id});
        }
      });
      setProducts([...productData]);
    })();
  }, [priceRange,categoryFilter,search]);

  const handleCheckbox = (checkboxName, value) => {
    setCategoryFilter((prevCategoryFilter) => {
      if (value) {
        return [...prevCategoryFilter, checkboxName];
      } else {
        return prevCategoryFilter.filter((item) => item !== checkboxName);
      }
    });
  };

  const inputSearch = (value)=>{
    setSearch(value)
  }

  const clearSearch = ()=>{
    setSearch('')
  }
  const handleRangeChange = (value) => {
    setPriceRange(value);
  };

  const handleAddToCart=async (product)=>{
    const cartDocRef = collection(db, "userCarts", authentication.userId,'myCart');
    await addDoc (cartDocRef,{...product,quantity:1})
  }

  return (
    <productContext.Provider
      value={{
        products,
        setProducts,search,
        priceRange,
        handleRangeChange,
        handleCheckbox,
        inputSearch,clearSearch,handleAddToCart
      }}
    >
      {children}
    </productContext.Provider>
  );
}

export { useValue };
export default CustomProductContext;
