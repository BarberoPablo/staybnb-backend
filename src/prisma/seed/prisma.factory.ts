import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';

export function createPrismaClient() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error('DATABASE_URL is not defined');
  }

  const pool = new Pool({
    connectionString,
    max: 5,
  });

  const adapter = new PrismaPg(pool);

  const prisma = new PrismaClient({ adapter });

  return {
    prisma,
    disconnect: async () => {
      await prisma.$disconnect();
      await pool.end();
    },
  };
}
