
# User Management System API

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login and send OTP |
| POST | `/api/auth/verify` | Verify OTP and receive JWT |

### Users

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/users/:id` | Get a user |
| PATCH | `/api/users/:id` | Update a user |
| DELETE | `/api/users/:id` | Delete a user |

### Contacts

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/users/:userId/contacts` | Create a contact for a user |
| GET | `/api/users/:userId/contacts` | Get user's contacts |
| PATCH | `/api/contacts/:id` | Update a contact |
| DELETE | `/api/contacts/:id` | Delete a contact |