import db from "../../database/index.js";

export default class UsersRepository {
  constructor() {
    this.db = db;
  }

   async getUsers() {
    try {
      const allUsers = await this.db.manyOrNone("SELECT * FROM users");
      //console.log(allUsers);
      return allUsers;
    } catch (error) {
      //console.log('Deu ruim para achar os usuários', error);
      throw error
    }

  
  }


  async getUserById(id) {
  try{
    const user = await this.db.oneOrNone(
      "SELECT * FROM users WHERE id = $1", id
     );
      console.log("Será que vem?", user);
      return user;
    } catch (error) {
  console.log(`Deu ruim para achar o usuario por ID ${id}`, error);
  throw error
    } 
  }


 async getUserByEmail(email) {
     try{
      const user = await this.db.oneOrNone(
        "SELECT * FROM users WHERE email = $1", email
      );
      return user;
     } catch (error) {
      console.log(`Deu ruim para achar o usuario por email ${email}`, error);
      throw error
     }
  };
  async createUser(user) {
  try{
    await this.db.none(
      "INSERT INTO users ( id, name, email, password) VALUES ( $1, $2, $3, $4)",
      [user.id, user.name, user.email, user.password]

    );
    return user;
  } catch (error) {
    console.log('Deu ruim para criar o usuario', error);
    throw error
  }
  };

   async updateUser(id, name, email, password) {
   try { 
    const user = await this.getUserById(id);

    if (!user) {
      return null;
    }

   const updatedUser = await this.db.none(
      "UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4",
      [name, email, password, id]

    );

    return updatedUser;
   } catch (error) {
    console.log('Deu ruim para atualizar o usuario', error);
    throw error
   }
  };

  async deleteUser(id) {
   try{
    await this.db.none("DELETE FROM users WHERE id = $1", id);
   } catch (error) {
    console.log('Deu ruim para deletar o usuario', error);
    throw error
   }
  };
}
