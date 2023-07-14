import { useEffect, useState } from "react";

const useItineraryDragAndDrop = (callback) => {
  // const [items, setItems] = useState(initialItems);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [draggedOverIndex, setDraggedOverIndex] = useState(null);
  
  // useEffect( () => {
  //   items.forEach((item) => console.log(item));
  //   // api handle
  //   callback();
  // }, [items]);
  
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
    // console.log(newItems.map(item => item._id))
    const updateList = newItems.map(item => item._id)
    callback(updateList)
    setDraggedIndex(null);
    setDraggedOverIndex(null);
  };
  return { handleDragEnd, handleDragOver, handleDragStart, handleDrop, };
};

export default useItineraryDragAndDrop;
