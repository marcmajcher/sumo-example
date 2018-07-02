'use strict';

/* eslint-env browser */

function postSumo(event) {
    event.preventDefault();
    const data = {
        name: event.target.sumoname.value,
        weight: event.target.sumoweight.value
    };

    fetch('/wrestler', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then((res) => {
            res.json().then((url) => {
                window.location = url.redirect;
            });
        });
}
