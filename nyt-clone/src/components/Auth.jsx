// src/components/Auth.js
import { useState } from "react";
import { auth } from "../firebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  // Registrazione
  const handleRegister = async () => {
    setError("");
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
    } catch (err) {
      setError(err.message);
    }
  };

  // Login
  const handleLogin = async () => {
    setError("");
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
    } catch (err) {
      setError(err.message);
    }
  };

  // Logout
  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <div>
      <h2>{user ? `Welcome, ${user.email}` : "Login or Register"}</h2>

      {!user && (
        <>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
          <button onClick={handleRegister}>Register</button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </>
      )}

      {user && <button onClick={handleLogout}>Logout</button>}
    </div>
  );
};

export default Auth;
