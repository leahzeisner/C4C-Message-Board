import { useEffect, useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { addDoc, collection, getDoc, getDocs, doc } from "@firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";
import MessagesList from '../components/MessagesList';
import {db, auth} from '../firebase/firebaseConfig';
import { MESSAGES_COLLECTION, USERS_COLLECTION } from '../utils/constants';
import "firebase/auth";

const Filter = require('bad-words');
const filter = new Filter({ placeHolder: 'x'});


export default function MessageBoard() {
    const [messages, setMessages] = useState([]);
    const [username, setUsername] = useState("");
    const [charCount, setCharCount] = useState(0);
    const dataRef = useRef();
    const navigate = useNavigate();

    useEffect(() => {
      fetchName();
    }, [])

    const fetchName = async() => {
      const userEmail = auth.currentUser.email;
      const docRef = doc(db, USERS_COLLECTION, userEmail);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        const username = data.username;
        setUsername(username);
      } else {
        setUsername(null);
      }
    }
  
    useEffect(() => {
      const fetchMessages = async() => {
        getDocs(collection(db, MESSAGES_COLLECTION))
        .then((querySnapshot) => {
          let newMsgData = querySnapshot.docs.map((doc) => ({
            ...doc.data()
          }));
          newMsgData = sortMessages(newMsgData);
          setMessages(newMsgData);                
        });
      }
      fetchMessages();
    }, [])
  
    const sortMessages = (messages) => {
      return messages.sort((msg1, msg2) => {
        if (msg1.timestamp < msg2.timestamp) {
          return 1;
        } else if (msg1.timestamp > msg2.timestamp) {
          return -1;
        } else {
          return 0;
        }
      })
    }
  
    const onMessagePosted = (e) => {
        e.preventDefault();

        let msgPosted = "" + dataRef.current.value;
        if (msgPosted.length === 0) {
          return;
        }
    
        let messageData = {
          text: filter.clean(dataRef.current.value),
          timestamp: Date.now(),
          author: username
        }

        const updatedMessages = sortMessages([...messages, messageData]);
        setMessages(updatedMessages);
        setCharCount(0);

        addDoc(collection(db, MESSAGES_COLLECTION), messageData)
        .catch((e) => {
          console.log(e);
        })
      

        dataRef.current.value = "";
      }

    const logout = async(e) => {
      e.preventDefault();
      await signOut(auth);
      navigate("/");
    };

    const updateCharCount = () => {
      const len = ("" + dataRef.current.value).length;
      if (len > 128) {
        dataRef.current.value = dataRef.current.value.substring(0, len - 1);
      } else {
        setCharCount(len);
      }
    }


    return (
        <div className="h-screen overflow-y-hidden bg-indigo-200 text-center">
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
            
          
            <form onSubmit={onMessagePosted}>
                <div className='mb-2'>
                    <input
                        type="text"
                        ref={dataRef}
                        onInput={updateCharCount}
                        className="form-control mr-4 w-2/5 px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none shadow-sm shadow-gray-400"
                        id="messageInput"
                        placeholder="Post message" />
                    <button className='inline-block px-7 py-3 bg-blue-600 text-white font-bold text-sm leading-snug uppercase rounded shadow-md shadow-gray-400 hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out' 
                            type="submit">
                              Post
                    </button>
                </div>
                <div className='flex justify-center'>
                  <div className="mb-8 text-xs flex content-center w-1/2 pl-5">
                    Character count: {charCount}
                  </div>
                </div>
    
            </form>


            <MessagesList messages={messages}></MessagesList>
            
        </div>
    )
}