const express = require('express');                         // integrates express framework 
const alias = document.getElementById('alias');
const password = document.getElementById('password');
const login_form = document.getElementById('form');
const errorElement = document.getElementById('error')
const User = require('../model/user')

FormData.addEventListener('submit', (e) => {
    let messages = [];
    
    if (alias.value === '' || alias.value=== null) {
        messages.push('Alias is required')
    } 
    if (alias.value !== User.value ) {
        messages.push('Alias required')
    }

    if (messages.length > 0) {
        e.preventDefault()
        errorElement.innerText = messages.join(', ');
    }
    
})