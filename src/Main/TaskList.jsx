import React, { useEffect, useState } from "react";
import NoPockets from "./NoPockets";
import MainView from "./MainView";
import { MdEdit } from "react-icons/md";
import { FaRegTrashCan } from "react-icons/fa6";
import { Button, Checkbox, Input } from "@nextui-org/react";
import { IoCaretUp } from "react-icons/io5";

export default function TaskList({
  tasks,
  newTask,
  setNewTask,
  addTask,
  toggleTaskCompletion,
  currentPocket,
  editTask,
  deleteTask,
  pockets,
}) {
  const [showCompleted, setShowCompleted] = useState(false);

  useEffect(() => {
    if (!currentPocket) {
      setNewTask(""); // Funkcja setNewTask
    }
  }, [currentPocket, setNewTask]); // Dodaj setNewTask do tablicy zależności

  if (!currentPocket) {
    return <NoPockets />;
  }

  // Filtering tasks based on whether completed tasks should be shown
  const activeTasks = tasks.filter(
    (task) => task.pocket === currentPocket.name && !task.completed
  );

  const completedTasks = tasks.filter(
    (task) => task.pocket === currentPocket.name && task.completed
  );

  // Combine active and completed tasks, sorting so completed tasks appear first
  const filteredTasks = showCompleted
    ? [...completedTasks, ...activeTasks] // Completed tasks first
    : activeTasks; // Only active tasks

  // Counting tasks
  const remainingTasksCount = activeTasks.length;
  const totalTasksCount = tasks.filter(
    (task) => task.pocket === currentPocket.name
  ).length;

  // Function to toggle task completion
  const handleCheckboxChange = (taskId) => {
    toggleTaskCompletion(taskId);
  };
  console.log("skurwysyny" + pockets);

  return (
    <React.Fragment>
      <div className="flex flex-col w-full p-10 h-full bg-[#f5f5f5]">
        <div className="flex flex-col justify-between h-full">
          <div>
            <div className="flex justify-between items-center w-full">
              <div className="mb-4">
                <div className="flex items-center">
                  <div className="text-2xl">{currentPocket.icon}</div>
                  <div className="ml-2 text-xl font-bold">
                    {currentPocket.name}
                  </div>
                </div>
                {/* Display remaining and total tasks */}
                {remainingTasksCount} out of {totalTasksCount} tasks remaining
              </div>
              <div className="relative">
                <button
                  onClick={() => setShowCompleted((prev) => !prev)} // Toggle showing completed tasks
                  className="bg-white font-weight: 700 text-gray-900 px-4 py-2 rounded-lg shadow hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500"
                >
                  {showCompleted ? "Hide completed" : "Show completed"}
                </button>
              </div>
            </div>

            <div className="bg-white rounded-md mt-6">
              {filteredTasks.length > 0 ? (
                filteredTasks.map((task) => (
                  <div
                    className={`border p-2 mb-2 flex items-center justify-between group rounded-md 
                      ${task.completed ? "bg-[#6529FE]" : "bg-white"} 
                      ${
                        task.completed
                          ? "hover:bg-[#4a20a1]"
                          : "hover:bg-[#f0f0f0]"
                      }
                      transition duration-300 ease-in-out`}
                    key={task.id}
                  >
                    <div className="flex items-center">
                      <Checkbox
                        isSelected={task.completed}
                        onChange={() => handleCheckboxChange(task.id)}
                      />
                      <div
                        className={`${
                          task.completed
                            ? "line-through text-white"
                            : "text-black"
                        }`}
                      >
                        {task.text}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 duration-150">
                      <Button
                        size="sm"
                        color="warning"
                        isIconOnly
                        onPress={() => editTask(task.id)}
                        startContent={
                          <MdEdit fontSize={16} className="text-white" />
                        }
                      />
                      <Button
                        size="sm"
                        color="danger"
                        isIconOnly
                        onPress={() => deleteTask(task.id)}
                        startContent={
                          <FaRegTrashCan fontSize={16} className="text-white" />
                        }
                      />
                    </div>
                  </div>
                ))
              ) : (
                <p>
                  {showCompleted
                    ? "No completed tasks available."
                    : "No active tasks available. Add tasks to this pocket below."}
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-center items-center w-full">
            <div className="flex items-center gap-2 w-1/2">
              <Input
                size="lg"
                type="text"
                placeholder="Create a new task"
                value={newTask}
                endContent={
                  <Button
                    size="sm"
                    isIconOnly
                    isDisabled={newTask.trim() === ""}
                    startContent={
                      <IoCaretUp fontSize={20} className="text-white" />
                    }
                    className="bg-blue-500 rounded-full"
                    onPress={addTask}
                  />
                }
                onChange={(e) => setNewTask(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    addTask();
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
