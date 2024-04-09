import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import ProductList from '../../_components/ProductList'

const CategoryDetail = () => {
    const { id } = useParams()
    const { data, isLoading } = useQuery({
        queryKey: ['CATEGORY_DETAIL', id],
        queryFn: async () => {
            const { data } = await axios.get(`http://localhost:8080/api/v1/category/${id}`)
            return data
        }
    })
    if (isLoading) return <p>Loading...</p>
    return (
        <div>
            <section className='news'>
                <div className='container'>
                    <div className='section-heading'>
                        <h2 className='section-heading__title'>Danh mục : {data.categories.name}</h2>
                    </div>
                    <ProductList products={data.products} />
                </div>
            </section>
        </div>
    )
}

export default CategoryDetail