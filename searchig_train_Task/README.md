# Searching of Trains
# Track Your Journey: Find the Perfect Train with our Search App!

The Train Search Web Application enables users to easily search for train schedules between source and destination stations, and provides a list of available trains with their corresponding departure and arrival times, distance, and ticket prices. The application also offers the capability to sort the results based on price, making it convenient for users to find the most cost-effective option. Additionally, the application is scalable and designed to handle a large number of stations and train routes. It is user-friendly and provides a seamless navigation experience.

# Key Features of our Train Search App
- Easily search for trains between your desired source and destination stations with just a few clicks from the dropdown menu.
- Get a clear and concise list of available trains, including important information such as train name, departure and arrival times, distance, and ticket prices.
- Sort the list of trains based on price, allowing you to quickly find the most affordable options for your journey.
- Our app is scalable and can handle a large number of stations and train routes, making it the perfect tool for all your train travel needs.
- Our user-friendly interface is easy to navigate, ensuring a seamless experience for all users.

## Prerequisites

- Node.js
- MongoDB
- React.js

## Installation

Follow these steps to install and run the Train Search Web Application:

1. Clone the repository:
    git clone https://github.com/kavya-sri-Kalepu/searchig_train_Task.git
    cd searchig_train_Task

2. Install frontend dependencies:
    cd react-files
    npm install

3. Install backend dependencies:
    cd ../nodejs_mongodb
    npm install

4. Start the MongoDB server:

Create a database named train_search_app and a collection named trains
    Run the command: mongod

5. Start the backend server:
    npm start

6. In a new terminal, start the frontend server:
    cd ../react-files
    npm start

7. Open your browser and visit http://localhost:3000.

## Generating Sample Data

To generate sample data for 1000 trains and their routes, follow these steps:

1. Navigate to the backend folder in the project directory.

2. Open a terminal and run the following command:
    node generateTestData.js

This will create a JSON file with 1000 randomly generated train details, including source and destination stations, departure and arrival times, distance, and ticket prices. This data can be used to test the train search functionality of the application.
