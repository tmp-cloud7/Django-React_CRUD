import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
// import "../styles/Form.css";
// import LoadingIndicator from "./LoadingIndicator";

function Form({ route, method }) {
  const [username, setUsername] = useState("");   // for register
  const [email, setEmail] = useState("");         // for register
  const [phone, setPhone] = useState("");         // for register
  const [identifier, setIdentifier] = useState(""); // for login (email/phone)
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const name = method === "login" ? "Login" : "Register";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let payload;

      if (method === "login") {
        // SimpleJWT expects "username"
        payload = { username: identifier, password };
        const res = await api.post(route, payload);

        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        navigate("/");
      } else {
        // Register first
        payload = { username, email, phone, password };
        await api.post(route, payload);

        // Then auto-login using username/password
        const loginRes = await api.post("/api/token/", {
          username,
          password,
        });

        localStorage.setItem(ACCESS_TOKEN, loginRes.data.access);
        localStorage.setItem(REFRESH_TOKEN, loginRes.data.refresh);
        navigate("/");
      }
    } catch (error) {
      alert("Something went wrong: " + error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h1>{name}</h1>

      {method === "register" ? (
        <>
          <input
            className="form-input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
          <input
            className="form-input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <input
            className="form-input"
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone"
          />
        </>
      ) : (
        <input
          className="form-input"
          type="text"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          placeholder="Email or Phone"
        />
      )}

      <input
        className="form-input"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />

      {loading && <div>Loading...</div>}
      <button className="form-button" type="submit">
        {name}
      </button>
    </form>
  );
}

export default Form;

// import { useState } from "react";
// import api from "../api";
// import { useNavigate } from "react-router-dom";
// import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
// // import "../styles/Form.css";
// // import LoadingIndicator from "./LoadingIndicator";

// function Form({ route, method }) {
//     const [username, setUsername] = useState("");   // for register only
//     const [email, setEmail] = useState("");         // for register only
//     const [phone, setPhone] = useState("");         // for register only
//     const [identifier, setIdentifier] = useState(""); // for login (email/phone)
//     const [password, setPassword] = useState("");
//     const [loading, setLoading] = useState(false);
//     const navigate = useNavigate();

//     const name = method === "login" ? "Login" : "Register";

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);

//         try {
//             let payload;

//             if (method === "login") {
//                 // SimpleJWT expects "username", so we send identifier as username
//                 payload = { username: identifier, password };
//             } else {
//                 payload = { username, email, phone, password };
//             }

//             const res = await api.post(route, payload);

//             if (method === "login") {
//                 localStorage.setItem(ACCESS_TOKEN, res.data.access);
//                 localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
//                 navigate("/");
//             } else {
//                 navigate("/login");
//             }
//         } catch (error) {
//             alert(error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit} className="form-container">
//             <h1>{name}</h1>

//             {method === "register" ? (
//                 <>
//                     <input
//                         className="form-input"
//                         type="text"
//                         value={username}
//                         onChange={(e) => setUsername(e.target.value)}
//                         placeholder="Username"
//                     />
//                     <input
//                         className="form-input"
//                         type="email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         placeholder="Email"
//                     />
//                     <input
//                         className="form-input"
//                         type="text"
//                         value={phone}
//                         onChange={(e) => setPhone(e.target.value)}
//                         placeholder="Phone"
//                     />
//                 </>
//             ) : (
//                 <input
//                     className="form-input"
//                     type="text"
//                     value={identifier}
//                     onChange={(e) => setIdentifier(e.target.value)}
//                     placeholder="Email or Phone"
//                 />
//             )}

//             <input
//                 className="form-input"
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="Password"
//             />

//             {loading && <LoadingIndicator />}
//             <button className="form-button" type="submit">
//                 {name}
//             </button>
//         </form>
//     );
// }

// export default Form;
