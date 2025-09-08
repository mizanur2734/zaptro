import React, { useContext, useEffect } from 'react';
import { DataContext } from '../context/DataContext';

const Category = () => {
    const { data, fetchAllProducts } = useContext(DataContext);

    // get unique categories
    const getUniqueCategory = (data, property) => {
        let newVal = data?.map((curElem) => curElem[property]);
        newVal = [...new Set(newVal)];
        return newVal;
    }

    const cateGoryOnlyData = getUniqueCategory(data || [], "category");
    console.log(cateGoryOnlyData);

    useEffect(() => {
        fetchAllProducts();
    }, []);

    return (
        <div className='bg-[#101829]'>
            <div className='max-w-6xl mx-auto flex gap-4 items-center justify-around py-7 px-4'>
           {
             cateGoryOnlyData.map(((item, index) =>{
                return <div key={index}>
                    <button className='uppercase bg-gradient-to-r from-red-500 to-purple-500 text-white px-3 py-1 rounded-md cursor-pointer'>{item}</button>
                </div>
             }))
           }
        </div>
        </div>
    );
};

export default Category;
