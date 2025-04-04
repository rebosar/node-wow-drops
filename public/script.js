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
        const season = 2;

        let params = {};

        if (armorTypeId) {
            params.armor_type_id = armorTypeId;
        }
        if (slotId != -1) {
            params.slot_id = slotId;
        }

        if (season) {
            params.season = season;
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
        const tooltip_bonusChampion1 = 11977;
        const tooltip_bonusMythic = 9635;
        const tooltip_ilvl = 636;
        const tooltipBuilder = `bonus=${tooltip_bonusChampion1}:${tooltip_bonusMythic}&ilvl=${tooltip_ilvl}`;

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
                        });
                    
                        const itemCell = document.createElement('td');
                    
                        // Create the item link
                        const itemLink = document.createElement('a');
                        itemLink.href = `https://wowhead.com/item=${item.ItemID}`;
                        itemLink.target = '_blank';
                        itemLink.setAttribute('data-wowhead', `item=${item.ItemID}&${tooltipBuilder}`);
                    
                        // Add an image to show the Wowhead icon
                        const itemIcon = document.createElement('img');
                        itemIcon.src = `https://wow.zamimg.com/images/wow/icons/large/${item.Icon}.jpg`; // Replace `item.Icon` with actual icon data if available
                        itemIcon.alt = item.Item;
                        itemIcon.style.width = '24px';
                        itemIcon.style.height = '24px';
                        itemIcon.style.marginRight = '5px';
                        itemIcon.style.verticalAlign = 'middle';
                    
                        // Append the icon and text inside the link
                        itemLink.appendChild(itemIcon);
                        itemLink.appendChild(document.createTextNode(item.Item));
                    
                        itemCell.appendChild(itemLink);
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
                    
                    // Reinitialize Wowhead tooltips after adding new rows
                    if (window.$WowheadPower) {
                        window.$WowheadPower.refreshLinks();
                    }
                    
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

