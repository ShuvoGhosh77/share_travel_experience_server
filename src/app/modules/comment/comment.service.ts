import { Comment } from "@prisma/client";
import prisma from "../../../shared/prisma";



const insertIntoDB = async (data: Comment): Promise<Comment> => {
  const { Name, Email, Comments, PostId } = data;
    const result = await prisma.comment.create({
        data:{Name,Email,Comments,PostId}
    });
    return result;
  };


const getByIdFromDB = async (PostId: string): Promise<any[]> => {

  const result = await prisma.comment.findMany({
    where: {
      PostId,
     
    },
    
  });
  return result;
};



  export const CommentService = {
    insertIntoDB,
    getByIdFromDB
 
  };