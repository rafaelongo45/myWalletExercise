import financialRepository from "../Repositories/financialRepository.js";
import { checkFinancialTypeAndValue, createSum } from "../Services/financialServices.js";

export async function createFinancialEvent(req, res){
  const { value, type } = req.body;
  const { user } = res.locals;

  try {
    if (!value || !type) {
      return res.sendStatus(422);
    }

    checkFinancialTypeAndValue(type, value);

    await financialRepository.createFinancialEvent(user.id, value, type);
    res.sendStatus(201);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
};

export async function getFinancialEvent(req, res){
  const { user } = res.locals;

  try { 
    const events = await financialRepository.getFinancialEvent(user.id);
    res.send(events.rows);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

export async function getSumFinancialEvent(req, res){
  const { user } = res.locals;
  
  try {
    const events = await financialRepository.getFinancialEvent(user.id);
    createSum(events);
    res.send({ sum });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}