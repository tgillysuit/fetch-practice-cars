// Load the data to the page when the window finishes loading
window.onload = async () => {
    // Call the function to load and display existing cars from the database
    await loadCars();

    // Set up an event listener on the form's submit button to handle new car submissions
    document.querySelector("button").onclick = handleForm;
}

// POST FUNCTION – Triggered when the user submits the form
async function handleForm(event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way (e.g., refreshing the page)

    // Create a new car object using input values from the form fields
    const newCar = {
        name: document.querySelector("#name").value,         // Get the value of the input with ID 'name'
        description: document.querySelector("#description").value // Get the value of the input with ID 'description'
    }

    const url = "http://localhost:3000/cars"; // API endpoint where the new car will be posted
    const config = {
        method: "post",                      // HTTP method for creating data
        mode: "cors",                        // Allow cross-origin requests
        headers: {
            "Content-Type": "application/json" // Tell the server the request body is in JSON format
        },
        body: JSON.stringify(newCar)         // Convert the JS object to JSON string before sending
    }

    // Send the POST request and wait for the response
    const response = await fetch(url, config);

    // Parse the response body as JSON
    const json = await response.json();

    // Select the DOM element to which the new car will be added
    const list = document.querySelector("#cars-list");

    // Render the new car onto the page
    renderCar(json.data, list);
}

// GET FUNCTION – Loads all existing cars from the server when the page loads
async function loadCars() {
    const url = "http://localhost:3000/cars"; // Endpoint to retrieve car data
    const config = {
        method: "get",   // HTTP GET method
        mode: "cors"     // Allow cross-origin requests
    }

    // Send the GET request and wait for the response
    const response = await fetch(url, config);

    // Parse the response body as JSON
    const json = await response.json();

    // Log for debugging purposes
    console.log("RESPONSE: ", response);
    console.log("JSON DATA: ", json);

    // Call the function to render all the cars onto the page
    renderCars(json.data);
}

// RENDER DATA FUNCTION – Renders all cars on the page
function renderCars(cars) {
    const list = document.querySelector("#cars-list"); // Select the section where car cards will go

    // Render each car as a section element
    for (const car of cars) {
        renderCar(car, list);
    }

    const table = document.querySelector("#car-table"); // Select the table for displaying car data
    const headers = ["Car Make", "Car Model"];          // Table column headers

    // Create and append table header row
    let tr = document.createElement("tr");
    for (const header of headers) {
        const td = document.createElement("td");
        td.textContent = header;
        tr.appendChild(td);
    }
    table.appendChild(tr);

    // Create and append a row for each car
    for (const car of cars) {
        const row = document.createElement("tr");
        const values = [car.name, car.description]; // Values to display per row

        for (const value of values) {
            addCell(row, value); // Add each cell to the row
        }

        table.appendChild(row); // Add the completed row to the table
    }
}

// RENDER EACH CAR – Adds a single car card (section) to the list
function renderCar(car, list) {
    const section = document.createElement("section");
    const h2 = document.createElement("h2");
    const p = document.createElement("p");

    h2.textContent = car.name;           // Set car name as heading
    p.textContent = car.description;     // Set car description as paragraph
    section.className = "car";           // Apply a CSS class for styling

    section.appendChild(h2);             // Add heading to the section
    section.appendChild(p);              // Add description to the section

    list.appendChild(section);           // Add the section to the DOM
}

// Add a cell to a table row
function addCell(row, value) {
    const td = document.createElement("td"); // Create a new table cell
    td.textContent = value;                  // Set the cell's text
    row.appendChild(td);                     // Append the cell to the row
}
