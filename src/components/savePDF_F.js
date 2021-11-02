import React, { useState} from 'react';
import 'reactjs-popup/dist/index.css';
import { jsPDF } from "jspdf";


export default function SavePDF(props) {

    const save = () => {
        var doc = new jsPDF("p", "pt", "a4");

        doc.html(document.getElementsByClassName("ck-editor__editable_inline")[0], {
            callback: function (doc) {
              doc.save(props.data.name + ".pdf");
            }
         });
    };

    return(
        <button className="button" onClick={save}> Create PDF </button>
    );
}
