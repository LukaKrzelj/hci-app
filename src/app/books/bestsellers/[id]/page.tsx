import Link from "next/link";
import type { Product } from "../_lib/api";
import { ArrowLeft } from "lucide-react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Bestsellers",
};

type ProductProps = {
  params: { id: string };
};

async function getProduct(id: string): Promise<Product> {
  const data = await fetch(`https://jsonplaceholder.typicode.com/photos/${id}`);
  return data.json();
}

export default async function Product({ params }: ProductProps) {
  const post = await getProduct(params.id);
  const { id, title, imageUrl } = post;
  if (!id) {
    notFound();
  }
  return (
    <main className="flex min-h-screen flex-col items-center p-10">
      <article className="w-full max-w-2xl bg-white shadow-lg rounded-lg overflow-hidden p-6">
        <Link
          href="/bestsellers"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200 mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to all products
        </Link>
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 mb-4">
          Post {id}: {title}
        </h1>
        <Image src={imageUrl} alt={title} width={500} height={500} />
        <p>{imageUrl}</p>
      </article>
    </main>
  );
}
