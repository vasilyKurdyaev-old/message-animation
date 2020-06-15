import React, { useState, useEffect } from "react";
import "./App.css";
import scrollIntoView from "scroll-into-view-if-needed";

export default function App() {
  const [messages, setMessages] = useState([
    "New message",
    "New message",
    "New message",
    "New message",
  ]);

  const [autoAddMessages, setAutoAddMessages] = useState(true);
  const messageElements = messages.map((msg, index) => {
    const className =
      index === messages.length - 1 ? "msg last-message" : "msg";
    return (
      <div key={index} className={className}>
        {`${msg} [${index}]`}
      </div>
    );
  });

  useEffect(() => {
    if (autoAddMessages) {
      const timer = setTimeout(() => {
        setMessages((prev) => [...prev, "New message"]);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [messages, autoAddMessages]);

  useEffect(() => {
    if (messages.length) {
      const elements = document.getElementsByClassName("last-message");
      const element = elements[0];

      scrollIntoView(element, {
        scrollMode: "if-needed",
        behavior: "smooth",
      });
    }
  }, [messages]);

  const autoButtonText = autoAddMessages
    ? "Disable auto messages"
    : "Enable auto messages";

  return (
    <div className="App">
      <div className="message-container">
        <header className="header">scroll-into-view-if-needed example</header>
        <div className="container">{messageElements}</div>
      </div>
      <div className="controls">
        <button onClick={() => setMessages((prev) => [...prev, "New message"])}>
          Add message
        </button>
        <button onClick={() => setMessages([])}>Clear messages</button>
        <button onClick={() => setAutoAddMessages((prev) => !prev)}>
          {autoButtonText}
        </button>
      </div>
    </div>
  );
}
