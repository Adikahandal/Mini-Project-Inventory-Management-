document.addEventListener("DOMContentLoaded", () => {
    // Populate the product table
    async function populateProductTable() {
        try {
            const response = await fetch("/api/products"); // Endpoint to fetch products
            const products = await response.json();

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

        } catch (error) {
            console.error("Error fetching products:", error);
        }
    }

    // Populate the orders table
    async function populateOrderTable() {
        try {
            const response = await fetch("/api/orders"); // Endpoint to fetch orders
            const orders = await response.json();

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

        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    }

    // Populate the suppliers table
    async function populateSupplierTable() {
        try {
            const response = await fetch("/api/suppliers"); // Endpoint to fetch suppliers
            const suppliers = await response.json();

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

        } catch (error) {
            console.error("Error fetching suppliers:", error);
        }
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
