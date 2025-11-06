# ShareIt Marketplace

A full-stack mobile marketplace for the peer-to-peer rental of outdoor equipment. Built with a focus on providing a secure and seamless experience for users looking to rent and share outdoor gear, **ShareIt** allows individuals to list, browse, and rent items like tents, kayaks, bicycles, and more.

---

## Table of Contents

* [Project Overview](#project-overview)
* [Tech Stack](#tech-stack)
* [Features](#features)
* [Installation](#installation)
* [Usage](#usage)
* [Contributing](#contributing)
* [License](#license)
* [Contact](#contact)

---

## Project Overview

**ShareIt** is a mobile app designed to facilitate the peer-to-peer rental of outdoor equipment. The platform allows users to list their gear, manage availability, and connect with renters securely. It's built to enhance the outdoor experience by providing a marketplace where outdoor enthusiasts can share their gear with others, helping to reduce costs and waste while fostering community engagement.

This project aims to provide the following functionalities:

* **Real-Time Listings**: Users can create and manage listings with images, descriptions, and availability calendars.
* **User Engagement**: Features such as likes, comments, and bookmarks allow users to interact with the listings and save their favorite gear.
* **Secure Transactions**: The platform includes early-stage escrow logic and secure messaging for safe transactions between renters and owners.
* **Custom Backend**: A robust Node.js/Express backend with MongoDB for storing user and gear data.
* **Cross-Platform Support**: The app is built using **React Native** for a smooth, responsive experience across iOS and Android devices.

---

## Tech Stack

* **Frontend**: React Native
* **Backend**: Node.js, Express.js
* **Database**: MongoDB
* **Authentication**: JWT (JSON Web Tokens)
* **Real-Time Features**: Socket.IO (for messaging and live updates)
* **File Storage**: Cloud storage solutions for images
* **Escrow & Payments**: Early-stage escrow logic

---

## Features

* **User Accounts & Profiles**: Create and manage user profiles, view past transactions, and update account settings.
* **Real-Time Gear Listings**: Search, filter, and browse equipment based on category, location, and availability.
* **Item Reviews**: Leave ratings and reviews on rented gear and experiences.
* **Secure Messaging**: Built-in chat system for direct communication between gear owners and renters.
* **Escrow Logic**: Early-stage escrow logic to hold payments until the transaction is confirmed by both parties.
* **Calendar Integration**: Syncs gear availability with a calendar to ensure accurate booking.

---

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/diegomontemayor123/shareit.git
   cd shareit
   ```

2. Install the necessary dependencies for the backend:

   ```bash
   cd backend
   npm install
   ```

3. Install the necessary dependencies for the frontend:

   ```bash
   cd frontend
   npm install
   ```

4. Set up your MongoDB database (you can use a cloud solution like MongoDB Atlas).

5. Set up environment variables:

   * Create a `.env` file in both `frontend` and `backend` directories to define sensitive information such as API keys, database URIs, and JWT secrets.

6. Start the development servers:

   * Backend:

     ```bash
     cd backend
     npm start
     ```
   * Frontend:

     ```bash
     cd frontend
     npm start
     ```

---

## Usage

Once the app is up and running, you can:

* **Browse gear** by category, location, or availability.
* **Post new listings** for outdoor equipment you want to rent.
* **Communicate securely** with other users via the built-in messaging system.
* **Manage your listings** by editing details, updating availability, or removing items.
* **Engage with the community** by liking, commenting, and bookmarking your favorite items.

---

## Contributing

We welcome contributions to improve ShareIt. If you'd like to contribute, follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make your changes and commit them (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Create a pull request.

---

## License

This project is **proprietary** and **all rights are reserved**. You may not use, modify, or distribute the code without permission.

---

## Contact

For any inquiries or issues, please feel free to reach out via GitHub issues or directly to diegomontemayor.f@gmail.com
