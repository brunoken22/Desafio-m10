import useSWR, {mutate} from 'swr';
import useSWRImmutable from 'swr/immutable';
import {fetchApiAuth} from './api';
import {useEffect} from 'react';

type Order = {
  cantidad?: number;
};
export function useProduct(productId: any) {
  const api = '/api/products/' + productId;

  const {data, isLoading} = useSWRImmutable(
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

  const {data} = useSWRImmutable(
    dataForm.email ? [api, option] : null,
    fetchApiAuth
  );
  return data;
}

export function useToken(dataForm: any) {
  const option = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dataForm),
    credentials: 'include',
  };

  const {data, error, isLoading} = useSWR(
    dataForm.code ? '/api/auth/token' : null,
    (api) => fetchApiAuth([api, option])
  );

  useEffect(() => {
    (async () => {
      if (data?.login) {
        await mutate('/api/me');
        const setCookie = (await import('cookies-next')).setCookie;
        setCookie('login', 'true');
      }
    })();
  }, [data]);
  return {token: data, errorToken: error, isLoading};
}

export function useMe() {
  const option = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  };

  const {data, error, isLoading} = useSWR('/api/me', (api) =>
    fetchApiAuth([api, option])
  );
  return {data, error, isLoading};
}

export function useModMe(newData: any) {
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

export async function useOrder(productId: string, info: Order) {
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

export function useFavorite(product: string) {
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

export function useGetAllFavorite() {
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

export async function closeUser() {
  const api = '/api/me/close';
  const option = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  };
  const close = await fetchApiAuth([api, option]);
  if (!close.login) {
    await mutate('/api/me');
    const deleteCookie = (await import('cookies-next')).deleteCookie;
    deleteCookie('login');
  }
  return close;
}
