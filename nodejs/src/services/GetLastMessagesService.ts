import prismaClient from '../prisma';

class GetLastMessagesService {
  async execute() {
    const messages = await prismaClient.message.findMany({
      take: 3,
      orderBy: {
        created_ed: 'desc',
      },
      include: {
        user: true,
      },
    });
    return messages;
  }
}

export { GetLastMessagesService };
