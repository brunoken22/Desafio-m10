import useSWR from 'swr';

export function destacados(id: string) {
  const fetcher = async (para: any) => {
    console.log(para);

    const response = await fetch('https://desafio-m9-two.vercel.app/api/products?id=' + id);
    const data = await response.json();
    return data;
  };
  console.log(id);

  const { data, error } = useSWR('/api/products', fetcher);

  return data;
}
