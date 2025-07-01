import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import styles from "./Chat.module.css";

const socket = io("http://localhost:3000");

function Chat() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [username, setUsername] = useState("User");
  const [boxColor, setBoxColor] = useState("#ffafaf");

  const sendMessage = () => {
    if (message.trim() && username.trim()) {
      socket.emit("send_message", { username, message, boxColor });
      setMessage("");
      setUsername("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setChat((prev) => [...prev, data]);
      console.log(data);
    });

    return () => {
      socket.off("receive_message");
    };
  }, []);

  return (
    <div className={styles.chatContainer}>
      <div className={styles.messages}>
        {chat.map((msg, idx) => (
          <p
            style={{ backgroundColor: msg.boxColor }}
            key={idx}
            className={styles.message}
          >
            <strong>{msg.username}: </strong>
            {msg.message}
          </p>
        ))}
      </div>

      <div className={styles.inputContainer}>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={styles.inputField}
          placeholder="Type a message..."
        />
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={styles.inputField}
          placeholder="Enter your username"
        />

        <button onClick={sendMessage} className={styles.sendButton}>
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat;
