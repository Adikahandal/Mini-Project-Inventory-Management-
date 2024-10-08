document.addEventListener("DOMContentLoaded", () => {
    let products = [];
    let orders = [];
    let suppliers = [];
    let currentEditIndex = -1;

    // Function to populate product table
    function populateProductTable() {
        const productTableBody = document.querySelector("#productTable tbody");
        productTableBody.innerHTML = ""; 

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

        document.getElementById("totalProducts").textContent = products.length;
        document.getElementById("lowStockAlerts").textContent = products.filter(p => p.quantity < 5).length;
    }

    // Function to handle product form submit
    function handleProductFormSubmit(event) {
        event.preventDefault(); 

        const productName = document.getElementById("productName").value;
        const sku = document.getElementById("sku").value;
        const quantity = parseInt(document.getElementById("quantity").value);
        const price = parseFloat(document.getElementById("price").value);

        if (currentEditIndex === -1) {
            products.push({ name: productName, sku, quantity, price });
        } else {
            products[currentEditIndex] = { name: productName, sku, quantity, price };
            currentEditIndex = -1;
        }

        document.getElementById("productForm").reset();
        document.getElementById("modalTitle").textContent = "Add New Product";
        document.getElementById("productModal").style.display = "none";

        populateProductTable();
    }

    // New: Handle Order Form Submit
    function handleOrderFormSubmit(event) {
        event.preventDefault();

        const orderNumber = document.getElementById("orderNumber").value;
        const orderProduct = document.getElementById("orderProduct").value;
        const orderQuantity = parseInt(document.getElementById("orderQuantity").value);
        const orderDate = document.getElementById("orderDate").value;

        orders.push({ orderNumber, orderProduct, orderQuantity, orderDate });

        document.getElementById("orderForm").reset();
        document.getElementById("orderModal").style.display = "none";

        console.log("Orders:", orders); // Optional: Print orders to console for testing
        populateOrderTable(); // Call to populate orders table
    }

    // New: Handle Supplier Form Submit
    function handleSupplierFormSubmit(event) {
        event.preventDefault();

        const supplierName = document.getElementById("supplierName").value;
        const supplierContact = document.getElementById("supplierContact").value;
        const supplierEmail = document.getElementById("supplierEmail").value;

        suppliers.push({ supplierName, supplierContact, supplierEmail });

        document.getElementById("supplierForm").reset();
        document.getElementById("supplierModal").style.display = "none";

        console.log("Suppliers:", suppliers); // Optional: Print suppliers to console for testing
        populateSupplierTable(); // Call to populate suppliers table
    }

    // Function to populate order table
    function populateOrderTable() {
        const orderTableBody = document.querySelector("#orderTable tbody");
        orderTableBody.innerHTML = ""; 

        orders.forEach((order) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${order.orderNumber}</td>
                <td>${order.orderProduct}</td>
                <td>${order.orderQuantity}</td>
                <td>${order.orderDate}</td>
            `;
            orderTableBody.appendChild(row);
        });
    }

    // Function to populate supplier table
    function populateSupplierTable() {
        const supplierTableBody = document.querySelector("#supplierTable tbody");
        supplierTableBody.innerHTML = ""; 

        suppliers.forEach((supplier) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${supplier.supplierName}</td>
                <td>${supplier.supplierContact}</td>
                <td>${supplier.supplierEmail}</td>
            `;
            supplierTableBody.appendChild(row);
        });
    }

    // Handle edit button click for products
    function handleEditButtonClick(index) {
        const product = products[index];
        document.getElementById("productName").value = product.name;
        document.getElementById("sku").value = product.sku;
        document.getElementById("quantity").value = product.quantity;
        document.getElementById("price").value = product.price;

        currentEditIndex = index;
        document.getElementById("modalTitle").textContent = "Edit Product";
        document.getElementById("productModal").style.display = "block";
    }

    // Handle delete button click for products
    function handleDeleteButtonClick(index) {
        products.splice(index, 1);
        populateProductTable();
    }

    // Event listener for modal buttons and quick links
    // Event listener for modal buttons
function handleButtonClicks() {
    document.addEventListener("click", (e) => {
        if (e.target.id === "addProductBtn" || e.target.id === "quickAddProductLink") {
            currentEditIndex = -1; 
            document.getElementById("productForm").reset();
            document.getElementById("modalTitle").textContent = "Add New Product";
            document.getElementById("productModal").style.display = "block";
        } else if (e.target.id === "addOrderBtn" || e.target.id === "quickAddOrderLink") {
            document.getElementById("orderForm").reset();
            document.getElementById("orderModalTitle").textContent = "Create New Order";
            document.getElementById("orderModal").style.display = "block";
        } else if (e.target.id === "addSupplierBtn" || e.target.id === "quickAddSupplierLink") {
            document.getElementById("supplierForm").reset();
            document.getElementById("supplierModalTitle").textContent = "Add New Supplier";
            document.getElementById("supplierModal").style.display = "block";
        } else if (e.target.classList.contains("edit-btn")) {
            const index = e.target.dataset.index;
            handleEditButtonClick(index);
        } else if (e.target.classList.contains("delete-btn")) {
            const index = e.target.dataset.index;
            handleDeleteButtonClick(index);
        } else if (e.target.classList.contains("close")) {
            e.target.closest(".modal").style.display = "none";
        }
    });
}


    document.getElementById("productForm").addEventListener("submit", handleProductFormSubmit);
    document.getElementById("orderForm").addEventListener("submit", handleOrderFormSubmit);
    document.getElementById("supplierForm").addEventListener("submit", handleSupplierFormSubmit);
    handleButtonClicks();
});
