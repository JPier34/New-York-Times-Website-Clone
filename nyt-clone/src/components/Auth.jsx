import { useState, useEffect } from "react";
import { auth } from "../firebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { toast } from "react-toastify";  // Importa il toast
import "react-toastify/dist/ReactToastify.css";  // Importa il CSS per i toast

const Auth = ({ setShowPopup }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  // Funzione per mappare gli errori di Firebase a messaggi più comprensibili
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

  // Monitoraggio dello stato di autenticazione
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser);  // Se l'utente è loggato, impostalo nello stato
      } else {
        setUser(null);  // Se non c'è un utente loggato, azzera lo stato
      }
    });

    return () => unsubscribe();  // Pulizia dell'ascoltatore quando il componente viene smontato
  }, []);

  // Gestione della registrazione
  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");  // Pulisci l'errore prima di ogni tentativo
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      toast.success("Registration successful! Welcome!");
      setShowPopup(false);  // Chiudi il popup dopo la registrazione
    } catch (err) {
      const errorMessage = getErrorMessage(err.code);
      setError(errorMessage);  // Imposta il messaggio di errore
    }
  };

  // Gestione del login
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");  // Pulisci l'errore prima di ogni tentativo
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      toast.success("Login successful!");  // Mostra un messaggio di successo
      setShowPopup(false);  // Chiudi il popup dopo il login
    } catch (err) {
      const errorMessage = getErrorMessage(err.code);
      setError(errorMessage);  // Imposta il messaggio di errore
    }
  };

  // Gestione del logout
  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);  // Impostiamo l'utente su null dopo il logout
    toast.info("You have logged out.");  // Mostra il messaggio di logout
  };

  return (
    <div>
      {/* Se l'utente è loggato */}
      {user ? (
        <>
          <h2>Welcome, {user.email}</h2>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          {/* Form di login o registrazione */}
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
            {error && <p style={{ color: "red" }}>{error}</p>} {/* Mostra l'errore se presente */}
          </form>
        </>
      )}
    </div>
  );
};

export default Auth;
