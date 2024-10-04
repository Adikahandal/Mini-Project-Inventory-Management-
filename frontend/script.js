document.addEventListener("DOMContentLoaded", () => {
    // Sample data for demonstration purposes
    const products = [
        { name: "Product 1", sku: "SKU001", quantity: 10, price: 20.5 },
        { name: "Product 2", sku: "SKU002", quantity: 5, price: 15.0 },
        { name: "Product 3", sku: "SKU003", quantity: 0, price: 25.0 },
    ];

    const orders = [
        { id: "ORD001", customerName: "John Doe", date: "2024-09-01", totalAmount: 100, status: "Completed" },
        { id: "ORD002", customerName: "Jane Smith", date: "2024-09-10", totalAmount: 200, status: "Pending" },
    ];

    const suppliers = [
        { name: "Supplier A", contactInfo: "contact@suppliera.com" },
        { name: "Supplier B", contactInfo: "contact@supplierb.com" },
    ];

    // Populate the product table
    function populateProductTable() {
        const productTableBody = document.querySelector("#productTable tbody");
        productTableBody.innerHTML = ""; // Clear existing rows
        products.forEach((product) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${product.name}</td>
                <td>${product.sku}</td>
                <td>${product.quantity}</td>
                <td>$${product.price.toFixed(2)}</td>
                <td>
                    <button class="edit-btn" data-sku="${product.sku}">Edit</button> 
                    <button class="delete-btn" data-sku="${product.sku}">Delete</button>
                </td>
            `;
            productTableBody.appendChild(row);
        });

        // Update dashboard statistics
        document.getElementById("totalProducts").textContent = products.length;
        document.getElementById("lowStockAlerts").textContent = products.filter(p => p.quantity < 5).length;
    }

    // Populate the orders table
    function populateOrderTable() {
        const orderTableBody = document.querySelector("#orderTable tbody");
        orderTableBody.innerHTML = ""; // Clear existing rows
        orders.forEach((order) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${order.id}</td>
                <td>${order.customerName}</td>
                <td>${order.date}</td>
                <td>$${order.totalAmount.toFixed(2)}</td>
                <td>${order.status}</td>
            `;
            orderTableBody.appendChild(row);
        });
    }

    // Populate the suppliers table
    function populateSupplierTable() {
        const supplierTableBody = document.querySelector("#supplierTable tbody");
        supplierTableBody.innerHTML = ""; // Clear existing rows
        suppliers.forEach((supplier) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${supplier.name}</td>
                <td>${supplier.contactInfo}</td>
                <td>
                    <button class="edit-btn" data-name="${supplier.name}">Edit</button> 
                    <button class="delete-btn" data-name="${supplier.name}">Delete</button>
                </td>
            `;
            supplierTableBody.appendChild(row);
        });
    }

    // Event listener for buttons
    function handleButtonClicks() {
        document.addEventListener("click", (e) => {
            if (e.target.classList.contains("edit-btn")) {
                const id = e.target.dataset.sku || e.target.dataset.name;
                alert(`Edit item: ${id}`);
            } else if (e.target.classList.contains("delete-btn")) {
                const id = e.target.dataset.sku || e.target.dataset.name;
                alert(`Delete item: ${id}`);
            }
        });
    }

    // Initializing the tables and handling button clicks
    populateProductTable();
    populateOrderTable();
    populateSupplierTable();
    handleButtonClicks();
});
