import React, { useEffect, useState } from 'react'
import { use } from 'react';
import { MdDelete } from "react-icons/md";


const NewTodo = () => {
    const [Input, setInput] = useState('');
    const [Todos, setTodos] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [filter, setfilter] = useState("All");
    const [selected, isselected] = useState("button2")

    const HandleAddButton = () => {
        if (Input.trim() === "") return;
        const NewInput = {
            id: Date.now(),
            text: Input,
            complete: false,
        }
        setTodos([...Todos, NewInput]);
        setInput('');
    }

    // Getting Item form LocalStorage
    useEffect(() => {
        const StoredData = localStorage.getItem("UserData")
        if (StoredData) {
            setTodos(JSON.parse(StoredData))
        }
        setIsLoaded(true);
    }, [])

    // Set Item To LocalStorage
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem("UserData", JSON.stringify(Todos))
        }
    }, [Todos])

    // Complete feature / strick through
    const HandleComplete = (id) => {
        setTodos(
            Todos.map(item => (item.id === id ? { ...item, complete: !item.complete } : item))
        )
    }
    
    const DeleteTodo = (id) => {
        setTodos(
            Todos.filter(todo => todo.id != id)
        );
    }

    const handlefilter = Todos.filter(item => {
        if (filter === "All") return true;
        if (filter === "Completed") return item.complete;
        if (filter === "Active") return !item.complete;
    })

    return (
        <div className='flex flex-col justify-center items-center'>
            <h1>Todo</h1>

            <div className='flex items-center text-center justify-center '>
                <input
                    required
                    type="text"
                    className='p-2 border'
                    value={Input}
                    onChange={(e) => setInput(e.target.value)} />
                <button
                    className='cursor-pointer p-2 bg-green-600'
                    onClick={HandleAddButton} >Add</button>
            </div>

            <div className='flex gap-4 mt-3 font-bold'>
                <button className={`p-2 bg-green-600 text-white rounded ${selected === "button1" ? "bg-red-500" : ""}`} onClick={() => { setfilter("Completed"); isselected("button1"); }}>Completed</button>
                <button className={`p-2 bg-green-600 text-white rounded ${selected === "button2" ? "bg-red-500" : ""}`} onClick={() => { setfilter("All"); isselected("button2"); }}>All</button>
                <button className={`p-2 bg-green-600 text-white rounded ${selected === "button3" ? "bg-red-500" : ""}`} onClick={() => { setfilter("Active"); isselected("button3"); }}>Active</button>
            </div>

            {/* Map Feature  */}
            <ul className='w-[200px] text-center flex items-center justify-center flex-col'>
                {
                    handlefilter.map((item) => {
                        return (
                            <li
                                key={item.id}
                                className='flex items-center gap-y-6 mt-4'>
                                <span
                                    onClick={() => HandleComplete(item.id)}
                                    style={{ textDecoration: item.complete ? "line-through" : "none" }}
                                    className='border cursor-pointer p-2 user-select-none'>
                                    {item.text}
                                </span>
                                <div
                                    className='border cursor-pointer p-2.5'
                                    onClick={() => DeleteTodo(item.id)}
                                ><MdDelete /></div>
                            </li>
                        )
                    })
                }
            </ul >
        </div >
    )
}

export default NewTodo;