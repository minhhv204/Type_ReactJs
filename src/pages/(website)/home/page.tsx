import { useProductQuery } from '@/common/hooks/useProductQuery'
import { IProduct } from '@/common/types/product'
import Banner from './_component/Banner'

import Shop from './_component/Shop'
import Blog from './_component/Blog'
import Services from './_component/Services'
import ProductList from '../product/_components/ProductList'

const HomePage = () => {
    const { data } = useProductQuery({ _limit: 10 })
    const featuredProducts = data?.data.filter((product: IProduct) => product.featured === false)
    console.log(featuredProducts);
    
    
    return (
        <>
            <Banner />
            <ProductList products={featuredProducts} />
            <div className='container'>
                <hr />
            </div>
            <Shop />
            <Blog />
            <Services />
        </>
    )
}

export default HomePage