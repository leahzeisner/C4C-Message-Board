import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {auth} from '../firebase/firebaseConfig';

export function Header({ username }) {
    const navigate = useNavigate();

    const logout = async(e) => {
        e.preventDefault();
        await signOut(auth);
        navigate("/");
      };

    return (
        <div>
            <div className='flow-root'>

                <div className='float-left flex flex-row ml-4 items-center mt-2'>
                    <img src={require("../img/c4c.png")} className="w-20" alt="C4C" />
                    <h2 className="ml-4 font-bold subpixel-antialiased text-2xl font-['Menlo']">Welcome <span className='text-blue-600'>{username}</span>!</h2>
                </div>

                <button className='float-right mr-4 mt-6 px-3 py-3 rounded-full bg-purple-700 text-white font-medium text-sm leading-snug uppercase shadow-md hover:bg-purple-800 hover:shadow-lg focus:bg-purple-800 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-900 active:shadow-lg transition duration-150 ease-in-out shadow-gray-400'
                    onClick={(e) => logout(e)}>Logout</button>
            </div>

            <div className='justify-center inline-block'>
                <h1 className="font-bold font-['Menlo'] text-white text-shadow shadow-pink-500 subpixel-antialiased text-4xl mb-8 w-fit">C4C Message Board</h1>
            </div>
        </div>
    )
}