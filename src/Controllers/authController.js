import authRepository from "../Repositories/authRepository.js";

export async function signup(req, res){
  const { name, email, password } = req.body;
    
  try {  
    const userExists = await authRepository.getUserByEmail(email);

    if (userExists.rowCount > 0) {
      return res.sendStatus(409);
    }

    await authRepository.createUser(name, email, password);
    res.sendStatus(201);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
};

export async function signin(req, res){
  const { email, password } = req.body;

  try {
  
    const { rows } = await authRepository.getUserByEmail(email);
    const [user] = rows;
  
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.sendStatus(401);
    }
  
    const token = jwt.sign(
      {
        id: user.id,
      },
      process.env.JWT_SECRET
    );
  
    res.send({
      token,
    });
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
};