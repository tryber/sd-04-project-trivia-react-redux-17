// export async function fetchGameToken() {
//   const response = fetch('https://opentdb.com/api_token.php?command=request')
//     .then((file) => file.json())
//     .catch((erro) => console.log(erro));
//   return response.token;
// }

export const getToken = async () => {
  const URL_TOKEN = 'https://opentdb.com/api_token.php?command=request';
  const response = await fetch(URL_TOKEN);
  const json = await response.json();
  const data = await (response.ok ? Promise.resolve(json) : Promise.reject(json));
  return data;
};

// export async function getQuestions(token) {
//   const response = fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)
//     .then((file) => file.json())
//     .catch((erro) => console.log(erro));
//   return response;
// }

export const getQuestions = async (token) => {
  const URL_QUESTIONS = `https://opentdb.com/api.php?amount=5&token=${token}`;
  const response = await fetch(URL_QUESTIONS);
  const json = await response.json();
  const data = await (response.ok ? Promise.resolve(json) : Promise.reject(json));
  return data;
};

export const getCategories = async () => {
  const URL_CATEGORIES = 'https://opentdb.com/api_category.php';
  const response = await fetch(URL_CATEGORIES);
  const json = response.json();
  const data = await (response.ok ? Promise.resolve(json) : Promise.reject(json));
  return data;
};
