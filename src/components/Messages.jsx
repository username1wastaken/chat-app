import React from "react";

function Messages({ messages, currentMember }) {
  const displayMessage = function (message, i) {
    const { member, text } = message;
    console.log(member, text, currentMember);
    const checkCurrentMember = member && member.id === currentMember.id;
    const className = checkCurrentMember ? "currentMember" : "member";

    return (
      <div className={className} key={i}>
        <div
          className="memberIcon"
          style={{ backgroundColor: member.clientData.color }}
        ></div>
        <div className="textBox">
          <p className="memberName">{member.clientData.username}</p>
          <p className="text"> {text} </p>
        </div>
      </div>
    );
  };

  return (
    <div className="msgsContainer">
      {messages.map((message, i) => displayMessage(message, i))}
    </div>
  );
}

export default Messages;
