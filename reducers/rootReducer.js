import { combineReducers } from "redux";
import { AsyncStorage } from "react-native";

/****************************************************************/
// Reusable utility functions
function updateObject(oldObject, newValues) {
  // Encapsulate the idea of passing a new object as the first parameter
  // to Object.assign to ensure we correctly copy data instead of mutating
  return Object.assign({}, oldObject, newValues);
}
function updateItemInArray(array, itemId, updateItemCallback) {
  const updatedItems = array.map(item => {
    if (item.id !== itemId) {
      // Since we only want to update one item, preserve all others as they are now
      return item;
    }
    // Use the provided callback to create an updated item
    const updatedItem = updateItemCallback(item);
    return updatedItem;
  });
  return updatedItems;
}
function createReducer(initialState, handlers) {
  return function reducer(state = initialState, action) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    } else {
      return state;
    }
  };
}
/****************************************************************/

// Case reducer
function addTodo(prevTodos, action) {
  const newTodos = prevTodos.concat({
    id: action.id,
    text: action.text,
    completed: false
  });
  return newTodos;
}
function clearTodos(prevTodos, action) {
  return [];
}

// Slice reducer
const todosReducer = createReducer([], {
  ADD_TODO: addTodo,
  CLEAR_TODOS: clearTodos
});

const userNameReducer = createReducer("No username", {
  CLEAR_USERNAME: () => {
    return "No username";
  }
});

const authReducer = createReducer("No username", {
  SET_AUTH: (prevAuth, action) => {
    return {
      ...action.auth
    };
  }
});

// "Root reducer"
const appReducer = combineReducers({
  userDetails: userNameReducer,
  auth: authReducer,
  events: todosReducer
});

export default appReducer;
