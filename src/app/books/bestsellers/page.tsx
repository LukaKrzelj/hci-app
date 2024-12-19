import type { Metadata } from "next";
import Link from "next/link";
import { getProducts, getProductsCount } from "./_lib/api";
import type { Product } from "./_lib/api";
import Pagination from "../_components/pagination";
import { Image } from "lucide-react";

type ProductsPageProps = {
  searchParams: { page: string };
};

const PAGE_SIZE = Number(process.env.PAGE_SIZE) || 6;

export const metadata: Metadata = {
  title: "Bestselling Books",
};

function processProduct(product: Product) {
  const { id, title, imageUrl } = product;
  const price = "$19.99";
  console.log(`Processing product: ${id}, Image URL: ${imageUrl}`); // Log product details
  return (
    <li key={id} className="mb-4">
      <Link
        href={`/products/${id}`}
        className="block p-6 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 transition-colors duration-200"
      >
        <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
          {title}
        </h2>
        <Image src={imageUrl} alt="Product image" width={200} height={200}/>
        <p className="mt-2 text-xl text-gray-700">{price}</p>
      </Link>
    </li>
  );
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const productsCount = await getProductsCount();
  const pagesCount = Math.ceil(productsCount / PAGE_SIZE);
  const currentPage = Math.min(
    /^[1-9][0-9]*$/.test(searchParams.page) ? Number(searchParams.page) : 1,
    pagesCount
  );
  const _start = (currentPage - 1) * PAGE_SIZE;
  const _limit = PAGE_SIZE;

  const products = await getProducts({ _start, _limit }) || [];
  console.log('Fetched products:', products); // Log fetched products
  return (
    <main className="flex min-h-screen max-w-3xl m-auto flex-col items-center p-10">
      <h1 className="text-6xl font-extrabold tracking-tight mb-10">Bestselling Books</h1>
      <Pagination currentPage={currentPage} pagesCount={pagesCount} />
      <ul className="w-full space-y-4">{products.map(processProduct)}</ul>
    </main>
  );
}