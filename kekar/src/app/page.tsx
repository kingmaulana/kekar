import BannerSection from "@/components/BannerSection";
import FeaturedCard from "@/components/FeaturedCard";
import { Products } from "@/types";
import Link from "next/link";
export const dynamic = "force-dynamic"

async function fetchProducts() {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products?page=1&limit=5`, {
            cache: "no-store", // Ensure fresh data on each request
        });
        return res.json();
    } catch (error) {
        console.error("Error fetching products:", error);
        return [];
    }
}

export default async function Home() {
    const products: Products[] = await fetchProducts(); // Fetch data before rendering

    return (
        <main className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white">
            {/* Banner Section */}
            <BannerSection />

            {/* Product Highlights */}
            <section className="py-20 px-4 bg-gray-800/30">
                <div className="container mx-auto max-w-6xl flex flex-col">
                    <h2 className="text-4xl font-bold text-center mb-16">Featured Products</h2>
                    <div className="flex place-content-end mb-5">
                        <Link 
                            href={'/products'}
                            className="block text-center text-sm bg-white font-medium px-5 rounded-full text-red-800 hover:text-red-600 transition duration-300"
                        >
                            See All &gt;
                        </Link>
                    </div>
                    <div>
                        <FeaturedCard products={products}/>
                    </div>
                </div>
            </section>
        </main>
    );
}
