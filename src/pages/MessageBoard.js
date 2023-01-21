import { useEffect, useState } from 'react';
import { collection, getDoc, getDocs, doc } from "@firebase/firestore";
import MessagesList from '../components/MessagesList';
import { db, useAuth } from '../firebase/firebaseConfig';
import { MESSAGES_COLLECTION, USERS_COLLECTION } from '../utils/constants';
import "firebase/auth";
import { Header } from '../components/Header';
import { MessageInput } from '../components/MessageInput';
import { sortMessages } from '../utils/helpers';

export default function MessageBoard() {
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");
  const getUser = useAuth().getUser;
  const email = getUser()?.email;


  useEffect(() => {
    const fetchName = async () => {
      const docRef = doc(db, USERS_COLLECTION, email);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        const username = data.username;
        setUsername(username);
      } else {
        setUsername(null);
      }
    }
    fetchName();
  }, [email])

  useEffect(() => {
    const fetchMessages = async () => {
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

  return (
    <div className="h-screen overflow-y-hidden bg-indigo-200 text-center">
      <Header username={username}></Header>
      <MessageInput username={username} messages={messages} setMessages={setMessages}></MessageInput>
      <MessagesList messages={messages}></MessagesList>
    </div>
  )
}