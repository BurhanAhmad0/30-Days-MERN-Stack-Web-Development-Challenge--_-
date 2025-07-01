const TodoReducer = (state, action) => {
    switch (action.type) {
        case 'SET_TODOS':
            return {
                ...state,
                todos: action.payload
            };
        case 'ADD_TODO':
            return {
                ...state,
                todos: [...state.todos, action.payload]
            };
        case 'UPDATE_TODO':
            return {
                ...state,
                todos: state.todos.map((todo, i) =>
                    i === action.payload.index
                        ? { ...todo, text: action.payload.text }
                        : todo
                )
            };
        case 'TOGGLE_TODO':
            return {
                ...state,
                todos: state.todos.map((todo, i) =>
                    i === action.payload.index ? { ...todo, completed: !todo.completed } : todo
                )
            };
        case 'DELETE_TODO':
            return {
                ...state,
                todos: state.todos.filter((_, i) => i !== action.payload.index)
            };
        default:
            return state;
    }
};

export default TodoReducer;
