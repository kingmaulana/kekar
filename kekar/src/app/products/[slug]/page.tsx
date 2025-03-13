/* eslint-disable @typescript-eslint/no-unused-vars */

import { Products } from '@/types'
import React from 'react'


import type { Metadata, ResolvingMetadata } from 'next'
import DetailProductCard from '@/components/DetailProductCard'
 
type Props = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}
 
export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const slug = (await params).slug
 
  // fetch data
  const product: Products = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${slug}`).then((res) => res.json())
 
  // console.log("🚀 ~ product:", product)
  // optionally access and extend (rather than replace) parent metadata

  return {
    title: `${product.name} | Kekar Abadi`,
    description: product.description,
    openGraph: {
      images: [product.thumbnail],
    },
  }
}

export default async function Page({
  params,
}: Readonly<{
  params: Promise<{ slug: string }>
}>) {
  const slug = (await params).slug
  // const data = await fetch(`http://localhost:3001/products/${id}`) //cara fetch data dengan id
  const data = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${slug}`)
  const product: Products = await data.json()

  if (product == undefined) {
    return <div>Product not found</div>
  }

  return (
  <div className="flex justify-center items-center min-h-screen">
      <DetailProductCard product={product} />
  </div>
)}
