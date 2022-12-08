"use strict";

(function () {
  let resultset;
  let resultsection;
  let keyInput;
  let searchValueInput;
  let messagearea;

  document.addEventListener("DOMContentLoaded", init);

  function init() {
    resultset = document.getElementById("resultset");
    resultsection = document.getElementById("resultsection");
    keyInput = document.getElementById("key");
    searchValueInput = document.getElementById("searchvalue");
    messagearea = document.getElementById("messagearea");

    document.getElementById("submit").addEventListener("click", submit);
  }

  async function submit() {
    const key = keyInput.value;
    const searchValue = searchValueInput.value;

    try {
      const uri = key ? `/persons/${key}?value=${searchValue}` : "/persons";
      const result = await fetch(uri);
      const personData = await result.json();
      updataPage(personData);
    } catch (err) {
      showError(err.message);
    }
  }

  function showError(message) {
    messagearea.innerHTML = `<p>${message}</p>`;
  }

  function updataPage(searchResult) {
    if (searchResult.message) {
      showError(searchResult.message);
    } else if (searchResult.length === 0) {
      showError("No person found");
    } else {
      let htmlString = "";
      for (const person of searchResult) {
        htmlString += `<tr>
                <td>${person.firstname}</td>
                <td>${person.lastname}</td>
                <td>${person.age}</td>
                </tr>\n`;
      }
      resultset.innerHTML = htmlString;
    }
  }
})();
