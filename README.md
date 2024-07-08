# Elysia Simple Auth Kit
This is a simple auth kit for starter project that require authentication. After download this repo you can customize it on your own.

## Installation
Clone this repo first:
```bash
git clone
```
Download Dependencies: 
```bash
bun install
```

## Development

To start the development server run:

```bash
bun run dev
```

Open http://localhost:3000/ with your Postman to see the result.

## API Reference

#### Login

```http
  POST /api/v1/auth/login
```

| Parameter | Type     | Required                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **True** |
| `password` | `string` | **True** |

#### Register

```http
  POST /api/v1/auth/register
```

| Parameter | Type     | Required                |
| :-------- | :------- | :------------------------- |
| `full_name` | `string` | **True** |
| `email` | `string` | **True** |
| `password` | `string` | **True** |