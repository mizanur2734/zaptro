import axios from "axios";
import { createContext, useState, useEffect, useContext } from "react";

export const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);

  // fetching all products from api
  const fetchAllProducts = async () => {
    try {
      const res = await axios.get("/products_100.json"); // ✅ public লিখবে না
      console.log(res.data);
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // ✅ first render এ call করো
  useEffect(() => {
    fetchAllProducts();
  }, []);

  return (
    <DataContext.Provider value={{ data, setData, fetchAllProducts }}>
      {children}
    </DataContext.Provider>
  );
};

export const getData = () => useContext(DataContext)
