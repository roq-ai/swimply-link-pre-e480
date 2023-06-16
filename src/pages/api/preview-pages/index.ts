import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { previewPageValidationSchema } from 'validationSchema/preview-pages';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getPreviewPages();
    case 'POST':
      return createPreviewPage();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getPreviewPages() {
    const data = await prisma.preview_page
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'preview_page'));
    return res.status(200).json(data);
  }

  async function createPreviewPage() {
    await previewPageValidationSchema.validate(req.body);
    const body = { ...req.body };

    const data = await prisma.preview_page.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
