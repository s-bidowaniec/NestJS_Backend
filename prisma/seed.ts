import { PrismaClient } from '@prisma/client';
const db = new PrismaClient();

function getProducts() {
  return [
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17256',
      name: 'Canon EOS 50D',
      price: 2000,
      description: 'Cheap, ideal for beginners',
    },
    {
      id: 'c920c7b9-a67d-4edb-8ce7-e3c9f3889e56',
      name: 'Canon EOS 5D',
      price: 5000,
      description: 'Professional camera, solid build',
    },
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17258',
      name: 'Canon R',
      price: 3000,
      description: 'Professional camera, we technology',
    },
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17259',
      name: 'Nikon D50',
      price: 2000,
      description: 'Cheap, ideal for beginners',
    },
    {
      id: '01c7599d-318b-4b9f-baf7-51f3a936a2d4',
      name: 'Leica q2',
      price: 5000,
      description: 'Small, compact, innovative',
    },
  ];
}

function getOrders() {
  return [
    {
      id: 'gd105551-0f0x-6b9f-bc41-c529c8a17372',
      clientId: 'gd105551-0f0d-4b9f-bc41-c559c8a17371',
      productId: 'fd105551-0f0d-4a9f-bc41-c559c8a17256',
    },
    {
      id: 'ax105661-0f0d-4a9f-cf41-c559c8a17263',
      clientId: 'fc105551-0f0d-4a9f-bc41-c569c8a17261',
      productId: 'fd105551-0f0d-4a9f-bc41-c559c8a17256',
    },
    {
      id: 'ac105551-0f0d-4b9f-bc41-c559c8a17264',
      clientId: 'ax105551-0f0d-4a9f-bc41-c559c8a17262',
      productId: 'fd105551-0f0d-4a9f-bc41-c559c8a17256',
    },
  ];
}

function getClients() {
  return [
    {
      id: 'gd105551-0f0d-4b9f-bc41-c559c8a17371',
      name: 'John Doe',
      address: '123 Main Street, London',
    },
    {
      id: 'fc105551-0f0d-4a9f-bc41-c569c8a17261',
      name: 'Amanda Doe',
      address: '124 Main Street, London',
    },
    {
      id: 'ax105551-0f0d-4a9f-bc41-c559c8a17262',
      name: 'Thomas Jefferson',
      address: 'Baker Street 12B, New York',
    },
  ];
}

async function seed() {
  await Promise.all(
    getProducts().map((product) => {
      return db.product.create({ data: product });
    }),
  );
  await Promise.all(
    getClients().map((client) => {
      return db.client.create({ data: client });
    }),
  );
  await Promise.all(
    getOrders().map(({ productId, clientId, ...orderData }) => {
      return db.order.create({
        data: {
          ...orderData,
          product: {
            connect: { id: productId },
          },
          client: {
            connect: { id: clientId },
          },
        },
      });
    }),
  );
}

seed();
