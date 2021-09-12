import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '../style/bar.css';

import SavePopup from './savePopup';
import FilePopup from './filePopup';

class CKeditor extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            dataObj: '',
            text: ''
        }
    }

    callbackFunction = (childData) => {
        this.setState({dataObj: childData})
    };

    render(){
        return (
            <div className="editor">
                <div className="navbar">
                    <div className="dropdown">
                        <button className="dropbtn">File 
                            <i className="fa fa-caret-down"></i>
                        </button>
                        <div className="dropdown-content">
                            <SavePopup SaveForParent = {this.state.dataObj} SaveText = {this.state.text}/>
                            <FilePopup parentCallback = {this.callbackFunction}/>
                        </div>
                    </div>
                </div>
                <CKEditor
                    editor={ ClassicEditor }
                    data= {this.state.dataObj.content}
                    onReady={ editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log( 'Editor is ready to use!', editor );
                    } }
                    onChange={ ( event, editor ) => {
                        this.setState({text: editor.getData()})
                    } }
                />
            </div>
        );
    }
}

export default CKeditor;