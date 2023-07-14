import useSWR from 'swr';
import useSWRImmutable from 'swr/immutable';
import { fetchAPI, fetchApiAuth } from './api';

export function useProduct(productId: string) {
  const { data, error, isLoading } = useSWRImmutable(productId, fetchAPI);
  return data;
}

export function search(productId: string) {
  const { data, error, isLoading } = useSWRImmutable(productId, fetchAPI);
  return data;
}

export function useAuth(dataForm: any) {
  const api = '/api/auth';
  const option = {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dataForm)
  };

  const { data, error } = useSWRImmutable(dataForm.email ? [api, option] : null, fetchApiAuth);
  return data;
}

export function useToken(dataForm: any) {
  const api = '/api/auth/token';
  const option = {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dataForm)
  };

  const { data, error, isLoading } = useSWRImmutable(
    dataForm.code ? [api, option] : null,
    fetchApiAuth
  );
  return { token: data, errorToken: error, isLoading };
}

export function useMe(token: any) {
  const api = '/api/me';
  const option = {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  };

  const { data, error, isLoading } = useSWRImmutable(token ? [api, option] : null, fetchApiAuth);
  return { data, error, isLoading };
}

export function useModMe(token: any, newData: any) {
  const api = '/api/me';
  const option = {
    method: 'patch',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(newData)
  };

  const { data, error, isLoading } = useSWRImmutable(
    token && newData.authId ? [api, option] : null,
    fetchApiAuth
  );
  return { modResData: data, modResError: error, modResLoading: isLoading };
}
