export function addTodo(text) {
  return {
    type: "ADD_TODO",
    text: text,
    id: Math.random()
  };
}

export function setAuth(auth) {
  return {
    type: "SET_AUTH",
    auth: JSON.parse(auth)
  };
}
