# Stand Up Comedy Podcast API
This API is designed for a stand up comedy podcast. It allows you to create, edit, and delete series (podcasts) and shows (stand up comedy shows). In addition, this API uses Cloudinary for image storage and Auth0 for login security.

### Technologies Used
- Node.js
- Express.js
- MongoDB
- Cloudinary
- Auth0
### API Endpoints
- /api/series: This endpoint is used to get a list of all the series (podcasts) available in the API. You can also use this endpoint to create a new series or delete an existing one.

- /api/series/:id: This endpoint is used to get a specific series (podcast) by its ID. You can also use this endpoint to update an existing series.

- /api/shows: This endpoint is used to get a list of all the shows (stand up comedy shows) available in the API. You can also use this endpoint to create a new show or delete an existing one.

- /api/shows/:id: This endpoint is used to get a specific show (stand up comedy show) by its ID. You can also use this endpoint to update an existing show.

### Authentication
This API uses Auth0 for authentication. In order to use the API, you need to authenticate using your credentials. Once you are authenticated, you will receive a JSON Web Token (JWT) that you can use to access the API.

### Image Storage
This API uses Cloudinary for image storage. If you want to upload an image for a series or show, you need to send the image to Cloudinary and receive a URL for the image. You can then use this URL to store the image in the API.

### Getting Started

#### To get started with this API, you need to have Node.js, MongoDB, Cloudinary, and Auth0 installed on your system. Once you have installed these dependencies, you can clone this repository and run the following command:

```bash
Copy code
npm install
```

#### This will install all the dependencies required by the API. You can then start the API using the following command:

```bash
Copy code
npm start
```
This will start the API on port 3000. You can then use the API endpoints to create, read, update, and delete series and shows. You can also use Auth0 to authenticate and Cloudinary to store images.

### Conclusion
This API is designed to make it easy to create and manage stand up comedy podcasts. It uses Node.js, Express.js, and MongoDB to provide a powerful backend for managing the content. It also uses Cloudinary for image storage and Auth0 for login security. With this API, you can easily create, edit, and delete series and shows, and authenticate users with ease.
