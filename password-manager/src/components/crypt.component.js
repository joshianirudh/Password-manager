import React, { Component } from 'react';



  export default class GeneratePassword extends React.Component {
    
    render() {
        return (
            <div>
                <button id="getPassword">Generate Password</button>
                <input type="number" id="lengthInput" placeholder="Length"/>
                <input type="text" id="specialInput" placeholder="Special Characters"/>
                <p id="passwordValue"></p>
                <p id="copyPassword"></p>
            </div>
        )
    }
}

