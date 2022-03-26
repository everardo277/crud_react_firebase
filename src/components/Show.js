import React, {useState, useEffect} from 'react'

import { Link } from 'react-router-dom'

import {collection, getDocs, getDoc, deleteDoc, doc} from 'firebase/firestore'
import { db } from '../firebaseConfig/firebase'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { async } from '@firebase/util'
const MySwal = withReactContent(Swal)

const Show = () => {

    //1 configuramos los hooks

    const [products, setProducts] = useState([])

    //2 referenciamos a la DB firestore
    const productsCollection = collection(db, "products")

    //3 Funcion para mostrar todos los documentos

    const getProducts = async () =>{

     const data = await  getDocs(productsCollection)
        //console.log(data.docs)

        setProducts(
            data.docs.map((doc) => ({...doc.data(),id:doc.id}))
        )

        //console.log(products)
    }

    //4 funcion para eliinar un documento

    const deleteProduct = async(id) => {

       const productDoc=  doc(db, 'products', id)
       await deleteDoc(productDoc)
       getProducts()

    }

    // 5 funcion e confirmacion de Swet Alert

    const confirmDelete = (id) => {

      MySwal.fire({
        title: '¿Quieres Remover el  producto?',
        text: 'Tu quieres borrar esto',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3055d6',
        confirmButtonText: 'Si,  deseo borrarlo'
    
      }).then((result) => {

        if(result.isConfirmed){

          deleteProduct(id)
          Swal.fire(
            'Deleted!',
            'Tu archivo ha sido eliminado ',
            'success'

          )

        }
        
      })


    }

    //6 usamos useEfect

    useEffect(()=> {
        getProducts()
        // esLint-disable-next-Line

    }, [])

    //7 retornamos la vista de nuestro componente


  return (
    <>
      <div className='container'>

          <div className='row'>

              <div className='col'>
                    <div className='d-grid gap-2'>
                          <Link to="/create" className='btn btn-secondary mt-2 mb-2'>Create</Link>
                    </div>
                    <table className='table table-dark table-hover'>
                      <thead>
                        <tr>
                          <th>Description</th>
                          <th>Stock</th>
                          <th>Actions</th>
                        </tr>
                      </thead>

                      <tbody>
                        {products.map((product) =>(

                          <tr key={product.id}>
                            <td>{product.description}</td>
                            <td>{product.stock}</td>
                            <td>
                              <Link to={`/edit/${product.id}`} className="btn btn-light"><i className="fa-solid fa-pencil"></i></Link>
                              <button onClick={() => {confirmDelete(product.id)} } className="btn btn-danger"><i className='fa-solid fa-trash'></i></button>

                            </td>
                          </tr>
                        ))}

                      </tbody>

                    </table>
              </div>

          </div>

      </div>
    </>
  )
}

export default Show
