// ========================================
// Total Portfolio Value
// ========================================

export const getTotalPortfolioValue = (stocks) => {

  if (!stocks || stocks.length === 0) {
    return 0;
  }

  return stocks.reduce((total, stock) => {

    return total + (Number(stock.price) * Number(stock.quantity));

  }, 0);

};


// ========================================
// Total Investment
// ========================================

export const getTotalInvestment = (stocks) => {

  if (!stocks || stocks.length === 0) {
    return 0;
  }

  return stocks.reduce((total, stock) => {

    return total + (Number(stock.buyPrice) * Number(stock.quantity));

  }, 0);

};


// ========================================
// Total Profit / Loss
// ========================================

export const getPortfolioProfitLoss = (stocks) => {

  const investment = getTotalInvestment(stocks);

  const currentValue = getTotalPortfolioValue(stocks);

  return currentValue - investment;

};


// ========================================
// Portfolio Performance
// ========================================

export const getPortfolioPerformance = (stocks) => {

  const profit = getPortfolioProfitLoss(stocks);

  if (profit > 0) {

    return "Profit";

  }

  if (profit < 0) {

    return "Loss";

  }

  return "Break Even";

};


// ========================================
// Best Performing Stock
// ========================================

export const getBestStock = (stocks) => {

  if (!stocks || stocks.length === 0) {

    return null;

  }

  return stocks.reduce((best, stock) =>

    Number(stock.percentChange) >
    Number(best.percentChange)

      ? stock

      : best

  );

};


// ========================================
// Worst Performing Stock
// ========================================

export const getWorstStock = (stocks) => {

  if (!stocks || stocks.length === 0) {

    return null;

  }

  return stocks.reduce((worst, stock) =>

    Number(stock.percentChange) <
    Number(worst.percentChange)

      ? stock

      : worst

  );

};


// ========================================
// Portfolio Diversification
// ========================================

export const getDiversification = (stocks) => {

  const count = stocks.length;

  if (count >= 8) {

    return "Excellent";

  }

  if (count >= 5) {

    return "Good";

  }

  if (count >= 3) {

    return "Average";

  }

  return "Poor";

};


// ========================================
// Portfolio Summary
// ========================================

export const getPortfolioSummary = (stocks) => {

  return {

    totalInvestment: getTotalInvestment(stocks),

    currentValue: getTotalPortfolioValue(stocks),

    profitLoss: getPortfolioProfitLoss(stocks),

    performance: getPortfolioPerformance(stocks),

    bestStock: getBestStock(stocks),

    worstStock: getWorstStock(stocks),

    diversification: getDiversification(stocks)

  };

};
