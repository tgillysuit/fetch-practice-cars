// BITE SIZE 

// BELOW ARE ASYNC FUNCTIONS THAT HAVE "GET" and "POST" functions
// THESE FUNCTIONS USE THE FETCH() function

window.onload = async () => {
    // GET
    // Retrieving the Data from the database and rendering it on the page.
    await loadData();

    // POST
    // When the "user" clicks the submit button the form, we're POSTing the data to the database.
    document.querySelector("button").onclick = handleForm; 
}

// POST FUNCTION
async function handleForm(event) {
    event.preventDefault(); // stops the default behavior of an event from occurring.

    // Creating an object variable where we take the user's input from the form and saving the value from that html <input> tag.
    const newProfile = {
        name: document.querySelector("#name").value
    }

    // THIS IS THE SETUP FOR POST
    const url = "http"; // link of where the form is
    const config = {    // proper configuration for requests
        method: "post", // posting 
        mode: "cors",   // "cors" is a security feature built into browsers that  controls how web pages make requests
        headers: {      // MIME type, where sending in the request body in a JSON format
            "Content-Type": "application/json"  
        },
        body: JSON.stringify(newProfile) // taking the JavaScript object's key-value pairs and transforming it into a json object
    }

    const response = await fetch(url, config);  // sending the API request and wait for a response
    const json = await response.json();         // Parse the JSON response

    const list = document.querySelector("#name-list"); // Get the HTML element to display data
    
    renderOneName(json.data, list); // Render one name into the selected element
}

// GET FUNCTION
async function loadData() {
    const url = "http";     // link of where the form is
    const config = {        // proper configuration for requests
        method: "get",      // getting
        mode: "cors"        // "cors" is a security feature built into browsers that  controls how web pages make requests
    }

    const response = await fetch(url, config);  // sending the API request and wait for a response
    const json = response.json();   // Parse the JSON response
    renderNames(json.data);
}



// BELOW ARE FUNCTIONS ON HOW DATA IS PASSED THROUGH TO THE HTML PAGE

// RENDER NAMES
function renderNames(names) {
    const list = document.querySelector("#name-list"); // Grabs the DOM element where sections will be added
    for (const name of names) {     // Render each name as a <section> on the page
        renderOneName(name, list);
    }

    const table = document.querySelector("#name-table");    // Grabs the table DOM element for tabular display
    const headers = ["Name"]    // Define column headers

    let tr = document.createElement("tr");  // Create a table row for headers
    for (const header of headers) {
        const td = document.createElement("td");
        td.textContent = header;

        tr.appendChild(td);     // Add each header cell to the header row
    }
    table.appendChild(tr);      // Add the header row to the table

    for (const name of names) {
        const row = document.createElement("tr");   // Create a new row for each name

        const values = [name.name, name.age]    // Values to add to the table row (name and age)

        for (const value of values) {   // Add each value as a cell in the row
            addCell(row, value);
        }

        table.appendChild(row); // Add the completed row to the table
    }
}

// RENDER ONE NAME
function renderOneName(name, list) {
    const section = document.createElement("section");  // Create a new <section> for the name
    const h2 = document.createElement("h2");    // Create a heading for the name

    h2.textContent = name.name;     // Set the heading text to the name
    section.className = "names";    // Assign a class for CSS styling

    section.appendChild(h2);        // Add the heading to the section
    list.appendChild(section);      // Add the section to the DOM
}

// ADD ONE CELL
function addCell(row, value) {
    const td = document.createElement("td");    // Create a table cell
    td.textContent = value;     // Set its content
    row.appendChild(td);        // Append the cell to the row
}
