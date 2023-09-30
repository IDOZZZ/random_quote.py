
// Fungsi untuk memuat data nama dari localStorage saat halaman dimuat
// This function is called when the page loads. It loads saved names from localStorage.
function loadNamesFromLocalStorage() {
    let currentIndex = 1; // Initialize the current index to 1 when the page loads

    // Loop through all items in localStorage
    for (let i = 1; i <= localStorage.length; i++) {
        const key = localStorage.key(i - 1);
        if (key.startsWith("name_")) { // Check if the key starts with "name_"
            const nameData = JSON.parse(localStorage.getItem(key));
            if (nameData) {
                // Add the name to the list and update currentIndex if needed
                addNameToList(nameData.id, nameData.name);
                currentIndex = Math.max(currentIndex, nameData.id + 1);
            }
        }
    }
}

// Panggil fungsi untuk memuat data dari localStorage saat halaman dimuat
// Call the loadNamesFromLocalStorage function when the page loads
window.addEventListener("load", loadNamesFromLocalStorage);

// Fungsi untuk menambahkan nama ke daftar dan menyimpannya di localStorage
// This function adds a new name to the list and stores it in localStorage
function addName() {
    const nameInput = document.getElementById("nameInput");
    const nameList = document.getElementById("nameList");
    const name = nameInput.value.trim();

    if (name !== "") {
        // Calculate the current index based on the number of existing items
        const currentIndex = nameList.childElementCount + 1;

        // Create an <li> element to display the name
        const listItem = document.createElement("li");
        listItem.setAttribute("draggable", true);
        listItem.innerHTML = `
            <div class="name-container">
                <span>${currentIndex}. ${name}</span>
                <button onclick="removeName(this)">Delete</button>
            </div>
        `;

        // Add the <li> element to the name list
        nameList.appendChild(listItem);

        // Reset the name input field
        nameInput.value = "";

        // Save the name data to localStorage
        saveNameToLocalStorage(currentIndex, name);
    }
}

// Fungsi untuk menghapus nama dan data terkait dari daftar dan localStorage
// This function removes a name and its data from the list and localStorage
function removeName(element) {
    const container = element.parentElement.parentElement;
    const span = container.querySelector("span");
    const nameId = parseInt(span.textContent.split(".")[0]);

    // Remove the data from localStorage
    removeFromLocalStorage(nameId);

    // Remove the element from the list
    container.remove();

    // Update the index for the remaining elements
    const nameItems = document.querySelectorAll(".name-container");
    nameItems.forEach((item, index) => {
        const span = item.querySelector("span");
        span.textContent = `${index + 1}. ${span.textContent.slice(span.textContent.indexOf(" ") + 1)}`;
    });
}

// Fungsi untuk menyimpan data nama ke localStorage
// This function saves name data to localStorage
function saveNameToLocalStorage(id, name) {
    const nameData = {
        id: id,
        name: name,
    };
    localStorage.setItem(`name_${id}`, JSON.stringify(nameData));
}

// Fungsi untuk menghapus data nama dari localStorage
// This function removes name data from localStorage
function removeFromLocalStorage(id) {
    localStorage.removeItem(`name_${id}`);
}

// Fungsi untuk menambahkan nama ke daftar
// This function adds a name to the list displayed on the webpage
function addNameToList(id, name) {
    const nameList = document.getElementById("nameList");

    const listItem = document.createElement("li");
    listItem.setAttribute("draggable", true);
    listItem.innerHTML = `
        <div class="name-container">
            <span>${id}. ${name}</span>
            <button onclick="removeName(this)">Delete</button>
        </div>
    `;

    nameList.appendChild(listItem);
}
