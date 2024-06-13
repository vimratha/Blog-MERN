
# MERN Stack Blog Application

This MERN stack blog application is a comprehensive platform featuring user authentication, registration, post management, and comment functionalities. Leveraging MongoDB, Express.js, React.js, Node.js, and Vite, it delivers a seamless user experience and efficient content management.

## Technologies Used

- **MongoDB**: NoSQL database for storing user data, blog posts, and comments.
- **Express.js**: Web application framework for Node.js to build RESTful APIs.
- **React.js**: JavaScript library for building the user interface.
- **Node.js**: JavaScript runtime for building the server-side application.
- **Vite**: Build tool providing a fast development environment for modern web projects.

## Key Features and Implementation

### User Authentication and Registration
- **Registration**: Users create accounts by providing necessary details. The registration data is sent from the React front-end to the Express back-end, validated, and stored in the MongoDB database.
- **Login**: Users log in with their credentials. The server validates the credentials against stored data in MongoDB. Upon successful login, a JSON Web Token (JWT) is generated and sent back to the client to maintain session state.

### Post Management
- **Creating Posts**: Authenticated users can create new blog posts. The post data, including title, content, and metadata, is sent via a POST request to the Express server, which processes and stores the data in MongoDB.
- **Editing Posts**: Users can edit their existing posts. The React front-end sends the updated post data via a PUT request to the server, which updates the corresponding document in MongoDB.
- **Deleting Posts**: Users can delete their posts. A DELETE request is sent to the server with the post ID, and the server removes the corresponding document from MongoDB.
- **Searching Posts**: Users can search for posts using keywords. The search functionality sends a GET request with query parameters to the server, which queries MongoDB and returns matching posts.

### Comment Management
- **Adding Comments**: Only registered and authenticated users can add comments to posts. The comment data, including the post ID, user ID, and comment text, is sent via a POST request to the Express server, which processes and stores the comment in MongoDB.
- **Viewing Comments**: Users can view comments on posts. A GET request is sent to the server with the post ID, and the server retrieves all comments associated with that post from MongoDB and returns them to the client.
- **Deleting Comments**: Users can delete their comments. A DELETE request is sent to the server with the comment ID, and the server removes the corresponding document from MongoDB.

### Access Control
- **Post Viewing**: Only registered and authenticated users can view posts and comments. The front-end checks for authentication status and displays content accordingly.
- **Middleware**: Middleware functions in Express ensure that only authenticated users can access certain routes. These middleware functions check for the presence and validity of JWTs in the request headers.

## API Request Handling and CRUD Operations

### API Design
The RESTful API endpoints handle different operations on blog posts, comments, and user data. Each endpoint corresponds to a specific HTTP method and resource path, ensuring clear and structured communication between the client and server.

### CRUD Operations
- **Create**:
  - `POST /api/posts` - Handles the creation of new posts.
  - `POST /api/posts/:id/comments` - Handles the creation of new comments for a specific post.
- **Read**:
  - `GET /api/posts` and `GET /api/posts/:id` - Retrieves all posts or a specific post by ID.
  - `GET /api/posts/:id/comments` - Retrieves all comments for a specific post.
- **Update**:
  - `PUT /api/posts/:id` - Updates an existing post by ID.
- **Delete**:
  - `DELETE /api/posts/:id` - Deletes a specific post by ID.
  - `DELETE /api/comments/:id` - Deletes a specific comment by ID.

## Integration

### Front-End Integration
React components capture user input and make API requests using Axios or the Fetch API. State management is handled using React's Context API or libraries like Redux.

### Back-End Integration
Express routes handle incoming requests, perform necessary validations, and interact with MongoDB using Mongoose for database operations. Middleware functions ensure requests are authenticated and authorized.

### Development and Build Tools
Vite provides a fast and efficient development environment, handling hot-reloading of React components and optimizing the build process for deployment.

This project demonstrates the effective use of the MERN stack to build a robust and scalable blog application. The integration of technologies ensures smooth API request handling and efficient execution of CRUD operations, providing a seamless experience for users to manage their content and interact with posts through comments.
