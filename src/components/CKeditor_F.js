import React, { useEffect, useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '../style/bar.css';
import io from "socket.io-client";

import SavePopup from './savePopup';
import FilePopup from './filePopup_F';
import LoginPopup from './login_F';
import CreatePopup from './createUser_F';

const socket = io("https://jsramverk-editor-adei18.azurewebsites.net");

export default function CKeditor() {
    const [dataObj, setDataObj] = useState('');
    const [text, setText] = useState(dataObj.content);
    const [room, setRoom] = useState();
    const [token, setToken] = useState("empty");

    useEffect(() => {
        console.log("new room: " + room);
    }, [room]);

    useEffect(() => {
        socket.on("dataB", data => {
            console.log(data);
            setText(data);
        });
    }, [socket]);

//* open file and create a room
    const childToParent = (childData) => {
        setDataObj(childData);
        setText(childData.content);
        setRoom(childData._id);

        if (room !== "") {
            socket.emit("leave", room);
        };

        socket.emit("create", childData._id);
    };


    const loginToParent = (loginChildData) => {
        if (!loginChildData.error) {
            setToken(loginChildData.data.token);
        };
    };


    console.log(token);
    return (
        <div className="editor">
            <div className="navbar">
                <div className="dropdown">
                    <button className="dropbtn">File 
                        <i className="fa fa-caret-down"></i>
                    </button>
                    <div data-testid="dropdown-content" className="dropdown-content">
                        <CreatePopup />
                        <LoginPopup loginToParent = {loginToParent}/>
                        <SavePopup SaveForParent = {dataObj} SaveText = {text}/>
                        <FilePopup childToParent = {childToParent} token = {token}/>
                    </div>
                </div>
                {token == "empty" &&
                    <h2>Login to use more features</h2>
                }
            </div>
            <div className="text-area" onKeyUp={() => {
                    if (room) {
                        socket.emit('update', {dataObj: dataObj, text: text})
                    };
                }}>
                <CKEditor
                    editor={ ClassicEditor }
                    data= {text}
                    onReady={ editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log( 'Editor is ready to use!', editor );
                    } }
                    onChange={ async ( event, editor ) => {
                        setText(editor.getData());
                    } }
                />
            </div>
        </div>
    );
  }
