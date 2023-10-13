import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { selectIsLoggedIn ,selectEmail} from '../../redux/slice/authSlice'
import "./addProduct.scss"
import { storage,db } from '../../firebase/config'
import { getDownloadURL,ref,uploadBytes } from 'firebase/storage'
import { addDoc,collection } from 'firebase/firestore'


const AddProduct = () => {

    const [productTitle, setProductTitle] = useState("")
    const [productType, setProductType] = useState(" ")
    const [description, setDescription] = useState("")
    const [customerSupport, setCustomerSuppport] = useState("")
    const [brand, setBrand] = useState("")
    const [price, setPrice] = useState("")
    const [warranty, setWarranty ]= useState("")
    const [productImage, setProductImage ]= useState("")


    //handle image
    const types=['image/jpg','image/jpeg','image/png','image/PNG']
    const handleProductImage=(e)=>{
        e.preventDefault()
        let selectedFile= e.target.files[0];

        if(selectedFile){
            if(selectedFile && types.includes(selectedFile.type)){
                setProductImage(selectedFile)
            }else{
                setProductImage(null)
                toast.error("please select valid image type")
            }

        }else{
            toast.error("select file")
        }

    }


    //add product
    const handleAddProduct=(e)=>{
        e.preventDefault();
        const storageRef = ref(storage,`products-images${productType.toUpperCase()}/${Date.now()}`)
        uploadBytes(storageRef,productImage)
        .then(()=>{
            getDownloadURL(storageRef).then(url=>{
                addDoc(collection(db,`products-${productType.toUpperCase()}`),{
                    productTitle,
                    productType,
                    description,
                    brand,
                    customerSupport,
                    price,
                    warranty,
                    productImage:url,

                })
            })
        })
    }

    //current user
    const isLoggedIn=useSelector(selectIsLoggedIn);
    const email= useSelector(selectEmail)


  return (
    <div>
        {isLoggedIn && email==="chiragsharma1676@gmail.com"?
        <div className='addprod-container'>
            <form className='addprod-form' onSubmit={handleAddProduct}>
                <h2>Add Product</h2>
                <lable>Product Title</lable>
                <input type="text" value={productTitle} placeholder="Product Title" 
                onChange={(e)=>{
                    setProductTitle(e.target.value)
                }} />

                <lable>Product Type</lable>
                <input type="text"  value={productType}  placeholder="Product Type" onChange={(e)=>setProductType(e.target.value)} />

                <lable>Brand Name</lable>
                <input type="text"  value={brand} placeholder="Brand Name" 
                onChange={(e)=>setBrand(e.target.value)} />

                <lable>Warranty</lable>
                <input type="text" value={warranty} placeholder="Warranty" onChange={(e)=>setWarranty(e.target.value)} />

                <lable>Image</lable>
                <input type="file"   placeholder="Image" 
                onChange={handleProductImage} />

                <lable>Description</lable>
                <textarea value={description}  placeholder="Description" 
                onChange={(e)=>setDescription(e.target.value)} />

                <lable>Price</lable>
                <input   type="text"  value={price} placeholder="Enter amount without tax" 
                onChange={(e)=>setPrice(e.target.value)} />

                <lable>Customer Suppport</lable>
                <input type="text"  value={customerSupport} placeholder="Customer support email,phone or address" 
                onChange={(e)=>setCustomerSuppport(e.target.value)} />

                <button type='submit'>ADD</button>
            </form>
        </div> : <div>You dont have access to add product</div>}
    </div>
  )
}

export default AddProduct
