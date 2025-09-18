 // Active filters
        let activeFilters = {
            category: [],
            subcategory: [],
            tag: [],
            brand: []
        };

        // Initialize when page loads
        document.addEventListener("DOMContentLoaded", () => {
            initializeFilters();
            updateFilterCounts();
            addSearchFunctionality();
        });

        // Initialize filter checkboxes
        function initializeFilters() {
            document.querySelectorAll("input[type=checkbox][data-filter]").forEach(cb => {
                cb.addEventListener("change", handleFilterChange);
            });
        }

        // Handle filter change
        function handleFilterChange(e) {
            const filter = e.target.dataset.filter;
            const value = e.target.dataset.value;
            
            if (e.target.checked) {
                if (!activeFilters[filter].includes(value)) {
                    activeFilters[filter].push(value);
                }
            } else {
                activeFilters[filter] = activeFilters[filter].filter(v => v !== value);
            }
            
            applyFilters();
            updateFilterStatus();
            updateFilterCounts();
        }

        // Apply filters to products
        function applyFilters() {
            const products = document.querySelectorAll(".product-item");
            let visibleCount = 0;

            products.forEach(product => {
                let show = true;

                // Check each filter type
                for (let filterType of Object.keys(activeFilters)) {
                    if (activeFilters[filterType].length === 0) continue;

                    const productValue = product.dataset[filterType] || "";
                    if (!activeFilters[filterType].includes(productValue)) {
                        show = false;
                        break;
                    }
                }

                // Apply search filter if exists
                const searchTerm = document.getElementById("product-search")?.value.toLowerCase() || "";
                if (show && searchTerm) {
                    const productName = (product.dataset.name || "").toLowerCase();
                    const productText = product.querySelector(".product-name").textContent.toLowerCase();
                    if (!productName.includes(searchTerm) && !productText.includes(searchTerm)) {
                        show = false;
                    }
                }

                product.style.display = show ? "block" : "none";
                if (show) visibleCount++;
            });

            // Show/hide no products message
            document.getElementById("no-products-message").style.display =
                visibleCount === 0 && (hasActiveFilters() || hasSearchTerm()) ? "block" : "none";
        }

        // Check if any filters are active
        function hasActiveFilters() {
            return Object.values(activeFilters).some(filterArray => filterArray.length > 0);
        }

        // Check if search term exists
        function hasSearchTerm() {
            const searchInput = document.getElementById("product-search");
            return searchInput && searchInput.value.trim() !== "";
        }

        // Update filter status display
        function updateFilterStatus() {
            const totalFilters = Object.values(activeFilters).reduce((total, filterArray) => total + filterArray.length, 0);
            const statusElement = document.getElementById("filter-status");
            
            if (totalFilters === 0) {
                statusElement.textContent = "No filters applied";
                statusElement.parentElement.className = "alert alert-info";
            } else {
                statusElement.textContent = `${totalFilters} filter(s) applied`;
                statusElement.parentElement.className = "alert alert-success";
            }
        }

        // Update filter counts
        function updateFilterCounts() {
            const products = document.querySelectorAll(".product-item");

            document.querySelectorAll("input[type=checkbox][data-filter]").forEach(checkbox => {
                const filter = checkbox.dataset.filter;
                const value = checkbox.dataset.value;
                let count = 0;

                products.forEach(product => {
                    if (product.dataset[filter] === value) {
                        count++;
                    }
                });

                const countElement = checkbox.parentElement.querySelector(".filter-count");
                if (countElement) {
                    countElement.textContent = `(${count})`;
                    countElement.style.display = count > 0 ? "inline" : "none";
                }
            });
        }

        // Clear all filters
        function clearAllFilters() {
            // Reset active filters
            activeFilters = { category: [], subcategory: [], tag: [], brand: [] };
            
            // Uncheck all checkboxes
            document.querySelectorAll("input[type=checkbox]").forEach(cb => cb.checked = false);
            
            // Clear search
            const searchInput = document.getElementById("product-search");
            if (searchInput) searchInput.value = "";
            
            // Show all products
            document.querySelectorAll(".product-item").forEach(product => product.style.display = "block");
            
            // Hide no products message
            document.getElementById("no-products-message").style.display = "none";
            
            // Update status and counts
            updateFilterStatus();
            updateFilterCounts();
        }

        // Add search functionality
        function addSearchFunctionality() {
            const searchInput = document.createElement("input");
            searchInput.type = "text";
            searchInput.id = "product-search";
            searchInput.className = "form-control mb-3";
            searchInput.placeholder = "🔍 Search products...";

            searchInput.addEventListener("input", function() {
                applyFilters(); // Use the main filter function which now includes search
            });

            const productGrid = document.getElementById("product-grid");
            productGrid.parentNode.insertBefore(searchInput, productGrid);
        }