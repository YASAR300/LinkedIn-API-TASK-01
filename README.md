# LinkedIn API Task List

### For detailed API documentation, check the Postman link:  
[Click here to view Postman Documentation](https://documenter.getpostman.com/view/39189780/2sAYQUptdv)


[Google Drive Link](https://drive.google.com/file/d/1M6y7NesVS35JmrftVYOVwAfTMwmjhmZb/view?usp=drive_link)

---

## Overview

This project involves building a LinkedIn-like API system using MongoDB for data storage. The system enables users to manage profiles, connections, posts, and messages. Below is a high-level overview of the tasks and collections involved.

---

## MongoDB Collection Structure

### 1. **Users**
- Stores user profiles, including details such as name, headline, location, skills, experience, education, certifications, and premium status.
- Tracks metrics like profile views and connection counts.

### 2. **Connections**
- Manages connections between users, including statuses like "connected" or "pending."
- Enables users to send and accept connection requests.

### 3. **Posts**
- Stores posts created by users, which can include text, media, hashtags, likes, and comments.
- Tracks engagement metrics like likes and comments for each post.

### 4. **Messages**
- Records direct messages exchanged between users.
- Includes timestamps and the content of the messages.

---

## Key Features and Endpoints

### **1. User Management**
- Fetch all users or a specific user by ID.
- Create, update, or delete user profiles.
- Track user profile views and manage user skills.
- Upgrade a user to a premium account.

### **2. Connections Management**
- View all connections for a user.
- Send and accept connection requests.
- Remove or reject connections.

### **3. Post Management**
- Fetch all posts or a specific post by ID.
- Create new posts with text and media.
- Engage with posts via likes and comments.
- Delete posts as needed.

### **4. Messaging**
- View messages for a specific user.
- Send new messages to other users.
- Delete messages as needed.

---

## Tasks Summary

1. **Database Initialization**: 
   - Set up MongoDB collections (`Users`, `Connections`, `Posts`, and `Messages`) and populate them with sample data.

2. **User Management**: 
   - Implement endpoints to handle user profiles, including creating, updating, and deleting users.

3. **Connections**: 
   - Build endpoints to manage connections, including sending, accepting, and removing connection requests.

4. **Posts**: 
   - Develop endpoints for creating, updating, and deleting posts, along with managing engagement metrics like likes and comments.

5. **Messaging**: 
   - Create endpoints for direct messaging, including sending, viewing, and deleting messages.

---

## Usage

This API enables functionalities similar to LinkedIn, making it ideal for managing professional networks, user engagement, and direct communication. The modular collection structure ensures scalability and ease of management for future enhancements.

For detailed API requests and responses, refer to the [Postman Documentation](https://documenter.getpostman.com/view/39189780/2sAYQUptdv).
