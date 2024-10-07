document.addEventListener("DOMContentLoaded", () => {
    let products = [];
    let currentEditIndex = -1;

    // Populate the product table
    function populateProductTable() {
        const productTableBody = document.querySelector("#productTable tbody");
        productTableBody.innerHTML = ""; // Clear existing rows

        products.forEach((product, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${product.name}</td>
                <td>${product.sku}</td>
                <td>${product.quantity}</td>
                <td>$${product.price.toFixed(2)}</td>
                <td>
                    <button class="edit-btn" data-index="${index}">Edit</button> 
                    <button class="delete-btn" data-index="${index}">Delete</button>
                </td>
            `;
            productTableBody.appendChild(row);
        });

        // Update dashboard statistics
        document.getElementById("totalProducts").textContent = products.length;
        document.getElementById("lowStockAlerts").textContent = products.filter(p => p.quantity < 5).length;
    }

    // Handle adding or editing products
    function handleProductFormSubmit(event) {
        event.preventDefault(); // Prevent form submission

        const productName = document.getElementById("productName").value;
        const sku = document.getElementById("sku").value;
        const quantity = parseInt(document.getElementById("quantity").value);
        const price = parseFloat(document.getElementById("price").value);

        if (currentEditIndex === -1) {
            // Add new product
            products.push({ name: productName, sku, quantity, price });
        } else {
            // Edit existing product
            products[currentEditIndex] = { name: productName, sku, quantity, price };
            currentEditIndex = -1; // Reset edit index
        }

        // Reset form fields
        document.getElementById("productForm").reset();
        document.getElementById("modalTitle").textContent = "Add New Product";
        document.getElementById("productModal").style.display = "none";

        populateProductTable();
    }

    // Handle edit button click
    function handleEditButtonClick(index) {
        const product = products[index];
        document.getElementById("productName").value = product.name;
        document.getElementById("sku").value = product.sku;
        document.getElementById("quantity").value = product.quantity;
        document.getElementById("price").value = product.price;

        currentEditIndex = index; // Set the current edit index
        document.getElementById("modalTitle").textContent = "Edit Product";
        document.getElementById("productModal").style.display = "block";
    }

    // Handle delete button click
    function handleDeleteButtonClick(index) {
        products.splice(index, 1); // Remove product from the array
        populateProductTable();
    }

    // Event listener for buttons
    function handleButtonClicks() {
        document.addEventListener("click", (e) => {
            if (e.target.id === "addProductBtn") {
                currentEditIndex = -1; // Reset edit index for adding new product
                document.getElementById("productForm").reset();
                document.getElementById("modalTitle").textContent = "Add New Product";
                document.getElementById("productModal").style.display = "block";
            } else if (e.target.classList.contains("edit-btn")) {
                const index = e.target.dataset.index;
                handleEditButtonClick(index);
            } else if (e.target.classList.contains("delete-btn")) {
                const index = e.target.dataset.index;
                handleDeleteButtonClick(index);
            } else if (e.target.classList.contains("close")) {
                document.getElementById("productModal").style.display = "none";
            }
        });
    }

    // Initializing event listeners and handling form submission
    document.getElementById("productForm").addEventListener("submit", handleProductFormSubmit);
    handleButtonClicks();
});
