import React, {useState, useEffect, useRef} from 'react';
import styled from "styled-components";
import ChatInput from './ChatInput';
import Messages from './Messages';
import { getAllMessagesRoute, sendMessageRoute } from '../utils/APIRoutes';
import axios from "axios";
import {v4 as uuidv4} from "uuid"

export default function ChatContainer({currentChat, currentUser, socket}) {

    const [messages, setMessages] = useState([]);
    const scrollRef = useRef();

    useEffect(() => {
        const fetchMessages = async () => {
          try {
            // Check if currentUser and currentChat exist
            if (currentUser?._id && currentChat?._id) {
              const response = await axios.post(getAllMessagesRoute, {
                from: currentUser._id,
                to: currentChat._id,
              });
              setMessages(response.data);
            }
          } catch (error) {
            // handle error
          }
        };
        fetchMessages();
      }, [currentChat]);
      
      

    const handleSendMsg = async (msg) => {
        await axios.post(sendMessageRoute, {
            from: currentUser._id,
            to: currentChat._id,
            message: msg,
        });
        socket.current.emit("send-msg", {
            to: currentChat._id,
            from: currentUser._id,
            messages: msg,
        });

        const msgs = [...messages];
        msgs.push({ fromSelf: true, message: msg });
        setMessages(msgs);
    };

    useEffect(() => {
        if(socket.current) {
            socket.current.on("msg-recieved", (msg) => {
                const msgs = [...messages];
                msgs.push({ fromSelf: false, message: msg });
                setMessages(msgs);
            });
        }
    }, [messages]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({behaviour: "smooth"});
    }, [messages]);

  return (
    <>
        { 
            currentChat && (
                <Container>
                    <div className='chat-header'>
                        <div className="user-details">
                            <div className="avatar">
                                <img 
                                    src={`data:image/svg+xml;base64,${currentChat.avatar}`}
                                    alt='avatar'
                                />
                            </div>
                            <div className="username">
                                <h2>{currentChat.username}</h2>
                            </div>
                        </div>
                    </div>
                    <div className="chat-messages">
                        {
                            messages.map((message) => {
                                return (
                                    <div ref={scrollRef} key={uuidv4()}>
                                        <div className={`message ${message.fromSelf ? "sended": "recieved"}`}>
                                            <div className="content">
                                                <p>
                                                    {message.message}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                    <ChatInput handleSendMsg={handleSendMsg}/>
                </Container>
            )
        }
    </>
  )
}

const Container = styled.div`
    display: grid;
    grid-template-rows: 10% 80% 10%;
    overflow: hidden;
    padding-top: 1rem;
    .chat-header {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 2rem;
        border-bottom: 3px solid;
        .user-details{
            display: flex;
            align-items: center;
            gap: 1rem;
            .avatar {
                img {
                    height: 3rem;
                }
            }
            .username {
                h2 {
                    color: black;
                }
            }
        }
    }
    .chat-messages {
        padding: 1rem 2rem;
        display: flex;
        flex-direction: column;
        gap: 0.8rem;
        overflow: auto;
        &::-webkit-scrollbar{
            width: 0.5rem;
            &-thumb {
                background-color: #B0E1FA90;
                width: 0.1rem;
                border-radius: 1rem;
            }
        }
        .message {
            display: flex;
            align-items: center;
            .content {
                max-width: 40%;
                overflow-wrap: break-word;
                padding: 0 1rem;
                font-size: 1.1rem;
                border-radius: 1rem;
                color: #02344D;
            }
        }
        .sended {
            justify-content: flex-end;
            .content{
                background-color: white;
            }
        }
        .recieved {
            justify-content: flex-start;
            .content{
                background-color: #B0E1FA90;
            }
        }
    }
`;