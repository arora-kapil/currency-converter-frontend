# Full Stack Currency Converter Application
This full-stack application scrapes forex conversion rates daily, stores the data, and provides a REST API to retrieve various forex data. It is built using Spring Boot (Java) for the backend, React for the frontend, and is hosted using AWS services (S3 and EC2).

* Link to the backend repository: https://github.com/arora-kapil/currency-converter

## Features
### 1. Data Scraping
Scrapes forex rates daily at 9 AM from oanda.com (fxds-public-exchange-rates-api)
Supports the scraping of additional currency pairs via API.
### 2. Data Storage
Stores historical forex data in an H2 database.
Easily extendable to other SQL databases (MySQL, PostgreSQL, etc.).
Maintains historical data for all currency pairs.
### 3. REST API Endpoints
Get All Currency Pairs: Retrieve a list of all available currency pairs.
Get Average Conversion Rate: Retrieve the average rate for a currency pair between specified dates.
Get Closing Conversion Rate: Get the closing rate for a currency pair on a specific date.
Add a New Currency Pair: Add a new currency pair to the system for tracking.
Start Tracking a Currency Pair: Enable tracking for a specific currency pair.
Get Tracked Currency Pairs: Retrieve all currency pairs being tracked by the system.
Get Last 90 Days of Data: Retrieve historical data for the past 90 days for a selected currency pair.
### 4. Error Handling and Logging
Implements robust error-handling mechanisms to capture and log important events and exceptions.
### 5. Performance
API response times are optimized to remain under 100ms, ensuring fast and efficient data delivery.
Tech Stack
Backend: Spring Boot (Java)
Frontend: React
Database: H2 (in-memory), extendable to MySQL or PostgreSQL
Hosting: AWS S3 (Frontend) and EC2 (Backend)
## How to Run the Application
### Prerequisites
Java: Version 21+
Node.js: For running the React frontend
SQL Database: H2 (in memory)
AWS: An AWS account with S3 and EC2 setup
Backend (Spring Boot)

### Clone the repository:
git clone https:/github.com/arora-kapil/currency-converter.git
cd forex-scraper-api

### AWS Deployment
#### Frontend
Hosted on AWS S3 as a static website.
Follow AWS documentation for deploying a React app on S3.
#### Backend
Hosted on AWS EC2.
Set up an EC2 instance, ensuring that port 8080 is open for backend access.


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
