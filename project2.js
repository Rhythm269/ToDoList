// let add = document.getElementById("add");

// add.addEventListener("click", () => {
//     let tit = document.getElementById("title").value;
//     let desc = document.getElementById("desc").value;

//     if (localStorage.getItem('itemsJson') == null) {
//         // Checking if 'itemsJson' is empty (1st entry)
//         itemJsonArray = []; // Creating an array
//         itemJsonArray.push([tit, desc]); // Pushing the values of title and description
//         localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
//     } else {
//         itemJsonArrayStr = localStorage.getItem("itemsJson");
//         itemJsonArray = JSON.parse(itemJsonArrayStr);
//         itemJsonArray.push([tit, desc]); // Pushing the values of title and description
//         localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
//     }

//     // populate the table
//     let t_body = document.getElementById("tBody");
//     let str = "";
//     document.addEventListener("DOMContentLoaded", function () {
//     // Your code to populate the table here
//     itemJsonArray.forEach((element, index) => {
//         str += `
//         <tr>
//         <th scope="row">${index + 1}</th>
//         <td>${element[0]}</td>
//         <td>${element[1]}</td>
//         <td><button class="btn btn-primary btn-sm">Delete</button></td>
//         </tr>
//         `;
//         });
//     });

//     t_body.innerHTML = str; 
    

// });

document.addEventListener("DOMContentLoaded", function () {
    // Your code to populate the table here
    // Ensure that itemJsonArray is defined here
    let itemJsonArray = getItemJsonArray(); // Retrieve the items from localStorage
    populateTable(itemJsonArray);
});

let add = document.getElementById("add");
add.addEventListener("click", (event) => {
    event.preventDefault();

    let tit = document.getElementById("title").value;
    let desc = document.getElementById("desc").value;

    // Ensure that itemJsonArray is defined here
    let itemJsonArray = getItemJsonArray(); // Retrieve the items from localStorage

    itemJsonArray.push([tit, desc]);
    localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));

    // Call the function to populate the table after adding a new item
    populateTable(itemJsonArray);
});

function populateTable(itemArray) {
    let t_body = document.getElementById("tBody");
    let str = "";

    itemArray.forEach((element, index) => {
        str += `
        <tr>
        <th scope="row">${index + 1}</th>
        <td>${element[0]}</td>
        <td>${element[1]}</td>
        <td><button class="btn btn-primary btn-sm" data-index="${index}" onclick="deleted(this)">Delete</button></td>
        </tr>
        `;
    });

    //data-index="${index}" stores the index; onclick="deleted(this) calls the deleted function
    t_body.innerHTML = str;
}

// Modify the deleted function to accept the button element as an argument
function deleted(button) {
    let index = button.getAttribute("data-index");
    let itemJsonArray = getItemJsonArray();
    console.log(`The index ${index} deleted once`);
    
    // Remove the item at the specified index
    itemJsonArray.splice(index, 1);

    // Update localStorage with the modified itemJsonArray
    localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));

    // Call populateTable to refresh the table
    populateTable(itemJsonArray);
}

function clearList(){
    if(confirm("Do you want to clear the list?")){
    let itemJsonArray = getItemJsonArray();

    console.log("List was cleared.");
    localStorage.clear();
    populateTable(itemJsonArray);
    }
}

function getItemJsonArray() {
    // Retrieve items from localStorage or create an empty array if it doesn't exist
    let itemJsonArray = JSON.parse(localStorage.getItem('itemsJson')) || [];
    return itemJsonArray;
}
