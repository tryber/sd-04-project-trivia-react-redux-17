export async function fetchGameToken() {
  const response = fetch('https://opentdb.com/api_token.php?command=request')
    .then((file) => file.json())
    .catch((erro) => console.log(erro));
  return response.token;
}

export async function fetchGameToken(token) {
  const response = fetch(
    `https://opentdb.com/api.php?amount=5&token=${token}`,
  )
    .then((file) => file.json())
    .catch((erro) => console.log(erro));
  return response;
}
