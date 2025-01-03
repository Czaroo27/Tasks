import React, { useState, useEffect, useRef } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@nextui-org/react";
import Picker from "@emoji-mart/react";
import emojiData from "@emoji-mart/data";

export default function NewPocketModal({
  isOpen,
  onOpenChange,
  setPockets,
  setCurrentPocket,
}) {
  const [newPocket, setNewPocket] = useState("");
  const [newPocketIcon, setNewPocketIcon] = useState("🏠");
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const pickerRef = useRef(null);

  const addPocket = () => {
    if (newPocket.trim() === "") {
      alert("Pocket name cannot be empty!");
      return;
    }

    if (newPocket.length > 20) {
      alert("Pocket name is too long (max 20 characters).");
      return;
    }

    setPockets((prevPockets) => [
      ...prevPockets,
      { name: newPocket, icon: newPocketIcon },
    ]);
    setCurrentPocket({ name: newPocket, icon: newPocketIcon });
    resetForm();
  };

  const resetForm = () => {
    setNewPocket("");
    setNewPocketIcon("🏠");
    setIsPickerOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setIsPickerOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <React.Fragment>
      <Modal
        isOpen={isOpen}
        onOpenChange={(open) => {
          if (!open) resetForm();
          onOpenChange(open);
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Create new pocket
              </ModalHeader>
              <ModalBody>
                <div className="flex gap-2 w-full mt-2">
                  <div className="relative">
                    <Button
                      variant="light"
                      className="w-10 h-10"
                      onPress={() => setIsPickerOpen(!isPickerOpen)}
                    >
                      {newPocketIcon}
                    </Button>
                    {isPickerOpen && (
                      <div ref={pickerRef} className="emoji-picker">
                        <Picker
                          data={emojiData}
                          onEmojiSelect={(emoji) => {
                            setNewPocketIcon(emoji.native);
                            setIsPickerOpen(false); // Zamknij picker po wyborze
                          }}
                        />
                      </div>
                    )}
                  </div>

                  <Input
                    placeholder="New pocket name..."
                    value={newPocket}
                    onChange={(e) => setNewPocket(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addPocket();
                        onClose();
                      }
                    }}
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  className="bg-[#6529FE] text-white hover:bg-[#4a1ecf]"
                  onPress={() => {
                    addPocket();
                    onClose();
                  }}
                >
                  Add
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </React.Fragment>
  );
}
