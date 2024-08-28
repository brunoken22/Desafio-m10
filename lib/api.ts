const API_URL = process.env.NEXT_PUBLIC_PORT || 'http://localhost:3001';
export async function fetchApiAuth(api: any) {
  const option = api[1] || {};

  if (api) {
    try {
      const response = await fetch(API_URL + api[0], option);
      const data = await response.json();
      if (data) {
        return data;
      }
    } catch (e) {
      return 'Algo salió mal';
    }
  }
}
