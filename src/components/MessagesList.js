import Message from './Message';

export default function messagesList({messages}) {

    const getMessages = () => {
        return messages.map((msg, i) => {
            return <Message key={i} message={msg}></Message>
        })
    }

    return (
        <div className="text-center justify-center inline-block w-6/12 h-2/3 overflow-y-auto">
            {getMessages()}
        </div>
    )
}