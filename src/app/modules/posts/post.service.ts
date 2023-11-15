import { Posts } from "@prisma/client";
import prisma from "../../../shared/prisma";


const insertIntoDB = async (data: Posts): Promise<Posts> => {
    const result = await prisma.posts.create({
        data,
    });
    return result;
};


export const PostService = {
    insertIntoDB,

};