export const cryptoData = async () => {
  try {
    const response = await fetch('http://localhost:4000/fetch');
    const data = await response.json();
    return data;
  } catch(err) {
    console.log(err);
  }
}