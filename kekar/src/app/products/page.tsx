'use client'
// import AIRecommendation from '@/components/AIRecommendation'
import Search from '@/components/Search'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Products } from '@/types'
import React, { useEffect, useState } from 'react'
import ProductList from '@/components/ProductList'

export const dynamic = "force-dynamic"


export default function ProductsPage() {
    const [products, setProducts] = useState<Products[]>([]);
    const [searchResults, setSearchResults] = useState<Products[]>([]);
    const [loading, setLoading] = useState(true);
    const [isSearching, setIsSearching] = useState(false);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products?page=1&limit=6`);
                const data: Products[] = await response.json();
                setProducts(data);
                setHasMore(data.length === 6);
                setPage(1);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchProducts();
    }, [])

    const handleSearch = async (searchTerm: string) => {
        if (!searchTerm.trim()) {
            setSearchResults([]);
            return;
        }

        setIsSearching(true);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/search/${encodeURIComponent(searchTerm)}`);
            const data: Products[] = await response.json();
            setSearchResults(data);
        } catch (error) {
            console.error("Error searching products:", error);
            setSearchResults([]);
        } finally {
            setIsSearching(false);
        }
    };

    const fetchMoreData = async () => {
        try {
            const nextPage = page + 1;
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products?page=${nextPage}&limit=6`);
            const newData: Products[] = await response.json();
            if (newData.length === 0) {
                setHasMore(false);
                return;
            }
            setProducts([...products, ...newData]);
            setPage(nextPage);
            setHasMore(newData.length === 6);
        } catch (error) {
            console.error("Error fetching more products:", error);
            setHasMore(false);
        }
    };
    
    const renderContent = () => {
        if (isSearching) {
            return (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    <div className="col-span-full text-center py-8">Searching...</div>
                </div>
            );
        }

        if (searchResults.length > 0) {
            return (
                // <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                //     {searchResults.map((el) => (
                //         <div key={el.slug} className="transform transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                //             <ProductCard product={el} />
                //         </div>
                //     ))}
                // </div>
                <ProductList product={searchResults} />
            );
        }

        if (searchResults.length === 0 && !loading) {
            return (
                <InfiniteScroll
                    dataLength={products.length}
                    next={fetchMoreData}
                    hasMore={hasMore}
                    loader={<div className="col-span-full text-center py-8">Loading more products...</div>}
                >
                    {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {products.map((el) => (
                            <div key={el.slug} className="transform transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                                <ProductCard product={el} />
                            </div>
                        ))}
                    </div> */}
                    <ProductList product={products} />
                </InfiniteScroll>
            );
        }
        return null;
    };

    return (
        <div className='flex flex-col min-h-screen bg-white'>
            {/* Header Section */}
            <div className='w-full bg-red-800 py-8 px-4 sm:px-6 lg:px-8'>
                <div className='max-w-7xl mx-auto'>
                    <h1 className='text-3xl font-bold text-white mb-6'>Our Products</h1>
                    <div className='flex flex-col md:flex-row gap-4 items-center justify-between'>
                        <div className='w-full md:w-1/2'>
                            <Search onSearch={handleSearch} />
                        </div>
                        {/* <div className='flex gap-4'>
                            <select className='px-4 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black'>
                                <option>All Categories</option>
                                <option>Pre-Workout</option>
                                <option>Protein</option>
                                <option>Weight Loss</option>
                            </select>
                            <select className='px-4 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black'>
                                <option>Sort by</option>
                                <option>Price: Low to High</option>
                                <option>Price: High to Low</option>
                                <option>Newest</option>
                            </select>
                        </div> */}
                    </div>
                </div>
            </div>

            {/* AI Recommendation Section */}
            {/* <div className='bg-gray-50 py-4'>
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <AIRecommendation />
    </div>
    </div> */}

            {/* Products Grid */}
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
                {renderContent()}
            </div>

            {/* Pagination/Load More */}
            {/* <div className='mt-12 flex justify-center'>
        <button className='px-6 py-3 bg-black text-white font-semibold rounded-md hover:bg-gray-800 transition duration-300'>
        Load More Products
        </button>
    </div> */}
        </div>
  )
}
