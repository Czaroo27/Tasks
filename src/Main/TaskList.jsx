import React, { useState, useEffect } from "react";
import { MdEdit } from "react-icons/md";
import { FaRegTrashCan } from "react-icons/fa6";
import { Button, Checkbox, Input, Kbd } from "@nextui-org/react";
import NoPockets from "./NoPockets";
import { MdKeyboardArrowDown } from "react-icons/md";
import Sidebar from "./Sidebar";

export default function TaskList({
  pockets,
  setPockets,
  setCurrentPocket,
  currentPocket,
  deleteTasksForPocket,
  tasks,
  taskText,
  setTaskText,
  addTask,
  toggleTaskCompletion,
  editTask,
  deleteTask,
  onOpen,
  onOpenChange,
}) {
  const [showCompleted, setShowCompleted] = useState(false);
  const [selectedPocket, setSelectedPocket] = useState(null);
  const [showAddTask, setShowAddTask] = useState(false);

  useEffect(() => {
    if (!currentPocket) {
      setSelectedPocket(null);
    }
  }, [currentPocket]);

  const activeTasks = tasks.filter(
    (task) => task.pocket === currentPocket?.name && !task.completed
  );

  const completedTasks = tasks.filter(
    (task) => task.pocket === currentPocket?.name && task.completed
  );

  const filteredTasks = showCompleted
    ? [...completedTasks, ...activeTasks]
    : activeTasks;

  const remainingTasksCount = activeTasks.length;
  const totalTasksCount = tasks.filter(
    (task) => task.pocket === currentPocket?.name
  ).length;

  const handleCheckboxChange = (taskId) => {
    toggleTaskCompletion(taskId);
  };

  const handleAddTaskClick = () => {
    setShowAddTask(true);
  };

  const handlePocketSelect = (pocket) => {
    setSelectedPocket(pocket);
  };

  return (
    <React.Fragment>
      <div className="flex flex-col w-full p-10 h-full bg-[#f5f5f5]">
        <div className="flex flex-col justify-between h-full">
          <div>
            {currentPocket ? (
              <>
                <div className="flex justify-between items-center w-full">
                  <div className="mb-4">
                    <div className="flex items-center">
                      <div className="text-2xl">{currentPocket.icon}</div>
                      <div className="ml-2 text-xl font-bold">
                        {currentPocket.name}
                      </div>
                    </div>
                    {remainingTasksCount} out of {totalTasksCount} tasks
                    remaining
                  </div>
                  <div className="relative">
                    <button
                      onClick={() => setShowCompleted((prev) => !prev)}
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
                        key={task.id}
                        className={`border p-2 mb-2 flex items-center justify-between group rounded-md 
                          ${task.completed ? "bg-[#6529FE]" : "bg-white"} 
                          ${
                            task.completed
                              ? "hover:bg-[#4a20a1]"
                              : "hover:bg-[#f0f0f0]"
                          }
                          transition duration-300 ease-in-out`}
                      >
                        <div className="flex items-center">
                          <Checkbox
                            isSelected={task.completed}
                            onChange={() => handleCheckboxChange(task.id)}
                          />
                          <div
                            className={`$$$${
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
                              <FaRegTrashCan
                                fontSize={16}
                                className="text-white"
                              />
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
              </>
            ) : (
              <NoPockets />
            )}
          </div>

          <div className="flex flex-col justify-center items-center gap-4">
            <div
              className="create-task-baner flex items-center justify-between px-4 py-2 bg-[#3D3D3D] rounded-3xl w-96 h-10 cursor-pointer"
              onClick={handleAddTaskClick}
            >
              <div className="frame flex items-center gap-2">
                <div className="ph-caret-down-light rotate-180">
                  <MdKeyboardArrowDown size={24} color="white" />
                </div>
                <div className="text-wrapper text-white text-sm">
                  Create new task
                </div>
              </div>
              <Button
                className=" flex justify-between cursor-pointer select-none mb-4 mt-4 bg- text-white"
                endContent={
                  <Kbd
                    keys={["command"]}
                    className=" flex justify-center w-10 h-8 bg-[#4F4F4F] text-white text-xl"
                  >
                    N
                  </Kbd>
                }
                onPress={onOpen}
              />
            </div>

            {showAddTask && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="w-full max-w-lg p-4 bg-white rounded-lg shadow-lg">
                  <div className="mb-4">
                    <h2 className="text-lg font-semibold">Create a new task</h2>
                    <Input
                      size="lg"
                      type="text"
                      placeholder="Enter task description"
                      value={taskText}
                      onChange={(e) => setTaskText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          addTask(taskText, selectedPocket || currentPocket);
                          setTaskText("");
                          setShowAddTask(false);
                        }
                      }}
                    />
                  </div>
                  <div className="mb-4">
                    <h2 className="text-sm font-medium">Select pocket</h2>
                    <div className="flex flex-col gap-2">
                      {pockets.map((pocket) => (
                        <Button
                          key={pocket.name}
                          onPress={() => handlePocketSelect(pocket)}
                          className={`w-full text-left py-2 px-3 rounded-md ${
                            selectedPocket?.name === pocket.name
                              ? "bg-gray-300 text-white"
                              : "hover:bg-gray-200"
                          }`}
                        >
                          {pocket.icon} {pocket.name}
                        </Button>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button
                      onPress={() => {
                        setShowAddTask(false);
                        setTaskText("");
                      }}
                      color="default"
                    >
                      Cancel
                    </Button>
                    <Button
                      onPress={() => {
                        addTask(taskText, selectedPocket || currentPocket);
                        setTaskText("");
                        setShowAddTask(false);
                      }}
                      isDisabled={!taskText.trim()}
                      color="primary"
                    >
                      Create
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
