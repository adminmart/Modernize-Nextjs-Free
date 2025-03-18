## Invoice Processing API
This application process invoice data from CSV file uploads. It integrates with Pinecone to store and index invoices using vector embeddings and includes AI-powered functionalities to generate reminders, search invoices, and provide detailed invoice insights.

## Features
CSV Upload & Processing:
Upload CSV files containing invoice data. The application reads the file, processes each row, and can limit the number of rows processed to prevent server overload.

## Pinecone Integration:
Each invoice is converted to a vector using an embeddings service and then upserted into a Pinecone index for efficient storage and retrieval.

## AI-Driven Capabilities:

Generate reminders and detailed responses for invoices using AI-powered services.

## Multiple Endpoints:

Upload invoices
Generate invoice reminders
Search invoices
Retrieve detailed invoice information based on user queries

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```
