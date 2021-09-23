import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';


class FilePopup extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data: [],
            files: []
        };
    }

    async componentDidMount() {
        this.setState({files: await this.getNames()});
    }


    async getNames() {
        var names = await fetch('https://jsramverk-editor-adei18.azurewebsites.net/listNames')
        .then(response => response.json());
        return names;
    };


    async openFile(id) {
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

        this.props.parentCallback(obj[0])
    };


    render(){
        return(
            <Popup trigger={
                <button className="button"> Open File </button>
            } modal>
                {close => (
                    <span>
                        {this.state.files.map((file) => (
                            <button onClick={() => {
                                this.openFile(file._id);
                                close();
                            }} key={file._id}> {file.name} </button>
                        ))} 
                    </span>
                )}
            </Popup>
        );
    }
}

export default FilePopup;