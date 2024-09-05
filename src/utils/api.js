const baseUrl = "http://localhost:3001";

const handleServerResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error:${res.status}`);
};

function getItems() {
  return fetch(`${baseUrl}/items`).then(handleServerResponse);
}

// function addNewItems(name, imageUrl, weather) {
//   return fetch(`${baseUrl}/items`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       name,
//       weather,
//       imageUrl,
//     }),
//   }).then(handleServerResponse);
// }

export { getItems };
