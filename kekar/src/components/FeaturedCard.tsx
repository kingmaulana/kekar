"use client"
import ProductCard from './ProductCard'
import { Products } from '@/types'

export default function FeaturedCard({products} : {products: Products[]}) {

    // const [products, setProducts] = useState<Products[]>([]);

    // useEffect(() => {
    //     async function fetchProducts() {
    //         try {
    //             const response = await fetch(`processe.env.NEXT_PUBLIC_BASE_URL/api/products?page=1&limit=5`);
    //             const data: Products[] = await response.json();
    //             setProducts(data);
    //         } catch (error) {
    //             console.log("Effor fetching products:", error)
    //         }
    //     }

    //     fetchProducts()
    // }, [])


    return (
        <div className='flex gap-5'>
            {
                products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                ))
            }
        </div>
    )
}
