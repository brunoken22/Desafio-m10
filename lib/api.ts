export async function fetchApiAuth(api: any) {
  const option = api[1] || {};

  if (api) {
    try {
      const response = await fetch(
        'https://desafio-m9-two.vercel.app' + api[0],
        option
      );
      const data = await response.json();
      if (data) {
        return data;
      }
    } catch (e) {
      console.log(e);

      return 'Algo salió mal';
    }
  }
}
