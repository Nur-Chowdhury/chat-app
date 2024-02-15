import React, {useState, useEffect} from 'react'
import styled from "styled-components";
import Logo from "../assets/logo.svg"
import Logout from './Logout';

export default function Contacts( {contacts, currentUser, changeChat}) {

    const [currentUserName, setCurrentUserName] = useState(undefined);
    const [currentUserImage, setCurrentUserImage] = useState(undefined);
    const [selectedChat, setSelectedChat] = useState(undefined);

    useEffect(() => {
        if(currentUser){
            setCurrentUserImage(currentUser.avatar);
            setCurrentUserName(currentUser.username);
        }
    }, [currentUser]);

    const changeCurrentChat = (index, contact) => {
        setSelectedChat(index);
        changeChat(contact);
    };

  return (
    <>
      {
        currentUserImage &&currentUserName && (
            <Container>
                <div className="brand">
                    <img src={Logo} alt= "logo" />
                    <h3>fChat</h3>
                </div>
                <div className="contacts">
                    {
                        contacts.map((contact, index) => {
                            return (
                                <div 
                                    className={`contact ${index===selectedChat ? "selected": ""}`} 
                                    key={index}
                                    onClick={() => changeCurrentChat(index, contact)}
                                >
                                    <div className="avatar">
                                        <img 
                                            src = {`data:image/svg+xml;base64,${contact.avatar}`}
                                            alt="avatar" 
                                        />
                                    </div>
                                    <div className="username">
                                        <h3>{contact.username}</h3>
                                    </div>
                                </div>
                            );
                        })}
                </div>
                <div className='current-user'>
                        <div className="user-details">
                            <div className="avatar">
                                <img 
                                    src={`data:image/svg+xml;base64,${currentUserImage}`}
                                    alt='avatar'
                                />
                            </div>
                            <div className="username">
                                <h2>{currentUserName}</h2>
                            </div>
                        </div>
                        <Logout />
                    </div>
            </Container>
        )
      }
    </>
  )
};

const Container = styled.div`
    display: grid;
    grid-template-rows: 10% 75% 15%;
    overflow: hidden;
    background-color: #ffffff;
    .brand {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        img{
            height: 2rem;
        }
        h3 {
            color: black;
        }
    }
    .contacts{
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow: auto;
        gap: 0.8rem;
        &::-webkit-scrollbar{
            width: 0.2rem;
            &-thumb {
                background-color: #B0E1FA;
                width: 0.1rem;
                border-radius: 1rem;
            }
        }
        .contact {
            background-color: #B0E1FA;
            min-height: 3rem;
            width: 90%;
            cursor: pointer;
            border-radius: 0.2rem;
            padding: 0.4rem;
            gap: 1rem;
            align-items: cneter;
            display: flex;
            transition: 0.5s ease-in-out;
            .avatar{
                img{
                    height: 3rem;
                }
            } 
            .username{
                h3 {
                    color: black;
                }
            }
        }
        .selected{
            background-color: blue;
        }
    }
    .current-user {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 2rem;
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
`;
