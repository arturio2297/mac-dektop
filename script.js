let files = document.querySelectorAll(".explorer div"),
    codeArea = document.querySelector("pre"),
    column = document.querySelector(".column"),
    selected = files[0];

let loadFile = (path) => {
   let request = new XMLHttpRequest();
   request.open("GET",path,true);
   request.send();
   request.onload = ()=> {
      output = request.response;
      codeArea.textContent = output;
       createRows(output);
   };
};

let createRows = (str) => {
   let existedRows = document.querySelectorAll(".column p");
   if (existedRows != 0) {
      existedRows.forEach((el) => {
         column.removeChild(el);
      });
   }
   let count = 1;
   for (let i = 0, x = 1; i < str.length; i++, x++) {
      if (str.substring(i,x).match("\n")) {
         count++;
      }
   }
   for (let i = 0; i < count; i++) {
      let newRow = document.createElement("p");
      newRow.textContent = i + 1;
      column.appendChild(newRow);
   }
};

loadFile("index.html");

files.forEach((el) => {
 el.addEventListener("click", function() {
      selected = this.id;
      loadFile(this.id);
 });
});
