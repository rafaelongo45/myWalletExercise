async function createFinancialEvent(id, value, type){
  await connection.query(`
    INSERT INTO "financialEvents" ("userId", "value", "type") 
    VALUES ($1, $2, $3)`
  ,[id, value, type]);
};

async function getFinancialEvent(id){
  await connection.query(`
  SELECT * 
  FROM "financialEvents" 
  WHERE "userId"=$1 
  ORDER BY "id" DESC`
  ,[id]);
};

const financialRepository = {
  createFinancialEvent,
  getFinancialEvent
};

export default financialRepository;