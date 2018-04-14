"use strict";
/*global View */
/* eslint-disable no-unused-vars */
class Repository extends View {
    constructor(repos) {
        super();
        this.repos = repos;
    }

    render() {
        const select = document.getElementById("select");

        this.repos.sort((a, b) => {
            if (a.name.toLowerCase() < b.name.toLowerCase()) {
                return -1;
            } else if (a.name.toLowerCase() > b.name.toLowerCase()) {
                return 1;
            }
        });

        this.repos.forEach((repo, index) => {
            this.createAndAppend("option", select, {
                html: repo.name,
                value: index
            });
        });
        const contributor = new Contributor();
        contributor.render(this.repos[0]);

        select.addEventListener("change", () => {
            contributor.render(this.repos[select.value]);
        });
    }

}