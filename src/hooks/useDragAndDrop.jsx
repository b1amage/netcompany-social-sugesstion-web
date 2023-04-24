import { useEffect, useState } from "react";

const useDragAndDrop = (initialItems, callback) => {
  const [items, setItems] = useState(initialItems);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [draggedOverIndex, setDraggedOverIndex] = useState(null);

  useEffect(() => {
    console.log(`items: ${items}`);
    // api handle
    callback();
  }, [items]);

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

  const handleDrop = () => {
    const newItems = [...items];
    const draggedItem = newItems[draggedIndex];
    newItems.splice(draggedIndex, 1);
    newItems.splice(draggedOverIndex, 0, draggedItem);
    setItems(newItems);
    setDraggedIndex(null);
    setDraggedOverIndex(null);
  };

  const renderItems = () => {
    return items.map((item, index) => {
      const className = `drag-and-drop-item ${
        index === draggedOverIndex ? "dragging-over" : ""
      } ${index === draggedIndex ? "dragging" : ""}`;
      const key = index + item.toString();
      return (
        <li
          key={key}
          draggable={true}
          onDragStart={(event) => handleDragStart(event, index)}
          onDragEnd={handleDragEnd}
          onDragOver={(event) => handleDragOver(event, index)}
          onDrop={handleDrop}
          className={className}
        >
          {item}
        </li>
      );
    });
  };

  return [renderItems];
};

export default useDragAndDrop;
