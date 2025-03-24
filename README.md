# WoW TWW Item Filter

This project is a web-based filter tool designed to help users search for World of Warcraft (WoW) items based on various attributes like armor type, item slot, stats (e.g., stamina, strength, intellect), and seasonal content. The tool is built using Node.js, Express.js, and an SQLite database.

Demo: https://wow.rebosar.com

## Features
- **Filter by Attributes**: Users can filter items based on stats such as Strength, Intellect, Agility, Stamina, and more.
- **Armor Type & Slot Selection**: Filter items by armor type (Cloth, Leather, Mail, Plate) and specific slots (Head, Neck, Back, etc.).
- **Seasonal Content**: Filter items by seasons like Mythic 0 and Season 1 of "TWW".
- **Results Table**: Displays the filtered results with clickable rows that open the corresponding WoWhead page for detailed item information.
- **Dark Mode Toggle**: Includes a toggle for switching between light and dark modes, with the preference saved in `localStorage`.

## Known Issues
- Mythic 0 Filter not working.
- Some items may be missing or incorrect.


## Prerequisites
- **Node.js** (v14 or above)
- **SQLite3** (Database containing WoW items, `wow-drops.db`)

## Setup Instructions

1. **Clone the repository**:
    ```bash
    git clone https://github.com/rebosar/node-wow-drops.git
    cd node-wow-drops
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Set up the database**:
    - Ensure that `wow-drops.db` is located in the project root directory. This SQLite database should contain tables such as `item`, `dungeon`, `slot`, and `weapon_type` with appropriate data.

4. **Run the app**:
    ```bash
    node index.js
    ```

5. **Access the app**:
    Open your browser and go to `http://localhost:3000` to access the filter tool.

## Docker Setup

To run this project using Docker, follow the instructions below.

### Prerequisites

- **Docker**: Ensure Docker is installed on your machine. You can download it from [Docker's official site](https://www.docker.com/get-started).

### Docker Instructions

1. **Build the Docker image**:

    In the project root directory (where the `Dockerfile` is located), build the Docker image by running the following command:
    ```bash
    docker build -t node-wow-drops .
    ```

2. **Run the Docker container**:

    After building the image, run the container with the following command:
    ```bash
    docker run -d -p 3000:3000 node-wow-drops
    ```

    This will start the container and expose the app on port `3000`. You can access it in your browser at `http://localhost:3000`.

3. **Verify the container is running**:

    To check if the container is running, use:
    ```bash
    docker ps
    ```

    This command will display a list of active containers. Look for `node-wow-drops` in the list.

4. **Stop the container**:

    If you need to stop the container, first find its `CONTAINER ID` by running:
    ```bash
    docker ps
    ```

    Then, stop it using:
    ```bash
    docker stop <CONTAINER_ID>
    ```
## How It Works

- The app serves the frontend through static files in the `public` directory.
- A `/item` API endpoint is available to fetch filtered item data from the SQLite database.
- The client-side form sends filter criteria (e.g., armor type, stats, season) as query parameters, and the server returns matching rows from the `item` table.
- Clicking on a result opens the WoWhead page for the selected item.

## API Endpoint

### `GET /item`
Fetches filtered items based on the following query parameters:

| Parameter         | Type   | Description                                   |
|-------------------|--------|-----------------------------------------------|
| `armor_type_id`    | Number | The type of armor (1 for Cloth, 2 for Leather, etc.) |
| `slot_id`          | Number | The slot ID (1 for Head, 2 for Neck, etc.) |
| `stamina`          | Boolean | Whether the item has Stamina (1 or 0)         |
| `strength`         | Boolean | Whether the item has Strength (1 or 0)        |
| `intellect`        | Boolean | Whether the item has Intellect (1 or 0)       |
| `agility`          | Boolean | Whether the item has Agility (1 or 0)         |
| `critical_strike`  | Boolean | Whether the item has Critical Strike (1 or 0) |
| `haste`            | Boolean | Whether the item has Haste (1 or 0)           |
| `mastery`          | Boolean | Whether the item has Mastery (1 or 0)         |
| `versatility`      | Boolean | Whether the item has Versatility (1 or 0)     |
| `season`           | Number | The season (0 for Mythic 0, 1 for Season 1)    |

## Frontend Structure

The frontend form allows users to select armor types, slots, and attributes using buttons and checkboxes. Results are displayed in a table with the following columns:
- **Item**: Name of the item.
- **Dungeon**: Name of the dungeon where the item drops.
- **Slot**: The item's slot (e.g., Head, Chest, etc.).
- **Weapon Type**: The type of weapon (if applicable).

### Dark Mode
The dark mode toggle allows users to switch between light and dark themes, and the setting is saved using `localStorage`.

## Technologies Used
- **Node.js** with Express for backend and routing.
- **SQLite** for database management.
- **HTML/CSS/JavaScript** for the frontend.
- **Fetch API** for handling requests to the server.

