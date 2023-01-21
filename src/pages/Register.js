import React, { useEffect, useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, setDoc } from "@firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import {db, auth} from '../firebase/firebaseConfig';

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();


  useEffect(() => {
    if (loading) {
        return;
    }
    if (user) {
        navigate("/messageBoard");
    }
    if (error) {
        navigate("/register");
    }
  });

  const registerWithEmailAndPassword = async (username, email, password) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;
      const docRef = await doc(db, "users", email);
      const userData = {
        uid: user.uid,
        username,
        authProvider: "local",
        email,
      }
      await setDoc(docRef, userData);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };


  return (
    <div className="h-screen bg-indigo-200">
      <div className="px-6 h-full text-gray-800">
        <div className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6">

            <div className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-3/12 lg:w-4/12 md:w-6/12 mb-12 md:mb-0">
                <img src={require("../img/c4c.png")} className="w-full" alt="C4C" />
            </div>

            <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
                <form>

                    <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-600 before:mt-0.5 after:flex-1 after:border-t after:border-gray-600 after:mt-0.5">
                      <p className="text-center font-mono font-semibold text-xl mx-4 mb-0">Register</p>
                    </div>


                    <div className="mb-6">
                        <input
                            type="text"
                            className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            id="registerEmailInput"
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email address" />
                    </div>

                    <div className="mb-6">
                        <input
                            type="text"
                            className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            id="registerUsernameInput"
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Username" />
                    </div>

                    <div className="mb-6">
                        <input
                            type="password"
                            className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            id="registerPasswordInput"
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password" />
                    </div>

                    <div className="text-center lg:text-left">
                        <button type="button" className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out" onClick={() => registerWithEmailAndPassword(username, email, password)}>
                            Register
                        </button>
                        <p className="text-sm font-semibold mt-2 pt-1 mb-0"> 
                            Already have an account?    
                            <Link className="text-pink-700 hover:text-pink-800 focus:text-pink-800 transition duration-200 ease-in-out mx-2" to="/">Login now.</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
      </div>
    </div>
  );
}