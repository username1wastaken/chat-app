import React, { useState } from "react";

function Input({ handleAddMessage }) {
  const [text, setText] = useState("");
  const handleSubmit = function (e) {
    e.preventDefault();
    if (text.trim() !== "") {
      handleAddMessage(text);
      setText("");
    }
  };

  return (
    <div className="chatInput">
      <form onSubmit={handleSubmit}>
        <input
          className="input"
          type="text"
          placeholder="Type a message"
          autoFocus={true}
          spellCheck="false"
          onChange={(e) => setText(e.target.value)}
          value={text}
        />
        <button type="submit" className="button">
          Send
        </button>
      </form>
    </div>
  );
}

export default Input;
