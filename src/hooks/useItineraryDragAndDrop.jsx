import { useState } from "react";

const useItineraryDragAndDrop = (callback) => {
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [draggedOverIndex, setDraggedOverIndex] = useState(null);
  
  const handleDragStart = (event, index) => {
    event.dataTransfer.setData("text/plain", index);
    setDraggedIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDraggedOverIndex(null);
  };

  const handleDragOver = (event, index) => {
    event.preventDefault();
    setDraggedOverIndex(index);
  };

  const handleDrop = (items, setItems) => {
    const newItems = [...items];
    const draggedItem = newItems[draggedIndex];
    newItems.splice(draggedIndex, 1);
    newItems.splice(draggedOverIndex, 0, draggedItem);
    setItems(newItems);
    console.log(newItems)
    const updateList = newItems.map(item => item._id)
    callback(updateList)
    setDraggedIndex(null);
    setDraggedOverIndex(null);
  };
  return { handleDragEnd, handleDragOver, handleDragStart, handleDrop};
};

export default useItineraryDragAndDrop;
