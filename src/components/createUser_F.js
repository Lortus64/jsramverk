import React, { useState} from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';


export default function CreatePopup() {

    const [name, setName] = useState();
    const [password, setPassword] = useState();


    const create = async(event) => {
        event.preventDefault();
        var details = {
            'name': name,
            'pass': password
        };

        var formBody = [];
        for (var property in details) {
          var encodedKey = encodeURIComponent(property);
          var encodedValue = encodeURIComponent(details[property]);
          formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");


        var obj = await fetch('https://jsramverk-editor-adei18.azurewebsites.net/user/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
          },
          body: formBody
        })
        .then(response => response.json());

        window.location.reload(false);
    };


    return(
        <Popup trigger={
            <button className="button"> Create User </button>
        } modal>
            <span>
                <form onSubmit={create}>
                    <label>Name: 
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </label>
                    <br />
                    <label>Password: 
                        <input
                            type="text"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>
                    <br />
                    <input type="submit" value="Submit" />
                </form>
            </span>
        </Popup>
    );
}
