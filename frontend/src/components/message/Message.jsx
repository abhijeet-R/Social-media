import  './message.css'
import { format } from "timeago.js";

function Message({ message, own }) {
  return (
    <div className={own ? "message own" : "message"}>
        <div className="messageTop">
            <img src="https://boo-prod.b-cdn.net/database/profiles/17008434628257fdb7f94b3e57346a0a0044d9aece8ec.jpg" alt="" className="messageImg" />
            <p className="messageText">{message.text}</p>
        </div>
        <div className="messageBottom">{format(message.createdAt)}</div>
    </div>

  )
}

export default Message