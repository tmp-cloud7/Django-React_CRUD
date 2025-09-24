// import React from "react";
// import "../styles/Record.css";

// function Record({ record, onDelete, onUpdate }) {
//     const formattedDate = new Date(record.creation_date).toLocaleDateString("en-US");

//     return (
//         <div className="record-container">
//             {record.picture && (
//                 <img 
//                     src={record.picture} 
//                     alt="Record" 
//                     className="record-image" 
//                 />
//             )}
//             <p className="record-title">{record.first_name} {record.last_name}</p>
//             <p className="record-content">{record.email}</p>
//             <p className="record-content">{record.phone}</p>
//             <p className="record-content">{record.address}</p>
//             <p className="record-content">{record.city}, {record.state}, {record.country}</p>
//             <p className="record-date">{formattedDate}</p>

//             <button 
//                 className="update-button" 
//                 onClick={() => onUpdate(record)}
//             >
//                 Update
//             </button>
//             <button 
//                 className="delete-button" 
//                 onClick={() => onDelete(record.id)}
//             >
//                 Delete
//             </button>
//         </div>
//     );
// }

// export default Record;
