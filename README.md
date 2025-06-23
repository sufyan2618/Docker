# Docker Practice Projects

This repository contains two Dockerized Node.js-based projects for practicing Docker concepts.

## 🐳 Repository: [Docker](https://github.com/sufyan2618/Docker)

This repository includes:

1. **Basic_node_app** – A simple Node.js app that returns a JSON response.
2. **Final Lab** – A full-stack Lals Ecommerce chocolate website with backend and EJS-based frontend.

---

## 📁 Project 1: Basic_node_app

### Description
A minimal Node.js application that returns a JSON response when accessed.

### Dockerfile Used
```Dockerfile
FROM node:20-alpine
RUN mkdir node
WORKDIR /node
COPY package.json package-lock.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

### 🚀 How to Run
```bash
cd Basic_node_app
docker build -t basic-node-app .
docker run -p 3000:3000 basic-node-app
```

Then open [http://localhost:3000](http://localhost:3000) to see the JSON response.

---

## 📁 Project 2: Final Lab – Lals Ecommerce Chocolate Website

### Description
A complete Node.js + Express + MongoDB ecommerce project with EJS templates for frontend and Cloudinary integration.

### Dockerfile Used
```Dockerfile
FROM node:20-alpine
RUN mkdir lals
WORKDIR /lals
COPY package.json package-lock.json ./
RUN npm install 
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

### 🌐 Environment Variables Required

Create a `.env` file or use `-e` flags during `docker run`:
```env
MONGODB_URI=your_mongodb_connection_string
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
USER_EMAIL=admin_email_to_login
USER_PASSWORD=admin_password_to_login
```

### 🚀 How to Run
```bash
cd "Final Lab"
docker build -t lals-ecommerce-app .
docker run -p 3000:3000   -e MONGODB_URI=your_mongodb_uri   -e CLOUDINARY_CLOUD_NAME=your_cloud_name   -e CLOUDINARY_API_KEY=your_api_key   -e CLOUDINARY_API_SECRET=your_api_secret   -e USER_EMAIL=your_admin_email   -e USER_PASSWORD=your_admin_password   lals-ecommerce-app
```

Open [http://localhost:3000](http://localhost:3000) to access the website.

---

## ✅ Purpose

This repository was created to practice Docker by containerizing both a basic and a full-stack Node.js application.

Happy Dockering! 🐋
