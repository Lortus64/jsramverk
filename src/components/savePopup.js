import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';


class SavePopup extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data: [],
            files: [],
            name: ''
        };

        this.handelChange = this.handelChange.bind(this);
        this.create = this.create.bind(this);
    };

    preppData(details) {
        var formBody = [];
        for (var property in details) {
          var encodedKey = encodeURIComponent(property);
          var encodedValue = encodeURIComponent(details[property]);
          formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        return formBody;
    };


    async save(id, name, content) {
        var details = {
            'id': id,
            'name': name,
            'content': content
        };

        let formBody = this.preppData(details)

        await fetch('https://jsramverk-editor-adei18.azurewebsites.net/update', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
          },
          body: formBody
        })
    };

    handelChange(event) {
        this.setState({name: event.target.value});
    };

    async create(event) {
        event.preventDefault();
        var details = {
            'name': this.state.name,
            'content': this.props.SaveText
        };

        var formBody = [];
        for (var property in details) {
          var encodedKey = encodeURIComponent(property);
          var encodedValue = encodeURIComponent(details[property]);
          formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");


        await fetch('https://jsramverk-editor-adei18.azurewebsites.net/update', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
          },
          body: formBody
        })

        window.location.reload(false);
    };


    render(){
        const renderButton = () => {
            if (this.props.SaveForParent._id) {
                return (
                    <button onClick={()=>this.save(this.props.SaveForParent._id, this.props.SaveForParent.name, this.props.SaveText)}>Save</button>
                )
            } else {
                return (
                    <Popup trigger={
                        <button className="button"> Create File </button>
                    } modal>
                    <span>
                        <form onSubmit={this.create}>
                            <label>
                                Name:
                                <input type="text" onChange={this.handelChange} />
                            </label>
                            <input type="submit" value="Submit" />
                        </form>
                    </span>
                    </Popup>
                )
            }
        }






        return(
            <div className="SaveButton">
                {renderButton()}
            </div>
        );
    }
}

export default SavePopup;