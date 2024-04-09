import { useLocalStorage } from "@/common/hooks/useStorage";
import { IProduct } from "@/common/types/product";
import { getAllproducts } from "@/services/product"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios";
import { Link } from "react-router-dom";
type ProductListProps = {
  featured?: boolean;
  data:IProduct[],
}
const ProductList = ({featured,data}: ProductListProps) => {
      const queryClient = useQueryClient();
      const [user] = useLocalStorage("user",{});
      const userId = user?.user?._id;
      const {data: products, isLoading, isError} = useQuery({
    queryKey: ['PRODUCT_KEY'],
    queryFn: getAllproducts,
  });
  const {mutate} = useMutation({
    mutationFn: async({productId, quantity}: {productId: string, quantity: number}) =>{
      const {data} = await axios.post(`http://localhost:8080/api/v1/cart/add-to-cart`,{
        userId,
        productId,
        quantity,
      })
      return data;
    },
    onSuccess: ()=>{
      queryClient.invalidateQueries({
        queryKey: ["cart",userId]
      })
    }
  })

  const filteredProducts = featured?  products?.filter((product: IProduct)=> product?.featured == featured) : data ? data : products;
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error</p>;
  return (
   
        <div className="product-list">
            {filteredProducts?.map((product: IProduct,index: number)=>{
              return (
                <div key={index} className="product-item">
            <div className="product-image">
              <img src={product?.image} alt="#" className="product__thumbnail" />
              <span className="product-sale">{product?.discount}%</span>
            </div>
            <div className="product-info">
              <h3 className="product__name">
                <a href="#" className="product__link">{product?.name}</a>
              </h3>
              <a href="#" className="product__category">Stylish cafe chair</a>
              <div className="product-price">
                <span className="product-price__new">{product?.price - product?.price * (product?.discount /100)}</span>
                <span className="product-price__old">{product?.price}</span>
              </div>
            </div>
            <div className="product-actions">
              <Link to ={`/products/${product._id}`} className="btn product-action__quickview">Quick View</Link>
              <button className="btn product-action__addtocart" onClick={()=> mutate({productId: product._id, quantity: 1})} >Add To Cart</button>
              <div className="product-actions-more">
                <span className="product-action__share">Share</span>
                <span className="product-action__compare">Compare</span>
                <span className="product-action__like">Like</span>
              </div>
            </div>
          </div>
              )
            })}
          
          {/*End .product-item*/}
        </div>

  )
}

export default ProductList