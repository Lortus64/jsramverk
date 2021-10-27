import React, { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';


export default function FilePopup(props) {

    const [files, setfiles] = useState([]);

    useEffect(() => {
        async function getNames() {
            await fetch('https://jsramverk-editor-adei18.azurewebsites.net/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({ query: "{ files { _id, name } }" })
            })
                .then(r => r.json())
                .then(data => setfiles(data.data.files));
        };

        getNames();
    }, []);


    const openFile = async(id) => {
        console.log(props.token);
        var details = {
            'id': id,
            'token': props.token
        };

        var formBody = [];
        for (var property in details) {
          var encodedKey = encodeURIComponent(property);
          var encodedValue = encodeURIComponent(details[property]);
          formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        var obj = await fetch('https://jsramverk-editor-adei18.azurewebsites.net/listOne', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
          },
          body: formBody
        })
        .then(response => response.json());
        if (!obj.error) {
            props.childToParent(obj[0]);
        };
    };


    return(
        <Popup trigger={
            <button className="button"> Open File </button>
        } modal>
            {close => (
                <span>
                    {files.map((file) => (
                        <button onClick={() => {
                            openFile(file._id);
                            close();
                        }} key={file._id}> {file.name} </button>
                    ))}
                </span>
            )}
        </Popup>
    );
}
