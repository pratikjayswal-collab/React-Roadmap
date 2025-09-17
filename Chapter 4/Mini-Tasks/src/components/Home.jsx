import React from "react";
import { Link } from "react-router";

const tasks = [
  {
    id: "a",
    title: "Task A",
    name: "Basic Authentication System",
    description:
      "Toggle between logged-in and logged-out states using Context API.",
    path: "/task-a",
  },
  {
    id: "b",
    title: "Task B",
    name: "Theme Context & Provider",
    description:
      "Create a ThemeContext and ThemeContextProvider to handle theme state.",
    path: "/task-bcd",
  },
  {
    id: "c",
    title: "Task C",
    name: "Navbar with useContext",
    description:
      "Build a navigation bar that changes its color based on the theme.",
    path: "/task-bcd",
  },
  {
    id: "d",
    title: "Task D",
    name: "Dynamic Context",
    description:
      "Extend theme toggler to allow multiple themes (light, dark, blue, red).",
    path: "/task-bcd",
  },
  {
    id: "e",
    title: "Task E",
    name: "Context + useReducer",
    description:
      "Implement product inventory system with cart using useReducer and Context.",
    path: "/task-ef",
  },
  {
    id: "f",
    title: "Task F",
    name: "Performance Considerations",
    description:
      "Use React DevTools, optimize re-renders with memoization and context splitting.",
    path: "/task-ef",
  },
  // {
  //   id: "g",
  //   title: "Task G",
  //   name: "Advanced Patterns",
  //   description:
  //     "Create HOC `withUser` to fetch and provide user data to wrapped components.",
  //   path: "/task-g",
  // },
];

const Home = () => {
  return (
    <>
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        4. Context API & State Management Tasks
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {tasks.map((task) => (
          <div
          key={task.id}
          className="bg-white shadow-md rounded-2xl p-6 border hover:shadow-lg transition duration-300 flex flex-col justify-between"
          >
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              {task.title}: {task.name}
            </h2>
            <p className="text-gray-600 mb-4">{task.description}</p>
            <Link
              to={task.path}
              className="mt-auto inline-block bg-orange-400 text-white px-4 py-2 rounded-lg hover:bg-orange-500 transition"
              >
              View Task
            </Link>
          </div>
        ))}
      </div>
    </div>
        </>
  );
};

export default Home;

