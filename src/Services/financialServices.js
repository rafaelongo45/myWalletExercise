export function checkFinancialTypeAndValue(type, value){
  const financialTypes = ["INCOME", "OUTCOME"];
  if (!financialTypes.includes(type)) {
    return res.sendStatus(422);
  };
  
  if (value < 0) {
    return res.sendStatus(422);
  };
};

export function createSum(events){
  const sum = events.rows.reduce(
    (total, event) =>
      event.type === "INCOME" ? total + event.value : total - event.value,
    0
  );

  return sum
};