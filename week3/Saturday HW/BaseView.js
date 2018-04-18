'use strict';
/* eslint-disable no-unused-vars */

class BaseView{
    fetchJSON(url) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open("GET", url);
            xhr.responseType = "json";

            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status < 400) {
                        resolve(xhr.response);
                    } else {
                        reject(new Error(`${xhr.status} - Page ${xhr.statusText}`));

                    }
                }
            };
            xhr.send();
        });
    }

    createAndAppend(name, parent, options = {}) {
        const elem = document.createElement(name);
        parent.appendChild(elem);
        Object.keys(options).forEach(key => {
            const value = options[key];
            if (key === 'html') {
                elem.innerHTML = value;
            } else {
                elem.setAttribute(key, value);
            }
        });
        return elem;
    }
}