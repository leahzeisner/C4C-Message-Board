export default function Message({ message }) {
    const dateTime = new Date(message.timestamp);
    const dateTimeStr = dateTime.toLocaleDateString() + ", " + dateTime.toLocaleTimeString();

    return (
        <div className="bg-pink-50 border-x border-y border-gray-600 py-2 shadow-md shadow-gray-400 mb-8 rounded-xl">
            <div className="flex flex-wrap break-words text-left text-xl mb-4 mx-4">
                {message.text}
            </div>


            <div className="flex flex-row">
                <div className="w-1/2 text-base text-left text-blue-800 ml-4">
                    -{message.author}
                </div>

                <div className="w-1/2 text-xs text-right mr-4 text-gray-700">
                    <b>{dateTimeStr}</b>
                </div>
            </div>
        </div>
    )
}