import React, { useState } from "react";
import Sidebar from "./SideBar";

const petData = [
  {
    id: "#PET-0001",
    petName: "Bella",
    species: "Dog",
    owner: "Maria Gonzales",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    id: "#PET-0002",
    petName: "Max",
    species: "Cat",
    owner: "John Carter",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    id: "#PET-0003",
    petName: "Whiskers",
    species: "Cat",
    owner: "Emily Wong",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
  },
  {
    id: "#PET-0004",
    petName: "Rocky",
    species: "Dog",
    owner: "David Lee",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
  },
  {
    id: "#PET-0005",
    petName: "Chirpy",
    species: "Bird",
    owner: "Sophia Johnson",
    image: "https://randomuser.me/api/portraits/women/5.jpg",
  },
  {
    id: "#PET-0006",
    petName: "Shadow",
    species: "Dog",
    owner: "James Allen",
    image: "https://randomuser.me/api/portraits/men/6.jpg",
  },
  {
    id: "#PET-0007",
    petName: "Luna",
    species: "Cat",
    owner: "Isabella Turner",
    image: "https://randomuser.me/api/portraits/women/7.jpg",
  },
  {
    id: "#PET-0008",
    petName: "Tweety",
    species: "Bird",
    owner: "Michael Brown",
    image: "https://randomuser.me/api/portraits/men/8.jpg",
  },
  {
    id: "#PET-0009",
    petName: "Coco",
    species: "Dog",
    owner: "Emma Davis",
    image: "https://randomuser.me/api/portraits/women/9.jpg",
  },
  {
    id: "#PET-0010",
    petName: "Tiger",
    species: "Cat",
    owner: "Noah Wilson",
    image: "https://randomuser.me/api/portraits/men/10.jpg",
  },
];

const Chatlist = () => {
  const [selectedPet, setSelectedPet] = useState(null);
  const [inputMessage, setInputMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [chatMessages, setChatMessages] = useState(
    petData.reduce((acc, pet) => {
      acc[pet.id] = [
        { text: `Hi, this is ${pet.owner}.`, from: "owner" },
        { text: `Hello ${pet.owner}, how is ${pet.petName}?`, from: "vet" },
      ];
      return acc;
    }, {})
  );

  const [unreadCounts, setUnreadCounts] = useState(
    petData.reduce((acc, pet) => {
      acc[pet.id] = 1;
      return acc;
    }, {})
  );

  const handleSelectPet = (pet) => {
    setSelectedPet(pet);
    setUnreadCounts((prev) => ({ ...prev, [pet.id]: 0 }));
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim() || !selectedPet) return;
    const newMsg = { text: inputMessage.trim(), from: "vet" };
    const petId = selectedPet.id;
    setChatMessages((prev) => ({
      ...prev,
      [petId]: [...prev[petId], newMsg],
    }));
    setInputMessage("");
  };

  const filteredPets = petData.filter((pet) =>
    pet.owner.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const unmatchedPets = petData.filter(
    (pet) => !pet.owner.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const combinedPetList = [...filteredPets, ...unmatchedPets];

  return (
    <div className="flex min-h-screen bg-blue-50 font-sans">
      <Sidebar />
      <main className="flex flex-1 p-6">
        {/* Sidebar chat list */}
        <div className="w-80 border-r border-gray-300 p-4 bg-white overflow-y-auto max-h-[calc(100vh-3rem)] ">
          <h2 className="text-xl font-bold mb-4">Chats</h2>

          {/* Search Bar */}
          <div className="relative mb-4">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search or start a new chat..."
              className="px-3 py-2 pr-10 border rounded w-full"
            />
            <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none text-gray-400">
              <svg
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 12 12"
                width="1em"
                height="1em"
              >
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M8.5 5.5a3 3 0 1 1-6 0a3 3 0 0 1 6 0m-.393 3.668a4.5 4.5 0 1 1 1.06-1.06l2.613 2.612a.75.75 0 1 1-1.06 1.06z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
          </div>

          {combinedPetList.map((pet) => {
            const messages = chatMessages[pet.id];
            const lastMessage = messages[messages.length - 1]?.text || "";
            return (
              <div
                key={pet.id}
                onClick={() => handleSelectPet(pet)}
                className="cursor-pointer p-3 mb-2 bg-blue-50 rounded-lg shadow hover:bg-gray-100 flex items-start gap-3 relative"
              >
                <img
                  src={pet.image}
                  alt={pet.owner}
                  className="w-10 h-10 rounded-full object-cover mt-1"
                />
                <div className="flex-1">
                  <p className="font-semibold">{pet.owner}</p>
                  <p className="text-sm text-gray-500 truncate max-w-[200px]">
                    {lastMessage}
                  </p>
                </div>
                {unreadCounts[pet.id] > 0 && (
                  <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                    {unreadCounts[pet.id]}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Chat area */}
        <div className="flex-1 flex flex-col bg-gray-50">
          {selectedPet ? (
            <>
              {/* Header */}
              <div className="border-b px-6 py-4 shadow bg-white flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={selectedPet.image}
                    alt={selectedPet.owner}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <span className="text-base font-semibold">
                    Chat with {selectedPet.owner}
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  {/* Icons */}
                  <button
                    title="Video Call"
                    className="text-gray-600 hover:text-blue-600 bg-slate-200 rounded p-1"
                  >
                    <svg
                      className="w-6 h-6"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="m17 9.2l5.213-3.65a.5.5 0 0 1 .787.41v12.08a.5.5 0 0 1-.787.41L17 14.8V19a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1z" />
                    </svg>
                  </button>

                  <button
                    title="Voice Call"
                    className="text-gray-600 hover:text-blue-600 bg-slate-200 rounded p-1"
                  >
                    <svg
                      className="w-6 h-6"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.98.98 0 0 0-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02c-.37-1.11-.56-2.3-.56-3.53c0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99C3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99" />
                    </svg>
                  </button>

                  <button
                    title="More Options"
                    className="text-gray-600 hover:text-blue-600 bg-slate-200 rounded p-1"
                  >
                    <svg
                      className="w-6 h-6"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M10 10h4v4h-4zm0-6h4v4h-4zm0 12h4v4h-4z" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 p-6 overflow-y-auto space-y-3 flex flex-col">
                {chatMessages[selectedPet.id].map((msg, idx) => (
                  <div
                    key={idx}
                    className={`max-w-sm px-4 py-2 rounded-lg ${
                      msg.from === "vet"
                        ? "bg-blue-500 text-white self-end ml-auto"
                        : "bg-gray-200 text-gray-800 self-start"
                    }`}
                  >
                    {msg.text}
                  </div>
                ))}
              </div>

              {/* Input */}
              {/* <div className="p-4 border-t flex gap-2 bg-white">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 border rounded"
                />
                <button
                  onClick={handleSendMessage}
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Send
                </button>
              </div> */}
              <div className="p-4 border-t flex items-center gap-3 bg-white">
                {/* Emoji icon */}
                <button className="text-gray-500 hover:text-gray-700">
                  <svg
                    className="w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    width="1em"
                    height="1em"
                  >
                    <g fill="currentColor">
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"></path>
                      <path d="M4.285 9.567a.5.5 0 0 1 .683.183A3.5 3.5 0 0 0 8 11.5a3.5 3.5 0 0 0 3.032-1.75a.5.5 0 1 1 .866.5A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1-3.898-2.25a.5.5 0 0 1 .183-.683M7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5m4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5"></path>
                    </g>
                  </svg>
                </button>

                {/* Attachment icon */}
                <button className="text-gray-500 hover:text-gray-700">
                  <svg
                    className="w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    width="1em"
                    height="1em"
                  >
                    <path
                      fill="currentColor"
                      d="M10.404 5.11L9.389 4.096L4.314 9.17a2.152 2.152 0 1 0 3.045 3.044l6.09-6.089a3.588 3.588 0 0 0-5.075-5.074L1.98 7.444l-.014.013c-1.955 1.955-1.955 5.123 0 7.077s5.123 1.954 7.078 0l.013-.014l.001.001l4.365-4.364l-1.015-1.014l-4.365 4.363l-.013.013a3.573 3.573 0 0 1-5.048 0a3.57 3.57 0 0 1 .014-5.06l-.001-.001L9.39 2.065c.839-.84 2.205-.84 3.045 0s.839 2.205 0 3.044l-6.09 6.089a.718.718 0 0 1-1.015-1.014l5.075-5.075z"
                    ></path>
                  </svg>
                </button>

                {/* Message input */}
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Type a message"
                  className="flex-1 px-4 py-2 border rounded focus:outline-none"
                />

                {/* Microphone icon */}
                <button className="text-gray-500 hover:text-gray-700">
                  <svg
                    className="w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="1em"
                    height="1em"
                  >
                    <path
                      fill="currentColor"
                      d="M12 15c1.66 0 2.99-1.34 2.99-3L15 6c0-1.66-1.34-3-3-3S9 4.34 9 6v6c0 1.66 1.34 3 3 3m5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 15 6.7 12H5c0 3.42 2.72 6.23 6 6.72V22h2v-3.28c3.28-.48 6-3.3 6-6.72z"
                    ></path>
                  </svg>
                </button>

                {/* Send button */}
                <button
                  onClick={handleSendMessage}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Send
                </button>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-600 text-lg">
              Select a chat to start messaging
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Chatlist;

//without unread badge
// import React, { useState } from "react";
// import Sidebar from "./SideBar";

// const petData = [
//   {
//     id: "#PET-0001",
//     petName: "Bella",
//     species: "Dog",
//     owner: "Maria Gonzales",
//     image: "https://randomuser.me/api/portraits/women/1.jpg",
//   },
//   {
//     id: "#PET-0002",
//     petName: "Max",
//     species: "Cat",
//     owner: "John Carter",
//     image: "https://randomuser.me/api/portraits/men/2.jpg",
//   },
//   {
//     id: "#PET-0003",
//     petName: "Whiskers",
//     species: "Cat",
//     owner: "Emily Wong",
//     image: "https://randomuser.me/api/portraits/women/3.jpg",
//   },
//   {
//     id: "#PET-0004",
//     petName: "Rocky",
//     species: "Dog",
//     owner: "David Lee",
//     image: "https://randomuser.me/api/portraits/men/4.jpg",
//   },
//   {
//     id: "#PET-0005",
//     petName: "Chirpy",
//     species: "Bird",
//     owner: "Sophia Johnson",
//     image: "https://randomuser.me/api/portraits/women/5.jpg",
//   },
//   {
//     id: "#PET-0001",
//     petName: "Bella",
//     species: "Dog",
//     owner: "Maria Gonzales",
//     image: "https://randomuser.me/api/portraits/women/1.jpg",
//   },
// ];

// const Chatlist = () => {
//   const [selectedPet, setSelectedPet] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [inputMessage, setInputMessage] = useState("");

//   const handleSendMessage = () => {
//     if (inputMessage.trim() === "") return;
//     setMessages([...messages, { text: inputMessage, from: "vet" }]);
//     setInputMessage("");
//   };

//   return (
//     <div className="flex min-h-screen bg-blue-50 font-sans">
//       <Sidebar />
//       <main className="flex flex-1 p-6">
//         {/* Chat list */}

//         <div className="w-80 border-r border-gray-300 p-4 overflow-y-auto bg-white">
//           <h2 className="text-xl font-bold mb-4">Pet Owners Chats</h2>
//           {petData.map((pet, index) => (
//             <div
//               key={index}
//               onClick={() => {
//                 setSelectedPet(pet);
//                 setMessages([
//                   { text: `Hi, this is ${pet.owner}.`, from: "owner" },
//                   {
//                     text: `Hello ${pet.owner}, how is ${pet.petName}?`,
//                     from: "vet",
//                   },
//                 ]);
//               }}
//               className="cursor-pointer p-3 mb-2 bg-blue-50 rounded-lg shadow hover:bg-gray-100 flex items-center gap-3"
//             >
//               <img
//                 src={pet.image}
//                 alt={pet.owner}
//                 className="w-10 h-10 rounded-full object-cover"
//               />
//               <div>
//                 <p className="font-semibold">{pet.owner}</p>
//                 {/* <p className="text-sm text-gray-600">
//                   {pet.petName} • {pet.species}
//                 </p> */}
//               </div>
//             </div>
//           ))}
//         </div>
//         {/* Chat message view */}
//         <div
//           className={`transition-all duration-300 ${
//             selectedPet ? "flex-1" : "flex-1 max-w-[calc(100%-20rem)]"
//           } flex flex-col`}
//         >
//           {selectedPet ? (
//             <>
//               {/* Chat header with image, name, video call and options */}
//               <div className="border-b px-6 py-4 shadow bg-white flex items-center justify-between">
//                 <div className="flex items-center gap-3">
//                   <img
//                     src={selectedPet.image}
//                     alt={selectedPet.owner}
//                     className="w-10 h-10 rounded-full object-cover"
//                   />
//                   <span className="text-base font-semibold">
//                     Chat with {selectedPet.owner}
//                   </span>
//                 </div>
//                 <div className="flex items-center gap-4">
//                   {/* Video Call Icon */}
//                   <button
//                     title="Video Call"
//                     className="text-gray-600 hover:text-blue-600  bg-slate-200 rounded p-1"
//                   >
//                     <svg
//                       className="w-6 h-6"
//                       xmlns="http://www.w3.org/2000/svg"
//                       viewBox="0 0 24 24"
//                       width="1em"
//                       height="1em"
//                     >
//                       <path
//                         fill="currentColor"
//                         d="m17 9.2l5.213-3.65a.5.5 0 0 1 .787.41v12.08a.5.5 0 0 1-.787.41L17 14.8V19a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1z"
//                       ></path>
//                     </svg>
//                   </button>

//                   {/* Voice Call Icon */}
//                   <button
//                     title="Voice Call"
//                     className="text-gray-600 hover:text-blue-600  bg-slate-200 rounded p-1"
//                   >
//                     <svg
//                       className="w-6 h-6"
//                       xmlns="http://www.w3.org/2000/svg"
//                       viewBox="0 0 24 24"
//                       width="1em"
//                       height="1em"
//                     >
//                       <path
//                         fill="currentColor"
//                         d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.98.98 0 0 0-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02c-.37-1.11-.56-2.3-.56-3.53c0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99C3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99"
//                       ></path>
//                     </svg>
//                   </button>

//                   {/* Three Dots */}
//                   <button
//                     title="More Options"
//                     className="text-gray-600 hover:text-blue-600 bg-slate-200 rounded p-1"
//                   >
//                     <svg
//                       className="w-6 h-6"
//                       xmlns="http://www.w3.org/2000/svg"
//                       viewBox="0 0 24 24"
//                       width="1em"
//                       height="1em"
//                     >
//                       <path
//                         fill="currentColor"
//                         d="M10 10h4v4h-4zm0-6h4v4h-4zm0 12h4v4h-4z"
//                       ></path>
//                     </svg>
//                   </button>
//                 </div>
//               </div>

//               {/* Messages */}
//               <div className="flex-1 p-6 overflow-y-auto space-y-3 bg-gray-50">
//                 {messages.map((msg, idx) => (
//                   <div
//                     key={idx}
//                     className={`max-w-sm px-4 py-2 rounded-lg ${
//                       msg.from === "vet"
//                         ? "bg-blue-500 text-white self-end"
//                         : "bg-gray-200 text-gray-800 self-start"
//                     }`}
//                   >
//                     {msg.text}
//                   </div>
//                 ))}
//               </div>

//               {/* Message input */}
//               <div className="p-4 border-t flex gap-2 bg-white">
//                 <input
//                   type="text"
//                   value={inputMessage}
//                   onChange={(e) => setInputMessage(e.target.value)}
//                   onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
//                   placeholder="Type your message..."
//                   className="flex-1 px-4 py-2 border rounded"
//                 />
//                 <button
//                   onClick={handleSendMessage}
//                   className="bg-blue-600 text-white px-4 py-2 rounded"
//                 >
//                   Send
//                 </button>
//               </div>
//             </>
//           ) : (
//             <div className="flex-1 flex items-center justify-center text-gray-600 text-lg">
//               Select a chat to start messaging
//             </div>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Chatlist;

// without icons
// import React, { useState } from "react";
// import Sidebar from "./SideBar";

// // Updated petData with image URLs
// const petData = [
//   {
//     id: "#PET-0001",
//     petName: "Bella",
//     species: "Dog",
//     owner: "Maria Gonzales",
//     image: "https://randomuser.me/api/portraits/women/1.jpg",
//   },
//   {
//     id: "#PET-0002",
//     petName: "Max",
//     species: "Cat",
//     owner: "John Carter",
//     image: "https://randomuser.me/api/portraits/men/2.jpg",
//   },
//   {
//     id: "#PET-0003",
//     petName: "Whiskers",
//     species: "Cat",
//     owner: "Emily Wong",
//     image: "https://randomuser.me/api/portraits/women/3.jpg",
//   },
//   {
//     id: "#PET-0004",
//     petName: "Rocky",
//     species: "Dog",
//     owner: "David Lee",
//     image: "https://randomuser.me/api/portraits/men/4.jpg",
//   },
//   {
//     id: "#PET-0005",
//     petName: "Chirpy",
//     species: "Bird",
//     owner: "Sophia Johnson",
//     image: "https://randomuser.me/api/portraits/women/5.jpg",
//   },
// ];

// const Chatlist = () => {
//   const [selectedPet, setSelectedPet] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [inputMessage, setInputMessage] = useState("");

//   const handleSendMessage = () => {
//     if (inputMessage.trim() === "") return;
//     setMessages([...messages, { text: inputMessage, from: "vet" }]);
//     setInputMessage("");
//   };

//   return (
//     <div className="flex min-h-screen bg-blue-50 font-sans">
//       <Sidebar />
//       <main className="flex flex-1 p-6">
//         {/* Chat list */}
//         <div className="w-80 border-r border-gray-300 p-4 overflow-y-auto bg-white">
//           <h2 className="text-xl font-bold mb-4">Pet Owners Chats</h2>
//           {petData.map((pet, index) => (
//             <div
//               key={index}
//               onClick={() => {
//                 setSelectedPet(pet);
//                 setMessages([
//                   { text: `Hi, this is ${pet.owner}.`, from: "owner" },
//                   {
//                     text: `Hello ${pet.owner}, how is ${pet.petName}?`,
//                     from: "vet",
//                   },
//                 ]);
//               }}
//               className="cursor-pointer p-3 mb-2 bg-blue-50 rounded-lg shadow hover:bg-gray-100 flex items-center gap-3"
//             >
//               <img
//                 src={pet.image}
//                 alt={pet.owner}
//                 className="w-10 h-10 rounded-full object-cover"
//               />
//               <div>
//                 <p className="font-semibold">{pet.owner}</p>
//                 <p className="text-sm text-gray-600">
//                   {pet.petName} • {pet.species}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Chat message view */}
//         <div
//           className={`transition-all duration-300 ${
//             selectedPet ? "flex-1" : "flex-1 max-w-[calc(100%-20rem)]"
//           } flex flex-col`}
//         >
//           {selectedPet ? (
//             <>
//               {/* Chat header with image and name */}
//               <div className="border-b px-6 py-4 shadow text-xl font-bold bg-white flex items-center gap-3">
//                 <img
//                   src={selectedPet.image}
//                   alt={selectedPet.owner}
//                   className="w-10 h-10 rounded-full object-cover"
//                 />
//                 <span>Chat with {selectedPet.owner}</span>
//               </div>

//               {/* Messages */}
//               <div className="flex-1 p-6 overflow-y-auto space-y-3 bg-gray-50">
//                 {messages.map((msg, idx) => (
//                   <div
//                     key={idx}
//                     className={`max-w-sm px-4 py-2 rounded-lg ${
//                       msg.from === "vet"
//                         ? "bg-blue-500 text-white self-end"
//                         : "bg-gray-200 text-gray-800 self-start"
//                     }`}
//                   >
//                     {msg.text}
//                   </div>
//                 ))}
//               </div>

//               {/* Message input */}
//               <div className="p-4 border-t flex gap-2 bg-white">
//                 <input
//                   type="text"
//                   value={inputMessage}
//                   onChange={(e) => setInputMessage(e.target.value)}
//                   onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
//                   placeholder="Type your message..."
//                   className="flex-1 px-4 py-2 border rounded"
//                 />
//                 <button
//                   onClick={handleSendMessage}
//                   className="bg-blue-600 text-white px-4 py-2 rounded"
//                 >
//                   Send
//                 </button>
//               </div>
//             </>
//           ) : (
//             <div className="flex-1 flex items-center justify-center text-gray-600 text-lg">
//               Select a chat to start messaging
//             </div>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Chatlist;

// pink color and different
// import React, { useState } from "react";
// import Sidebar from "./SideBar";

// const petData = [
//   {
//     id: "#PET-0001",
//     petName: "Bella",
//     species: "Dog",
//     owner: "Maria Gonzales",
//     image: "https://randomuser.me/api/portraits/women/1.jpg",
//     unread: 2,
//   },
//   {
//     id: "#PET-0002",
//     petName: "Max",
//     species: "Cat",
//     owner: "John Carter",
//     image: "https://randomuser.me/api/portraits/men/2.jpg",
//     unread: 0,
//   },
//   {
//     id: "#PET-0003",
//     petName: "Whiskers",
//     species: "Cat",
//     owner: "Emily Wong",
//     image: "https://randomuser.me/api/portraits/women/3.jpg",
//     unread: 1,
//   },
// ];

// const Chatlist = () => {
//   const [selectedPet, setSelectedPet] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [inputMessage, setInputMessage] = useState("");

//   const handleSendMessage = () => {
//     if (inputMessage.trim() === "") return;
//     setMessages([...messages, { text: inputMessage, from: "vet" }]);
//     setInputMessage("");
//   };

//   const handleSelectPet = (pet) => {
//     setSelectedPet(pet);
//     setMessages([
//       {
//         text: `Hi! I'm interested in the listing for ${pet.petName}.`,
//         from: "owner",
//       },
//       {
//         text: `Hi there! Sure, I can help. What would you like to know about ${pet.petName}?`,
//         from: "vet",
//       },
//     ]);
//   };

//   return (
//     <div className="flex min-h-screen font-sans bg-pink-50">
//       <Sidebar />

//       <main className="flex flex-1">
//         {/* Left Panel - Messages */}
//         <div className="w-96 bg-white border-r p-6">
//           <h2 className="text-2xl font-bold mb-6">Messages</h2>
//           <div className="space-y-4 overflow-y-auto h-[80vh] pr-2">
//             {petData.map((pet, index) => (
//               <div
//                 key={index}
//                 onClick={() => handleSelectPet(pet)}
//                 className="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-gray-100 transition"
//               >
//                 <img
//                   src={pet.image}
//                   alt={pet.owner}
//                   className="w-12 h-12 rounded-full object-cover"
//                 />
//                 <div className="flex-1">
//                   <p className="font-semibold">{pet.owner}</p>
//                   <p className="text-sm text-gray-500 truncate">
//                     {pet.petName} • {pet.species}
//                   </p>
//                 </div>
//                 {pet.unread > 0 && (
//                   <span className="text-sm bg-pink-500 text-white rounded-full px-2 py-0.5">
//                     {pet.unread}
//                   </span>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Right Panel - Chat View */}
//         <div className="flex-1 flex flex-col bg-white">
//           {selectedPet ? (
//             <>
//               {/* Header */}
//               <div className="flex items-center justify-between border-b p-5 bg-white shadow-sm">
//                 <div className="flex items-center gap-3">
//                   <img
//                     src={selectedPet.image}
//                     className="w-10 h-10 rounded-full"
//                     alt={selectedPet.owner}
//                   />
//                   <div>
//                     <p className="font-semibold text-lg">{selectedPet.owner}</p>
//                     <p className="text-sm text-gray-500">
//                       {selectedPet.petName} • {selectedPet.species}
//                     </p>
//                   </div>
//                 </div>
//                 <div className="flex gap-3">
//                   <button className="text-gray-500 hover:text-black">📞</button>
//                   <button className="text-gray-500 hover:text-black">📍</button>
//                 </div>
//               </div>

//               {/* Messages */}
//               <div className="flex-1 p-6 space-y-4 overflow-y-auto bg-gray-50">
//                 {messages.map((msg, idx) => (
//                   <div
//                     key={idx}
//                     className={`max-w-md px-4 py-2 rounded-lg ${
//                       msg.from === "vet"
//                         ? "bg-pink-500 text-white self-end"
//                         : "bg-gray-200 text-gray-800 self-start"
//                     }`}
//                   >
//                     {msg.text}
//                   </div>
//                 ))}
//               </div>

//               {/* Input */}
//               <div className="border-t p-4 flex items-center gap-2 bg-white">
//                 <input
//                   value={inputMessage}
//                   onChange={(e) => setInputMessage(e.target.value)}
//                   onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
//                   placeholder="Type your message..."
//                   className="flex-1 border rounded px-4 py-2"
//                 />
//                 <button
//                   onClick={handleSendMessage}
//                   className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
//                 >
//                   Send
//                 </button>
//               </div>
//             </>
//           ) : (
//             <div className="flex-1 flex items-center justify-center text-gray-400 text-lg">
//               Select a message to start chatting
//             </div>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Chatlist;
