import { createContext, useReducer, useState, useEffect } from 'react'
import axios from 'axios';
import CounterReducer from '../Reducers/CounterReducer';
import TodoReducer from '../Reducers/TodoReducer';

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {

    const CounterInitialState = {
        count: 0,
    }

    const TodoInitialState = {
        todos: [],
    }

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [CountState, CountDispatch] = useReducer(CounterReducer, CounterInitialState);
    const [TodosState, TodoDispatch] = useReducer(TodoReducer, TodoInitialState);
    const [Products, setProducts] = useState(null)
    const [Filter, setFilter] = useState('all')
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1); // optional, if backend provides it
    const PRODUCTS_PER_PAGE = 6;

    const getProducts = async () => {
        setLoading(true);

        try {
            const response = await axios.get(`http://localhost:3000/api/products`, {
                params: { page: currentPage, limit: PRODUCTS_PER_PAGE }
            });

            setProducts(response.data.products);
            if (response.data.totalCount) {
                setTotalPages(Math.ceil(response.data.totalCount / PRODUCTS_PER_PAGE));
            }
        } catch (err) {
            console.error('Error fetching products:', err);
        } finally {
            setLoading(false);
        }
    };

    const fetchUser = async () => {
        try {
            const res = await axios.get('http://localhost:3000/api/profile', {
                withCredentials: true
            });
            setUser(res.data);
        } catch (err) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    useEffect(() => {
        getProducts();
    }, [currentPage]);

    useEffect(() => {
        const getAllTodos = () => {
            const localTodos = JSON.parse(localStorage.getItem('todos')) || [];
            let filteredTodos = [];

            switch (Filter) {
                case 'pending':
                    filteredTodos = localTodos.filter(todo => todo.completed === false);
                    break;
                case 'completed':
                    filteredTodos = localTodos.filter(todo => todo.completed === true);
                    break;
                case 'all':
                default:
                    filteredTodos = localTodos;
                    break;
            }

            TodoDispatch({ type: 'SET_TODOS', payload: filteredTodos });
        };

        getAllTodos();
    }, [Filter, TodoDispatch]);

    const UserContextValues = {
        CountState, CountDispatch,
        TodosState, TodoDispatch,
        Filter, setFilter,
        Products, setProducts,
        user, setUser,
        loading, setLoading,
        currentPage, setCurrentPage,
        totalPages, setTotalPages,
    };

    return (
        <>
            <UserContext.Provider value={UserContextValues}>
                {children}
            </UserContext.Provider>
        </>
    )
}

export default UserContextProvider
