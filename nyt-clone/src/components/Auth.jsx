import { useState, useEffect } from "react";
import { auth } from "../firebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { toast } from "react-toastify";  
import "react-toastify/dist/ReactToastify.css";  

const Auth = ({ setShowPopup }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  // Function to get error messages based on error codes
  const getErrorMessage = (errorCode) => {
    switch (errorCode) {
      case "auth/invalid-credential":
        return "The credentials provided are invalid. Please check your email and password.";
      case "auth/user-not-found":
        return "No user found with this email. Please register first.";
      case "auth/wrong-password":
        return "The password entered is incorrect. Please try again.";
      case "auth/email-already-in-use":
        return "This email is already in use. Please use a different email or log in.";
      default:
        return "An error occurred. Please try again later.";
    }
  };

  // Monitoring the authentication state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser);  
      } else {
        setUser(null);  
      }
    });

    return () => unsubscribe();  
  }, []);

  // Gestione della registrazione
  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");  // Clears the error before each attempt
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      toast.success("Registration successful! Welcome!");
      setShowPopup(false);  // Close the popup after registration
    } catch (err) {
      const errorMessage = getErrorMessage(err.code);
      setError(errorMessage);  // Error message
    }
  };

  // Login handler
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");  // Clears the error before each attempt
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      toast.success("Login successful!");  // success message
      setShowPopup(false);  // Close the popup after login
    } catch (err) {
      const errorMessage = getErrorMessage(err.code);
      setError(errorMessage);  // show the error message
    }
  };

  // Logout handler
  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);  
    toast.info("You have logged out.");  
  };

  return (
    <div>
      {/* If user already logged in */}
      {user ? (
        <>
          <h2>Welcome, {user.email}</h2>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          {/* Form */}
          <h3>Login or Register</h3>
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
                disabled={!email || !password} // Disabled if fields are empty
              >
                Login
              </button>
              <button
                type="button"
                onClick={handleRegister}
                disabled={!email || !password} // Disabled if fields are empty
              >
                Register
              </button>
            </div>
            {error && <p style={{ color: "red" }}>{error}</p>} {/* Shows the error  */}
          </form>
        </>
      )}
    </div>
  );
};

export default Auth;
