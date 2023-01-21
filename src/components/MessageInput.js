import { useState, useRef } from 'react';
import { addDoc, collection } from "@firebase/firestore";
import {db} from '../firebase/firebaseConfig';
import { MESSAGES_COLLECTION } from '../utils/constants';
import { sortMessages } from '../utils/helpers';
import "firebase/auth";

const Filter = require('bad-words');
const filter = new Filter({ placeHolder: 'x'});

export function MessageInput({username, messages, setMessages}) {
    const [charCount, setCharCount] = useState(0);
    const dataRef = useRef();

    const onMessagePosted = (e) => {
        e.preventDefault();

        let msgPosted = dataRef.current.value;
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
        dataRef.current.value = "";

        updateMessagesInFirebase(messageData)
      }

    const updateMessagesInFirebase = (messageData) => {
        addDoc(collection(db, MESSAGES_COLLECTION), messageData)
        .catch((e) => {
          console.log(e);
        })
    }

    const updateCharCount = () => {
        const len = dataRef.current.value.length;
        if (len > 128) {
          dataRef.current.value = dataRef.current.value.substring(0, len - 1);
        } else {
          setCharCount(len);
        }
      }

    return (
        <div>
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
        </div>
    )
}