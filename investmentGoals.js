function convertToMontlyReturnRate(yearlyReturnRate) {
  return yearlyReturnRate ** (1 / 12);
}

export function generateReturnArray(
  startingAmount = 0,
  monthlyContribution = 0,
  timeHorizon = 0,
  timePeriod = "monthly",
  returnRate = 0,
  returnTimeFrame = "monthly",
  evt
) {
  if (!startingAmount || !timeHorizon) {
    //throw "Investimento inicial e prazo precisam estar preenchidos";
    alert("Investimento inicial e prazo precisam estar preenchidos.");
    evt.preventDefault();
  }
  const monthlyPeriod =
    timePeriod === "monthly" ? timeHorizon : timeHorizon * 12;

  const returnTimeFrame2 =
    returnTimeFrame === "monthly"
      ? 1 + returnRate / 100
      : convertToMontlyReturnRate(1 + returnRate / 100);

  const referenceInvestmentObject = {
    investedAmount: startingAmount,
    interestReturn: 0,
    totalInterestReturn: 0,
    month: 0,
    totalAmount: startingAmount,
  };
  const returnArray = [referenceInvestmentObject];

  for (let timeReference = 1; timeReference <= monthlyPeriod; timeReference++) {
    const totalAmount =
      returnArray[timeReference - 1].totalAmount * returnTimeFrame2 +
      monthlyContribution;
    const interestReturn =
      returnArray[timeReference - 1].totalAmount * returnTimeFrame2;
    const investedAmount = startingAmount + monthlyContribution * timeReference;
    const totalInterestReturn = totalAmount - investedAmount;

    returnArray.push({
      startingAmount: investedAmount,
      interestReturn: interestReturn,
      totalInterestReturn: totalInterestReturn,
      month: timeReference,
      totalAmount: totalAmount,
    });
  }
  return returnArray;
}
