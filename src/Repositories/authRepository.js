import connection from "../database.js";

async function getUserByEmail(email){
  await connection.query(`
    SELECT * 
    FROM "users" 
    WHERE "email"=$1
  `, [email]);
};

async function createUser(name, email, password){
  const hashedPassword = bcrypt.hashSync(password, 12);
  await connection.query(`
    INSERT INTO "users" ("name", "email", "password") 
    VALUES ($1, $2, $3)
  `,[name, email, hashedPassword]);
};

const authRepository = {
  getUserByEmail,
  createUser
};



export default authRepository;