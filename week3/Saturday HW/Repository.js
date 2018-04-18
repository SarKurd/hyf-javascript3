"use strict";
/*global BaseView */
/* eslint-disable no-unused-vars */
class Repository extends BaseView {
    constructor(repos) {
        super();
        this.repos = repos;
    }

    render() {
        const select = document.getElementById("select");

        this.repos.sort((a, b) => a.name.localeCompare(b.name));

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