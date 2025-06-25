import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LOCAL_KEY = "notes";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (email && password) onLogin();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen flex flex-col items-center justify-center bg-gray-100"
    >
      <div className="bg-white p-6 rounded shadow w-80">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        <button
          onClick={handleLogin}
          className="bg-blue-500 text-white px-4 py-2 w-full rounded hover:bg-blue-600"
        >
          Login
        </button>
      </div>
    </motion.div>
  );
}

export default function NoteApp() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [notes, setNotes] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_KEY);
    if (saved) setNotes(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    if (input.trim() !== "") {
      setNotes([...notes, { text: input, id: Date.now() }]);
      setInput("");
    }
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((n) => n.id !== id));
  };

  if (!loggedIn) return <Login onLogin={() => setLoggedIn(true)} />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen p-4 bg-yellow-100"
    >
      <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
        <motion.h1
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold mb-4 text-center"
        >
          📝 Note Taking App
        </motion.h1>

        <div className="flex gap-2 mb-4">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 p-2 border rounded"
            placeholder="Write a note..."
          />
          <button
            onClick={addNote}
            className="bg-green-500 text-white px-4 rounded hover:bg-green-600"
          >
            Add
          </button>
        </div>

        <ul>
          <AnimatePresence>
            {notes.map((note) => (
              <motion.li
                key={note.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
                className="flex justify-between items-center bg-gray-100 p-2 mb-2 rounded"
              >
                <span>{note.text}</span>
                <button
                  onClick={() => deleteNote(note.id)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center mt-6 text-sm text-gray-500"
        >
          Made with ❤️ by Oshiv Bansal
        </motion.div>
      </div>
    </motion.div>
  );
}
