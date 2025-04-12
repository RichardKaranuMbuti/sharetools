# ShareTools API

A community tool sharing application backend built with Node.js, Express, TypeScript, and PostgreSQL.

## Group Members

| Name              | Registration Number |
|-------------------|---------------------|
| RICHARD KARANU    |  SCT212-0062/2019        |
| [Member 2 Name]   | [Reg No. 2]         |
| [Member 3 Name]   | [Reg No. 3]         |
| [Member 4 Name]   | [Reg No. 4]         |

## Description

ShareTools API is a RESTful service that enables community members to share, borrow, and manage tools. This platform facilitates resource sharing within communities, helping to reduce waste and strengthen community bonds.

## Features

- User authentication and authorization
- Tool inventory management
- Borrowing and returning process
- Reservation system
- Community management
- Rating and review system

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- PostgreSQL (v12 or higher)

## Installation

Clone the repository:

```bash
git clone https://github.com/yourusername/sharetools-api.git
cd sharetools-api
```

Install dependencies:

```bash
npm install
```

Set up your environment variables by creating a .env file in the root directory:

```
# Server Configuration
PORT=3000

# Database Configuration
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=sharetools_db
```

Create the database:

```bash
createdb sharetools_db
```

## Running the Application

### Development Mode

```bash
npm run dev
```

### Production Mode

```bash
npm run build
npm start
```

## Project Structure

```
sharetools-api/
├── src/                  # Source code
│   ├── controllers/      # Route controllers
│   ├── middleware/       # Express middleware
│   ├── models/           # Database models
│   ├── routes/           # API routes
│   ├── services/         # Business logic
│   ├── utils/            # Utility functions
│   └── server.ts         # Server entry point
├── dist/                 # Compiled TypeScript
├── .env                  # Environment variables
├── .gitignore            # Git ignore file
├── package.json          # Project dependencies
├── tsconfig.json         # TypeScript configuration
└── README.md             # Project documentation
```

## API Endpoints

- `GET /` - Welcome message and API status
- `GET /health` - Health check endpoint

Additional endpoints will be documented as they are implemented.

## Development

### Scripts

- `npm run build` - Compiles TypeScript to JavaScript
- `npm run start` - Starts the production server
- `npm run dev` - Starts the development server with hot-reloading
- `npm run test` - Runs tests

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Acknowledgments

- Express.js team
- TypeScript team
- Community contributors
