# Currency Exchange

## Libraries/Frameworks used

- **Frontend**: React, TypeScript, Material UI, Socket.io, Jest, React Testing Library.
- **Backend** : Nestjs, TypeScript, Event-emitter, Mongoose, websockets.
- **Database**: MongoDB

## Running The Application

### 1. To run locally

1. Download and Install MongoDB on your local machine.
2. Inside the `backend` directory, run `npm install` to install the backend dependencies.
3. Obtain a BACKEND_URL_ACCESS_KEY by creating an account on https://coinlayer.com/ a real-time crypto currency exchange api.
4. Create a `.env` file under `backend` directory and set the following environment variables:
```
BACKEND_URL=http://api.coinlayer.com/api
BACKEND_URL_ACCESS_KEY=522df20f7bc454382c04e7f9f042b7ae
DATABASE_URL=mongodb://127.0.0.1/:27017/cryptocurrency
```
Start the nestjs server using `npm start`. The server will start on http://localhost:3001


Now that the nestjs server is running, bootstrap the frontend:

5. Inside the `frontend` directory, run `npm install` to install the frontend dependencies.
6. Create a `.env` file under `frontend` directory and set the following environment variables:

```
REACT_APP_BACKEND_URL=http://localhost:3001
```

7. Start the frontend dev server using `npm start`. The server will start on http://localhost:3000

### 2. To run application using Docker
1. Obtain a BACKEND_URL_ACCESS_KEY by creating an account on https://coinlayer.com/ a real-time crypto currency exchange api.
2. Update the docker-compose.yml file in the root of the project and replace BACKEND_URL_ACCESS_KEY with the obtained key.
3. In the root of the project run `docker-compose up --build`. The backend will start running on port 3001 and frontend on port 3000. The application can be accessed on http://localhost:3000

## Test cases snapshot

Backend:

![Snapshot of backend cases](/docs/frontend-testcases.png)

Frontend:

![Snapshot of backend cases](/docs/frontend-testcases.png)

Thanks for your time :)
