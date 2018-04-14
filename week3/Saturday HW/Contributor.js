"use strict";
/*global View */
/* eslint-disable no-unused-vars */

class Contributor extends View {
    constructor() {
        super();
    }

    async render(repo) {
        console.log("here");
        const tds = document.querySelectorAll('.leftSideContainer td');
        tds[0].innerHTML = "Repository: ";
        tds[1].innerHTML = `<a href="${repo.html_url}" target="_window">${repo.name}</a>`;
        tds[2].innerHTML = "Description: ";
        tds[3].innerHTML = repo.description;
        tds[4].innerHTML = "Forks: ";
        tds[5].innerHTML = repo.forks;
        tds[6].innerHTML = "Updated: ";
        tds[7].innerHTML = repo.updated_at;

        try {
            const userData = await this.fetchJSON(repo.contributors_url);

            const ul = document.getElementById("listOfContr");
            ul.innerHTML = "";
            for (let i = 0; i < userData.length; i++) {
                const li = this.createAndAppend("li", ul);
                const img = this.createAndAppend("img", li);
                img.setAttribute("src", userData[i].avatar_url);
                const span1 = this.createAndAppend("span", li);
                span1.setAttribute("class", "span-login");
                span1.innerHTML = userData[i].login;

                const span2 = this.createAndAppend("span", li);
                span2.setAttribute("class", "span-contributions");
                span2.innerHTML = userData[i].contributions;
            }
        } catch (err) {
            console.error(err.message);
        }
    }

}