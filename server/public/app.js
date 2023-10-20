const socket = io("ws://localhost:3500");
const msgInput = document.getElementById("message");
const nameInput = document.getElementById("name");
const chatRoom = document.getElementById("room");
const activity = document.querySelector(".activity");
const userList = document.querySelector(".user-list");
const roomList = document.querySelector(".room-list");
const chatDisplay = document.querySelector(".chat-display");

function sendMessage(e) {
  e.preventDefault();
  if (msgInput.value && chatRoom.value && nameInput.value) {
    socket.emit("message", {
      text: msgInput.value,
      name: nameInput.value,
    });
    msgInput.value = "";
  }
  msgInput.focus();
}
function enterRoom(e){
  e.preventDefault();
  if(chatRoom.value && nameInput.value){
    socket.emit("enterRoom", {
      name: nameInput.value,
      room: chatRoom.value
    });
  }

}

document.querySelector("form").addEventListener("submit", sendMessage);

// Listen for messages
socket.on("message", (data) => {
  const li = document.createElement("li");
  li.textContent = data;
  document.querySelector("ul").appendChild(li);
});

msgInput.addEventListener("keypress", () => {
  socket.emit("activity", socket.id.substring(0, 5));
});

let activityTimer;
socket.on("activity", (name) => {
  activity.textContent = `${name} is typing...`;

  // Clear after 3 seconds
  clearTimeout(activityTimer);
  activityTimer = setTimeout(() => {
    activity.textContent = "";
  }, 3000);
});
