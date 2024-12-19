type PagingInfo = {
    _start?: number;
    _limit?: number;
  };
  
  export type Product = {
    albumId: number;
    id: number;
    title: string;
    imageUrl: string;
  };
  
  async function getProductsCount(): Promise<number> {
    // Fetch the total count of products from your API
    const response = await fetch('https://jsonplaceholder.typicode.com/photos/?_limit=');
    const data = await response.json();
    return data.length; // Return the length of the array
  }
  
  async function getProducts({ _start, _limit }: PagingInfo): Promise<Product[]> {
    // Fetch the products from your API with pagination
    const response = await fetch(`https://jsonplaceholder.typicode.com/photos?_start=${_start}&_limit=${_limit}`);
    const data = await response.json();
    return data.map((item: { albumId: number; id: number; title: string; url: string }) => ({
      albumId: item.albumId,
      id: item.id,
      title: item.title,
      imageUrl: item.url, // Assuming 'url' is the correct field for the image URL
    }));
  }
  
  export { getProducts, getProductsCount };