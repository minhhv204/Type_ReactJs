import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import { Link } from 'react-router-dom'

const Categories = () => {
    const {data: category} = useQuery({
        queryKey: ["CATEGORY_LIST"],
        queryFn: async () =>{
          const {data} = await  axios.get("http://localhost:8080/api/v1/category");
          return data
        }
    })
    console.log(category);
    
  return (
    <section className="news">
    <div className="container">
      <div className="section-heading">
        <h2 className="section-heading__title">Category</h2>
      </div>
      <div>
        {category?.map((category:{_id?: number; name: string})=>(
            <div key={category._id}>
                <Link to={`/category/${category._id}`}><h3>{category.name}</h3></Link>
            </div>
        ))}
      </div>
    </div>
  </section>
  )
}

export default Categories