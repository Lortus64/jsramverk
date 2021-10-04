import React, { useEffect, useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '../style/bar.css';
import io from "socket.io-client";

import SavePopup from './savePopup';
import FilePopup from './filePopup_F';

const socket = io("https://jsramverk-editor-adei18.azurewebsites.net");

export default function CKeditor() {
    const [dataObj, setDataObj] = useState('');
    const [text, setText] = useState(dataObj.content);
    const [room, setRoom] = useState();

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





    return (
        <div className="editor">
            <div className="navbar">
                <div className="dropdown">
                    <button className="dropbtn">File 
                        <i className="fa fa-caret-down"></i>
                    </button>
                    <div data-testid="dropdown-content" className="dropdown-content">
                        <SavePopup SaveForParent = {dataObj} SaveText = {text}/>
                        <FilePopup childToParent = {childToParent}/>
                    </div>
                </div>
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
