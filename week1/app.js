
"use strict";
const url = "https://api.github.com/orgs/hackyourfuture/repos";
createTheStructure();
fetchJSON(url, (error, data) =>{
    if(error !== null){
        console.error(error.message);
    } else{
        renederSelect(data);
    }
});



function fetchJSON(url, cb) {

    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.responseType = "json";

    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            if (xhr.status < 400) {
                cb(null, xhr.response);
            } else {
                cb(new Error(xhr.statusText));

            }
        }
    }
    xhr.send();
}

function renederSelect(data){
    
    const select = document.getElementById("select");
    data.forEach(element => {
        const option = createAndAppend("option", select);

        option.setAttribute("value", element.url);
        option.innerHTML = element.name;
    });
    
    select.addEventListener("change", event =>{
        renderLeftSide(event.target.value);
        renderRepositaries(event.target.value);
      });
}
function createTheStructure(){
    const root = document.getElementById("root");
    const header = document.createElement("div");
    header.setAttribute("class", "header");
    root.appendChild(header);
    const label = document.createElement("label");
    label.setAttribute("class", "select-label");
    label.textContent = "Repos";
    header.appendChild(label);
    const select = createAndAppend("select", label);
    select.setAttribute("id", "select");

    const container = createAndAppend("div", root);
    container.setAttribute("id", "container");
    const leftSideContainer = createAndAppend("div", container);
    leftSideContainer.setAttribute("class", "leftSideContainer");
    const rightSideContainer = createAndAppend("div", container);
    rightSideContainer.setAttribute("id", "rightSideContainer");
    const ul = createAndAppend("ul", rightSideContainer);
    ul.setAttribute("id", "listOfContr");
    const table = createAndAppend("table", leftSideContainer);
    const tBody = createAndAppend("tBody", table);
    
    for (let i = 0; i < 7; i+=2) {
        const tr = createAndAppend("tr", tBody);
        const td1 = createAndAppend("td", tr);
        td1.setAttribute("id", "td" + (i+1));
        const td2 = createAndAppend("td", tr);
        td2.setAttribute("id", "td" + (i+2));
    }
    const td2 = document.getElementById("td2");
    const a = createAndAppend("a", td2);
    a.setAttribute("id","repoNameLink");
}

function renderLeftSide(data) {
    const td1 = document.getElementById("td1");
    const td3 = document.getElementById("td3");
    const td4 = document.getElementById("td4");
    const td5 = document.getElementById("td5");
    const td6 = document.getElementById("td6");
    const td7 = document.getElementById("td7");
    const td8 = document.getElementById("td8");
    const a = document.getElementById("repoNameLink");

    fetchJSON(data, (error, data2) =>{
        if(error !== null){
            console.error(error.message);
        } else{
            console.log("data2");
            console.log(data2);
            console.log("data2");
            a.setAttribute("href", data2.html_url);
            td1.textContent = "Respository: ";
            a.textContent = data2.name;

            td3.textContent = "Description: ";
            td4.textContent = data2.description;
            td5.textContent = "Forks: ";
            td6.textContent = data2.forks;
            td7.textContent = "Updated: ";
            td8.textContent = data2.updated_at;
        }
    });
  

}
function renderRepositaries(data){
    fetchJSON(data, (error, data2) =>{
        if(error !== null){
            console.error(error.message);
        } else{
            fetchJSON(data2.contributors_url, (error, userData) =>{
                if(error !== null){
                    console.error(error.message);
                } else{
                    console.log(userData);
                    const ul  = document.getElementById("listOfContr");
                    ul.innerHTML = "";
                    for (let i = 0; i < userData.length; i++) {
                        const li = createAndAppend("li", ul);
                        li.textContent = userData[i].login;
                        console.log(userData[i].login);
                        const img = createAndAppend("img", li);
                        img.setAttribute("src", userData[i].avatar_url);
                        const span = createAndAppend("span", li);
                        span.innerHTML = userData[i].contributions;

                        
                    }

                }
        });
        }
});
}

function createAndAppend(tagName, parent) {
    const element = document.createElement(tagName);
    parent.appendChild(element);
    return element;
}

