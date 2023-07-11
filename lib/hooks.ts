import useSWR from 'swr';
import useSWRImmutable from 'swr/immutable';
import { fetchAPI } from './api';

export function useMe() {
  const data = useSWR('/todos/1', fetchAPI);
  return data.data;
}

export function useProduct(productId: string) {
  const { data, error, isLoading } = useSWRImmutable(productId, fetchAPI);
  return data;
}

export function search(productId: string) {
  const { data, error, isLoading } = useSWRImmutable(productId, fetchAPI);
  return data;
}
