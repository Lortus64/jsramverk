import React, { useState} from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';


export default function LoginPopup(props) {
    const [mail, setMail] = useState();

    const invite = async(event) => {
        event.preventDefault();
        var details = {
            'id': props.data._id,
            'token': props.token,
            'mail': mail
        };

        var formBody = [];
        for (var property in details) {
          var encodedKey = encodeURIComponent(property);
          var encodedValue = encodeURIComponent(details[property]);
          formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        await fetch('https://jsramverk-editor-adei18.azurewebsites.net/mailInvite', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
          },
          body: formBody
        })

        window.location.reload(false);
    };

    return(
        <Popup trigger={
            <button className="button"> Mail Invite </button>
        } modal>
            <span>
                <form onSubmit={invite}>
                    <label>Mail: 
                        <input
                            type="text"
                            value={mail}
                            onChange={(e) => setMail(e.target.value)}
                        />
                    </label>
                    <br />
                    <input type="submit" value="Submit" />
                </form>
            </span>
        </Popup>
    );
}
