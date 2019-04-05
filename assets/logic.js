/*
 * Copyright (c) 2019. Karel Koudelka, all rights reserved
 */

$(document).ready(function () {

    let varTextarea = document.getElementById('variables-textarea');
    let codeTextarea = document.getElementById('code-textarea');
    let editorVars = CodeMirror.fromTextArea(varTextarea, {
        lineNumbers: true,
        matchBrackets: true,
        autoCloseBrackets: true,
        mode: "application/ld+json",
        lineWrapping: true,
        continueComments: "Enter",
    });
    let editorCode = CodeMirror.fromTextArea(codeTextarea, {
        lineNumbers: true,
        matchBrackets: true,
        autoCloseBrackets: true,
        mode: "application/ld+json",
        lineWrapping: true,
        continueComments: "Enter",
    });


    window.varsEditor = editorVars;
    window.codeEditor = editorCode;

    $('.CodeMirror').addClass('col-md-12');

    $('#vars-save').on('click', function () {
        window.variables = window.varsEditor.getValue();
        setVariables();
    });
    $('#code-save').on('click', function () {
        window.mainCode = window.codeEditor.getValue();
    });


});

function setVariables() {
    eval(window.variables);
}