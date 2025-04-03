import { useState } from "react";
import { auth } from "../firebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  // Registrazione
  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
    } catch (err) {
      setError(err.message);
    }
  };

  // Login
  const handleLogin = async (e) => {
    e.preventDefault();
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
      <h2>{user ? `Welcome!` : ""}</h2>

      {!user && (
        <form>
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <button
              type="submit"
              onClick={handleLogin}
              disabled={!email || !password} // Disabilita il pulsante se i campi sono vuoti
            >
              Login
            </button>
            <button
              type="button"
              onClick={handleRegister}
              disabled={!email || !password} // Disabilita il pulsante se i campi sono vuoti
            >
              Register
            </button>
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
      )}

      {user && <button onClick={handleLogout}>Logout</button>}
    </div>
  );
};

export default Auth;
