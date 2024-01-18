// // Your React component file
// import React from "react";

// const EmailSender = () => {
//   const sendEmail = async () => {
//     try {
//       const response = await fetch("/auth/send-email", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email: "user@example.com" }), // Replace with the actual email address
//       });

//       if (!response.ok) {
//         throw new Error("Failed to send email");
//       }

//       const result = await response.json();
//       console.log(result.message); // Handle the result as needed
//     } catch (error) {
//       console.error("Error sending email:", error);
//     }
//   };

//   return (
//     <div>
//       <button onClick={sendEmail}>Send Email</button>
//     </div>
//   );
// };

// export default EmailSender;

import React from "react";

const EmailSender = () => {
  return <div>EmailSender</div>;
};

export default EmailSender;
