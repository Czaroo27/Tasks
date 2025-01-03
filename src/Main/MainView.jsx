import React, { useState, useEffect } from "react";
import "tailwindcss/tailwind.css";
import Sidebar from "./Sidebar";
import TaskList from "./TaskList";
import { useDisclosure } from "@nextui-org/react";

export default function MainView() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [taskText, setTaskText] = useState(""); // Treść zadania
  const [pockets, setPockets] = useState(() => {
    const savedPockets = localStorage.getItem("pockets");
    return savedPockets ? JSON.parse(savedPockets) : [];
  });
  const [currentPocket, setCurrentPocket] = useState(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("pockets", JSON.stringify(pockets));
    if (
      currentPocket &&
      !pockets.some((pocket) => pocket.name === currentPocket.name)
    ) {
      setCurrentPocket(null);
    }
    if (!currentPocket && pockets.length > 0) {
      setCurrentPocket(pockets[0]);
    }
  }, [pockets]);

  // Funkcja dodająca zadanie
  const addTask = (taskText, selectedPocket) => {
    if (taskText.trim() && selectedPocket) {
      const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false,
        pocket: selectedPocket.name,
      };
      setTasks((prevTasks) => [...prevTasks, newTask]);
      setTaskText(""); // Resetowanie pola tekstowego
    }
  };

  const toggleTaskCompletion = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTasksForPocket = (pocketName) => {
    setTasks((prevTasks) =>
      prevTasks.filter((task) => task.pocket !== pocketName)
    );
  };

  const editTask = (id) => {
    const newTaskText = prompt("Edit task:");
    if (newTaskText !== null) {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? { ...task, text: newTaskText } : task
        )
      );
    }
  };

  const deleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  return (
    <React.Fragment>
      <div className="flex h-svh relative">
        <Sidebar
          pockets={pockets}
          setPockets={setPockets}
          setCurrentPocket={setCurrentPocket}
          currentPocket={currentPocket}
          deleteTasksForPocket={deleteTasksForPocket}
          isOpen={isOpen}
          onOpen={onOpen}
          onOpenChange={onOpenChange}
        />
        <TaskList
          pockets={pockets}
          setPockets={setPockets}
          setCurrentPocket={setCurrentPocket}
          currentPocket={currentPocket}
          deleteTasksForPocket={deleteTasksForPocket}
          isOpen={isOpen}
          onOpen={onOpen}
          onOpenChange={onOpenChange}
          tasks={tasks}
          taskText={taskText}
          setTaskText={setTaskText}
          addTask={addTask}
          toggleTaskCompletion={toggleTaskCompletion}
          editTask={editTask}
          deleteTask={deleteTask}
        />
      </div>
    </React.Fragment>
  );
}
