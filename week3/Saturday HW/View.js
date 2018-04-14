'use strict';

class View {
    async start() {
        try {
            const url = "https://api.github.com/orgs/hackyourfuture/repos?per_page=100";
            const root = document.getElementById("root");

            const repos = await this.fetchJSON(url);

            const header = this.createAndAppend("div", root, {
                class: "header"
            });
            this.createAndAppend("label", header, {
                class: "select_label",
                html: "Repositories: "
            });
            this.createAndAppend("select", header, {
                id: "select"
            });
            const container = this.createAndAppend("div", root, {
                id: "container"
            });
            const leftSideContainer = this.createAndAppend("div", container, {
                class: "leftSideContainer"
            });
            const rightSideContainer = this.createAndAppend("div", container, {
                class: "rightSideContainer"
            });
            this.createAndAppend("h4", rightSideContainer, {
                html: "Contributors"
            });
            this.createAndAppend("ul", rightSideContainer, {
                id: "listOfContr"
            });
            const table = this.createAndAppend("table", leftSideContainer);
            const tBody = this.createAndAppend("tBody", table);

            for (let i = 0; i < 4; i++) {
                const tr = this.createAndAppend("tr", tBody);
                this.createAndAppend("td", tr);
                this.createAndAppend("td", tr);
            }

            const repository = new Repository(repos);
            repository.render();
        } catch (err) {
            this.createAndAppend("h1", root, {
                html: err.message,
                class: "error-message"
            });
        }
    }

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

window.onload = () => {
    const view = new View();
    view.start();
};