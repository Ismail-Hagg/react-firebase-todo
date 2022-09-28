import { AiOutlinePlus } from "react-icons/ai";
import React, { useState, useEffect } from "react";
import Todo from "./components/Todo";
import { db } from "./firebase";
import {
  query,
  collection,
  onSnapshot,
  QuerySnapshot,
  updateDoc,
  doc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState([false]);
  const [input, setInput] = useState("");

  // crud operations in firebase for a todo app

  // create todo

  const createTodo = async (e) => {
    e.preventDefault(e);
    if (input === "") {
      alert("Please enter a valid todo");
      return;
    }
    setLoading(true)
    await addDoc(collection(db, "todos"), {
      todo: input,
      compleated: false,
    });
    setInput("");
  };

  // read todo

  useEffect(() => {
    setLoading(true);
    const q = query(collection(db, "todos"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let todoArr = [];
      querySnapshot.forEach((doc) => {
        todoArr.push({ ...doc.data(), id: doc.id });
      });
      setLoading(false);
      setTodos(todoArr);
    });

    return () => unsubscribe();
  }, []);

  // update todo
  const toggleCompleate = async (todo) => {
    await updateDoc(doc(db, "todos", todo.id), {
      compleated: !todo.compleated,
    });
  };
  // delete todo
  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, "todos", id));
  };

  return (
    <div className="h-screen w-screen p-4 bg-gradient-to-r from-[#2F80ED] to-[#1CB5E0]">
      <div className="bg-slate-100 max-w-[500px] w-full m-auto rounded-md shadow-xl p-4">
        <h3 className="text-3xl font-bold text-center text-gray-800 p-2">
          To Do App
        </h3>
        <form
          onChange={(e) => setInput(e.target.value)}
          onSubmit={createTodo}
          className="flex justify-between"
        >
          <input
            type="text"
            placeholder="Add A Todo"
            className="border w-full text-xl p-2 "
            value={input}
          />
          <button className="border p-4  bg-purple-500 text-slate-100">
            <AiOutlinePlus size={30} />
          </button>
        </form>
        <ul>
          {todos.map((todo, index) => (
            <Todo
              key={index}
              todo={todo}
              toggleCompleate={toggleCompleate}
              deleteTodo={deleteTodo}
            />
          ))}
        </ul>
        <p className="text-center p-2 text-xl">
          {loading ? "Loading" : `you have ${todos.length} Todos`}
        </p>
      </div>
    </div>
  );
}

export default App;
