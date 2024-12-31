import { Avatar, Button, Kbd } from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { IoMdAdd } from "react-icons/io";
import NewPocketModal from "./NewPocketModal";
import TaskList from "./TaskList";

export default function Sidebar({
  pockets,
  setPockets,
  setCurrentPocket,
  currentPocket,
  deleteTasksForPocket,
  isOpen,
  onOpen,
  onOpenChange,
  tasks = [],
}) {
  const [hoveredPocket, setHoveredPocket] = useState(null);

  console.log(pockets);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === "p") {
        event.preventDefault();
        onOpen();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onOpen]);

  const deletePocket = (pocketToDelete) => {
    if (currentPocket && currentPocket.name === pocketToDelete.name) {
      setCurrentPocket(null);
    }
    setPockets((prevPockets) =>
      prevPockets.filter((pocket) => pocket.name !== pocketToDelete.name)
    );
    deleteTasksForPocket(pocketToDelete.name);
  };

  const getRemainingTasksCount = (pocketName) => {
    if (!Array.isArray(tasks)) return 0;

    const remainingTasks = tasks.filter(
      (task) => task.pocket === pocketName && task.completed === false
    );

    return remainingTasks.length;
  };

  return (
    <React.Fragment>
      <TaskList pockets={pockets} />
      <div className="rounded-md flex flex-col justify-between px-6 py-10 h-full lg:w-[350px] w-[80px] bg-white">
        {/* Pockets Section */}
        <div className="mb-4 lg:block hidden">
          {/* Laptop View */}
          <div className="text-2xl text-left font-bold">Pockets</div>
          <div className="mt-2">
            {pockets.map((pocket, index) => (
              <div
                key={index}
                className={`flex items-center justify-between cursor-pointer h-9 mb-3 px-1 py-1.5 hover:bg-[#f0f0f0] group hover:rounded-md ${
                  pocket.name === currentPocket?.name &&
                  "bg-[#6529FE] rounded text-white hover:!bg-blue-600"
                }`}
                onClick={() => setCurrentPocket(pocket)}
                onMouseEnter={() => setHoveredPocket(pocket.name)}
                onMouseLeave={() => setHoveredPocket(null)}
              >
                <div className="flex items-center max-w-[300px]">
                  <div className="text-2xl">{pocket.icon}</div>
                  <div className="ml-2 truncate">{pocket.name}</div>
                </div>
                <div>{getRemainingTasksCount(pocket.name)}</div>
                <div className="flex items-center opacity-0 group-hover:opacity-100 duration-150">
                  <Button
                    size="sm"
                    color="danger"
                    isIconOnly
                    onPress={() => deletePocket(pocket)}
                    startContent={<FaRegTrashCan fontSize={16} />}
                  />
                </div>
              </div>
            ))}
          </div>

          <Button
            className="flex justify-between cursor-pointer select-none w-full mt-4 bg-[#f5f5f5]"
            endContent={<Kbd keys={["command"]}>P</Kbd>}
            onPress={onOpen}
          >
            <IoMdAdd fontSize={18} className="text-[#7e7e7e]" />
            <p className="font-semibold">Create new pocket</p>
          </Button>
        </div>

        {/* Mobile View */}
        <div className="flex flex-col items-center mt-4 lg:hidden">
          {pockets.map((pocket, index) => (
            <div
              key={index}
              className={`flex items-center justify-center cursor-pointer h-12 w-12 mb-4 hover:bg-[#f0f0f0] rounded-md	 ${
                pocket.name === currentPocket?.name &&
                "bg-[#6529FE] text-white hover:!bg-blue-600"
              }`}
              onClick={() => setCurrentPocket(pocket)}
            >
              <div className="text-2xl">{pocket.icon}</div>
            </div>
          ))}

          <div className="flex items-center justify-center cursor-pointer h-12 w-12 mt-4 bg-[#f5f5f5] rounded-full hover:bg-[#eaeaea]">
            <IoMdAdd
              fontSize={24}
              className="text-[#7e7e7e]"
              onClick={onOpen}
            />
          </div>
        </div>

        {/* User Section */}
        <div className="flex w-full mt-4 items-center lg:flex-row flex-col lg:justify-start justify-center">
          <Avatar
            src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            size="lg"
            className="cursor-pointer hover:scale-105 transition-transform"
          />
          <div className="ml-2 lg:block hidden">
            <p>Claudia Doumit</p>
            <p className="text-sm text-left text-[#7e7e7e] hover:text-[#646464] cursor-pointer">
              Log out
            </p>
          </div>
        </div>

        {/* New Pocket Modal */}
        <NewPocketModal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          setPockets={setPockets}
          setCurrentPocket={setCurrentPocket}
        />
      </div>
    </React.Fragment>
  );
}
