import React, {useState} from 'react';
import styled from "styled-components";
import Picker from "emoji-picker-react";
import {IoMdSend} from "react-icons/io";
import {BsEmojiSmileFill} from "react-icons/bs";

export default function ChatInput({handleSendMsg}) {


    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [msg, setMsg] = useState("");

    const handleEmojiPIckerHideShow = () => {
        setShowEmojiPicker(!showEmojiPicker);
    }

    const handleEmojiCLick = (emojiObject) => {
        setMsg((prevMsg) => prevMsg + emojiObject.emoji);
    }
    
    const sendChat = (event) => {
        event.preventDefault();
        if (msg.length > 0) {
            handleSendMsg(msg);
            setMsg("");
        }
    };

  return (
    <Container>
      <div className="button-container">
        <div className="emoji">
            <BsEmojiSmileFill onClick={handleEmojiPIckerHideShow}/>
            {
                showEmojiPicker && <Picker className='emoji-picker-react' onEmojiClick={handleEmojiCLick} />
            }
        </div>
      </div>
      <form className="input-container" onSubmit={(e) => sendChat(e)}>
        <input type="text" placeholder='type your message here' value={msg} onChange={(e) => setMsg(e.target.value)} />
        <button className='submit'>
            <IoMdSend />
        </button>
      </form>
    </Container>
  )
}

const Container = styled.div`
    display: grid;
    grid-template-columns: 5% 95%;
    align-items: center;
    background-color: #468EF6;
    padding: 0 2rem;
    padding-bottom: 0.3rem;
    .button-container {
        display: flex;
        align-items: center;
        color: white;
        gap: 1rem;
        .emoji {
            position: relative;
            svg {
                font-size: 1.5rem;
                color: #ffff00c8;
                cursor: pointer;
            }
            .emoji-picker-react {
                position: absolute;
                top: -460px;
            }
        }
    }
    .input-container {
        width: 100%;
        border-radius: 2rem;
        display: flex;
        align-content: center;
        gap: 2rem;
        background-color: #ffffff34;
        input {
            width: 90%;
            background-color: transparent;
            border: none;
            padding-left: 1rem;
            font-size: 1.2rem;
            &::selection{
                background-color: #9186f3; 
            }
            &:focus {
                outline: none;
            }
        }
    }
    button {
        padding: 0.3rem 2rem;
        border-radius: 2rem;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: white;
        border: none;
        svg {
            font-size: 2rem;
            color: #468EF6;
        }
    }
`;
