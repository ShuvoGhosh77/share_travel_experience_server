
import bcrypt from 'bcrypt';

const isPasswordMatched = async (
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean> =>{
    return await bcrypt.compare(givenPassword, savedPassword);
  };
  

export default isPasswordMatched;