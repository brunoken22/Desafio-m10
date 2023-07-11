export async function fetchAPI(api: string) {
  if (api) {
    // localStorage.getItem("token")

    if (true) {
      const response = await fetch('https://desafio-m9-two.vercel.app' + api);
      const data = await response.json();
      if (data) {
        return data;
      }
      throw 'Algo salió mal';
    }
  }
}
