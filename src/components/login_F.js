import React, { useState} from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';


export default function LoginPopup({loginToParent}) {

    const [name, setName] = useState();
    const [password, setPassword] = useState();


    const login = async(event) => {
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


        var obj = await fetch('https://jsramverk-editor-adei18.azurewebsites.net/user/auth', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
          },
          body: formBody
        })
        .then(response => response.json());

        loginToParent(obj);
    };


    return(
        <Popup trigger={
            <button className="button"> Login </button>
        } modal>
            <span>
                <form onSubmit={login}>
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
