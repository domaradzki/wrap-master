import { db } from "@/lib/db";

export const getAllDocuments = async ({
  trader,
  isAdmin,
}: {
  trader: string;
  isAdmin: boolean;
}) => {
  try {
    const documents = await db.document.findMany({
      where: isAdmin ? {} : { trader },
      include: {
        company: true,
        orders: {
          include: {
            product: {
              include: {
                tape: true,
                stretch: true,
              },
            },
          },
        },
      },
    });
    return documents;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getIdsDocuments = async () => {
  try {
    const documents = await db.document.findMany();
    return documents;
  } catch (error) {
    console.error(error);
    return null;
  }
};
