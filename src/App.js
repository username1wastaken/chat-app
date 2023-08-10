import "./App.css";
import Input from "./components/Input";
import Messages from "./components/Messages";
import { useState, useEffect, useRef } from "react";

function App() {
  function randomName() {
    const planets = [
      "Mercury",
      "Venus",
      "Earth",
      "Mars",
      "Jupiter",
      "Saturn",
      "Uranus",
      "Neptune",
    ];
    const planet = planets[Math.floor(Math.random() * planets.length)];

    return planet;
  }

  function randomColor() {
    return "#" + Math.floor(Math.random() * 0xffffff).toString(16);
  }

  const scaledroneId = "HlPzE975kwGRyhD0";

  const [messages, setMessages] = useState([]);
  const [member, setMember] = useState({
    username: randomName(),
    color: randomColor(),
  });

  const droneRef = useRef(
    new window.Scaledrone(scaledroneId, {
      data: member,
    })
  );

  useEffect(() => {
    const drone = droneRef.current.on("open", (error) => {
      if (error) {
        return console.error(error);
      }
      setMember((prevUser) => ({ ...prevUser, id: drone.clientId }));
    });

    const room = drone.subscribe("observable-jankoSoba");
    room.on("data", (data, member) => {
      setMessages((previous) => [
        ...previous,
        { id: Math.random(), member, text: data },
      ]);
    });
  }, []);

  const handleAddMessage = (message) => {
    droneRef.current.publish({
      room: "observable-jankoSoba",
      message,
    });
  };

  return (
    <div className="chatBox">
      <Messages messages={messages} currentMember={member} />
      <Input handleAddMessage={handleAddMessage} />
    </div>
  );
}

export default App;
