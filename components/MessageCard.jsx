"use client";
import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import markMessageAsRead from "@/app/actions/markMessageAsRead";
import deleteMessage from "@/app/actions/deleteMessage";
import { useGlobalContext } from "@/context/GlobalContext";

const MessageCard = ({ message }) => {
  const [isRead, setIsRead] = useState(message.read);
  const [isDelete, setIsDelete] = useState(false);
  const { setUnreadCount } = useGlobalContext();

  const handleMarkAsRead = async () => {
    const read = await markMessageAsRead(message._id);
    setIsRead(read);
    setUnreadCount((prev) => prev + (read ? -1 : 1));
    toast.success(`Message marked as ${read ? "read" : "new"}`);
  };
  const handleDeleteClick = async () => {
    await deleteMessage(message._id);
    setIsDelete(true);
    setUnreadCount((prev) => (isRead ? prev : prev - 1));
    toast.success("Message deleted successfully");
  };

  if (isDelete) {
    return <p>Deleted</p>;
  }
  return (
    <div className="relative bg-white p-4 rounded-md shadow-md border border-gray-200">
      {!isRead && (
        <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-md">
          New
        </div>
      )}
      <h2 className="text-xl mb-4">
        <span className="font-bold"> Project Inquiry:</span>
        {message.property.name}
      </h2>
      <p className="text-gray-700">{message.body}</p>
      <ul className=" mt-4">
        <li>
          <strong>Reply Email</strong>
          <a
            href={`mailto:${message.email}`}
            className="text-blue-500 hover:underline ml-2"
          >
            {message.email}
          </a>
        </li>
        <li>
          <strong>Reply Phone</strong>
          <a
            href={`tel:${message.phone}`}
            className="text-blue-500 hover:underline ml-2"
          >
            {message.phone}
          </a>
        </li>
        <li>
          <strong>Received</strong>
          {new Date(message.createdAt).toLocaleString()}
        </li>
      </ul>
      <button
        onClick={handleMarkAsRead}
        className="mt-3 mr-4 bg-blue-500 text-white py-1 px-3 rounded-md"
      >
        {isRead ? "Mark as New" : "Mark as Read"}
      </button>
      <button
        onClick={handleDeleteClick}
        className="mt-3  bg-red-500 text-white py-1 px-3 rounded-md"
      >
        Delete
      </button>
    </div>
  );
};

export default MessageCard;
