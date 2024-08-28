import useSWR from 'swr';
import useSWRImmutable from 'swr/immutable';
import {fetchApiAuth} from './api';
type Order = {
  cantidad?: number;
};
export function useProduct(productId: any) {
  const api = '/api/products/' + productId;

  const {data, error, isLoading} = useSWRImmutable(
    productId ? [api, {}] : null,
    fetchApiAuth
  );
  return {data, isLoading};
}

export function search(searchParams: any) {
  const api = `/api/search?q=${searchParams.q}&limit=${searchParams.limit}&offset=${searchParams.offset}`;
  const {data, error, isLoading} = useSWRImmutable(
    searchParams ? [api, {}] : null,
    fetchApiAuth
  );
  return {data, isLoading};
}

export function useAuth(dataForm: any) {
  const api = '/api/auth';
  const option = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dataForm),
    credentials: 'include',
  };

  const {data, error} = useSWRImmutable(
    dataForm.email ? [api, option] : null,
    fetchApiAuth
  );
  return data;
}

export function useToken(dataForm: any) {
  const api = '/api/auth/token';
  const option = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dataForm),
    credentials: 'include',
  };

  const {data, error, isLoading} = useSWR(
    dataForm.code ? [api, option] : null,
    fetchApiAuth
  );
  return {token: data, errorToken: error, isLoading};
}

export function useMe() {
  const api = '/api/me';
  const option = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  };

  const {data, error, isLoading} = useSWR([api, option], fetchApiAuth);
  return {data, error, isLoading};
}

export function useModMe(token: any, newData: any) {
  const api = '/api/me';
  const option = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(newData),
  };

  const {data, error, isLoading} = useSWRImmutable(
    newData.authId ? [api, option] : null,
    fetchApiAuth
  );
  return {modResData: data, modResError: error, modResLoading: isLoading};
}

export async function useOrder(token: string, productId: string, info: Order) {
  const api = '/api/order?productId=' + productId;
  const option = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(info),
  };

  const data = await fetchApiAuth([api, option]);
  return data;
}

export function useFavorite(token: string | null, product: string) {
  const api = '/api/me/favoritos';
  const option = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({
      id: product,
    }),
  };

  const {data} = useSWR(product ? [api, option] : null, fetchApiAuth);
  return {dataFavorite: data};
}
export function useGetAllFavorite(token: string | null) {
  const api = '/api/me/favoritos';
  const option = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  };
  const {data, isLoading} = useSWR([api, option], fetchApiAuth, {
    revalidateOnFocus: true,
  });

  return {data, isLoading};
}
