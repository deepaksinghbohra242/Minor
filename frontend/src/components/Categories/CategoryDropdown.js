import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Select from 'react-select'
import { fetchCategoriesAction } from "../../redux/slices/category/categorySlice";


const CategoryDropdown = (props) => {
    //dispatch action
    const dispatch =useDispatch();
    useEffect(() =>{
        dispatch(fetchCategoriesAction())
    },[dispatch])
    //select categories
    const category = useSelector(state => state?.category)
    const { categoryList ,appErr ,serverErr ,loading} = category;

    const allCategories = categoryList?.map(category =>{
        return {
            label : category?.title,
            value: category?._id,
        }
    })

    //handle change
    const handleChange = (value) =>{
        // console.log(props);
        props.onChange("category", value)
    }
    //handle blur
    const handleBlur = () =>{
        props.onBlur("category" ,true)
    }
  return (
    <>
        {loading ? (<h3 className='text-base text-green-600'>Product category list are loading please wait...</h3>):
    <Select
     onChange={handleChange}
     onBlur={handleBlur}
     id='category'
     value = {props?.value?.label}
     options={allCategories}/>}
     {/* display */}
     {props?.error && <div style={{color :'red' , marginTop : '0.5rem'}}>{props?.error}</div>}
    </>
  )
}

export default CategoryDropdown
