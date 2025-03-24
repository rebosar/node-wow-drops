document.addEventListener('DOMContentLoaded', () => {
    // Add event listener for armor buttons
    document.querySelectorAll('.armor-button').forEach(button => {
        button.addEventListener('click', function () {
            // Check if the button is already selected
            const isSelected = this.classList.contains('selected');

            // Remove the 'selected' class from all armor buttons
            document.querySelectorAll('.armor-button').forEach(btn => btn.classList.remove('selected'));
            
            // If the clicked button was not already selected, add the 'selected' class
            if (!isSelected) {
                this.classList.add('selected');
                // Update hidden input field with the selected armor type value
                document.getElementById('armor_type_id').value = this.getAttribute('data-value');
            } else {
                // If the button was already selected, clear the hidden input field
                document.getElementById('armor_type_id').value = '';
            }
        });
    });
    
    document.querySelectorAll('.season-button').forEach(button => {
        button.addEventListener('click', function () {
            // Check if the button is already selected
            const isSelected = this.classList.contains('selected');

            // Remove the 'selected' class from all armor buttons
            document.querySelectorAll('.season-button').forEach(btn => btn.classList.remove('selected'));
            
            // If the clicked button was not already selected, add the 'selected' class
            if (!isSelected) {
                this.classList.add('selected');
                // Update hidden input field with the selected armor type value
                document.getElementById('season').value = this.getAttribute('data-value');
            } else {
                // If the button was already selected, clear the hidden input field
                document.getElementById('season').value = '';
            }
        });
    });

    // Handle form submission
    document.getElementById('filterForm').addEventListener('submit', function (e) {
        e.preventDefault();

        const armorTypeId = document.getElementById('armor_type_id').value;
        const slotId = document.getElementById('slot_id').value;
        const season = document.getElementById('season').value;

        let params = {};

        if (armorTypeId) {
            params.armor_type_id = armorTypeId;
        }
        if (slotId != -1) {
            params.slot_id = slotId;
        }

        if (season) {
            if (season == 0) {
                params.isMythic0 = 1;
            } else {
                params.season = season;
            }
        }
        
        if (document.getElementById('stamina').checked) {
            params.stamina = 1;
        }
        if (document.getElementById('strength').checked) {
            params.strength = 1;
        }
        if (document.getElementById('intellect').checked) {
            params.intellect = 1;
        }
        if (document.getElementById('agility').checked) {
            params.agility = 1;
        }
        if (document.getElementById('critical_strike').checked) {
            params.critical_strike = 1;
        }
        if (document.getElementById('haste').checked) {
            params.haste = 1;
        }
        if (document.getElementById('mastery').checked) {
            params.mastery = 1;
        }
        if (document.getElementById('versatility').checked) {
            params.versatility = 1;
        }

        const queryString = new URLSearchParams(params).toString();

        fetch(`/item?${queryString}`)
            .then(response => response.json())
            .then(data => {
                const tableBody = document.querySelector('#resultsTable tbody');
                tableBody.innerHTML = ''; // Clear previous rows
            
                if (data.results.length > 0) {
                    data.results.forEach(item => {
                        const row = document.createElement('tr');
                        row.style.cursor = 'pointer'; // Make the cursor a pointer to indicate it's clickable
            
                        // Set the row click event to redirect to the URL
                        row.addEventListener('click', () => {
                            window.open(`https://wowhead.com/item=${item.ItemID}`, '_blank');
                        })
            
                        // Create a cell for the item
                        const itemCell = document.createElement('td');
                        itemCell.textContent = item.Item;
                        row.appendChild(itemCell);
            
                        // Create a cell for Dungeon
                        const dungeonCell = document.createElement('td');
                        dungeonCell.textContent = item.Dungeon;
                        row.appendChild(dungeonCell);
            
                        // Create a cell for Slot
                        const slotCell = document.createElement('td');
                        slotCell.textContent = item.Slot;
                        row.appendChild(slotCell);
            
                        // Create a cell for Weapon Type
                        const weaponTypeCell = document.createElement('td');
                        weaponTypeCell.textContent = item['Weapon Type'];
                        row.appendChild(weaponTypeCell);
            
                        // Append the row to the table body
                        tableBody.appendChild(row);
                    });
                } else {
                    const row = document.createElement('tr');
                    const noDataCell = document.createElement('td');
                    noDataCell.colSpan = 4;
                    noDataCell.textContent = 'No results found';
                    row.appendChild(noDataCell);
                    tableBody.appendChild(row);
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
            
            
    });
});

document.getElementById('toggleDarkMode').addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');

    // Optionally save the preference in localStorage
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
});

    // Check for saved theme preference and apply it
    window.onload = function() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-mode');
        }
    };

