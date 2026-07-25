// ========================================
// Profit / Loss Calculation
// ========================================

export const calculateProfitLoss = (buyPrice, currentPrice, quantity) => {

  return (currentPrice - buyPrice) * quantity;

};


// ========================================
// Percentage Gain / Loss
// ========================================

export const calculatePercentage = (buyPrice, currentPrice) => {

  if (buyPrice === 0) return 0;

  return ((currentPrice - buyPrice) / buyPrice) * 100;

};


// ========================================
// Total Investment
// ========================================

export const calculateInvestment = (buyPrice, quantity) => {

  return buyPrice * quantity;

};


// ========================================
// Current Portfolio Value
// ========================================

export const calculateCurrentValue = (currentPrice, quantity) => {

  return currentPrice * quantity;

};


// ========================================
// Average Stock Price
// ========================================

export const calculateAveragePrice = (stocks) => {

  if (!stocks || stocks.length === 0) {

    return 0;

  }

  const total = stocks.reduce(

    (sum, stock) => sum + Number(stock.price),

    0

  );

  return total / stocks.length;

};


// ========================================
// Total Portfolio Value
// ========================================

export const calculatePortfolioValue = (stocks) => {

  if (!stocks || stocks.length === 0) {

    return 0;

  }

  return stocks.reduce(

    (total, stock) =>

      total + (Number(stock.price) * Number(stock.quantity)),

    0

  );

};


// ========================================
// Highest Priced Stock
// ========================================

export const highestStock = (stocks) => {

  if (!stocks || stocks.length === 0) {

    return null;

  }

  return stocks.reduce(

    (highest, stock) =>

      Number(stock.price) > Number(highest.price)

        ? stock
        : highest

  );

};


// ========================================
// Lowest Priced Stock
// ========================================

export const lowestStock = (stocks) => {

  if (!stocks || stocks.length === 0) {

    return null;

  }

  return stocks.reduce(

    (lowest, stock) =>

      Number(stock.price) < Number(lowest.price)

        ? stock
        : lowest

  );

};


// ========================================
// Portfolio Diversification Score
// ========================================

export const diversificationScore = (stocks) => {

  if (!stocks || stocks.length === 0) {

    return "No Portfolio";

  }

  if (stocks.length >= 8) {

    return "Excellent";

  }

  if (stocks.length >= 5) {

    return "Good";

  }

  if (stocks.length >= 3) {

    return "Average";

  }

  return "Poor";

};