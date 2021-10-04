import React, { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';


export default function FilePopup({childToParent}) {

    const [files, setfiles] = useState([]);

    useEffect(() => {
        async function getNames() {
            var names = await fetch('https://jsramverk-editor-adei18.azurewebsites.net/listNames')
            .then(response => response.json());
            setfiles(names);
        };

        getNames();
    }, []);


    const openFile = async(id) => {
        var details = {
            'id': id
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

        childToParent(obj[0]);
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
