export function Messages({ messages }) {
    return (
        <ul>
            {
                messages.map((message, index) =>
                    <li key={index}>
                         <div> from : {message.sender}  at {message.time}</div>
                         <div>{message.content}</div>
                    </li>
                )
            }
        </ul>
    );
}