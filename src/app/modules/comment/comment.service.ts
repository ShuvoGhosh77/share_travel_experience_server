import { Comment } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { any } from "zod";


const insertIntoDB = async (data: Comment): Promise<Comment> => {
  const { Name, Email, Comments, PostId } = data;
    const result = await prisma.comment.create({
        data:{Name,Email,Comments,PostId}
    });
    return result;
  };

  const repliesComment = async (id: any, adminReply:any): Promise<Comment> => {
    const result = await prisma.comment.update({
      where: {
        id: id,
      },
      data: {
        adminReply,
      },
    });
    return result;
};

const getByIdFromDB = async (PostId: string): Promise<any[]> => {
  const result = await prisma.comment.findMany({
    where: {
      PostId,
      adminReply: {
        not: null,
      },
    },
    select: {
      adminReply: true,
    },
  });
  return result;
};



  export const CommentService = {
    insertIntoDB,
    repliesComment,
    getByIdFromDB
 
  };