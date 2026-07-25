// ========================================
// Risk Level based on Percentage Change
// ========================================

export const getRiskLevel = (percentChange) => {

  const value = Math.abs(percentChange);

  if (value < 2) {

    return {
      level: "Low",
      color: "success",
      score: 20
    };

  }

  if (value < 5) {

    return {
      level: "Medium",
      color: "warning",
      score: 50
    };

  }

  return {
    level: "High",
    color: "danger",
    score: 80
  };

};


// ========================================
// Portfolio Diversification Risk
// ========================================

export const getDiversificationRisk = (stocks) => {

  if (!stocks || stocks.length === 0) {

    return "High";

  }

  if (stocks.length >= 8) {

    return "Low";

  }

  if (stocks.length >= 5) {

    return "Medium";

  }

  return "High";

};


// ========================================
// Investment Risk Category
// ========================================

export const getInvestmentRisk = (buyPrice, currentPrice) => {

  if (buyPrice === 0) {

    return "Unknown";

  }

  const percent =
    ((currentPrice - buyPrice) / buyPrice) * 100;

  return getRiskLevel(percent).level;

};


// ========================================
// Overall Portfolio Risk
// ========================================

export const getPortfolioRisk = (stocks) => {

  if (!stocks || stocks.length === 0) {

    return {

      level: "Unknown",

      score: 0

    };

  }

  const averageRisk =
    stocks.reduce((total, stock) => {

      const buy = Number(stock.buyPrice);
      const current = Number(stock.price);

      if (buy === 0) return total;

      const percent =
        ((current - buy) / buy) * 100;

      return total + getRiskLevel(percent).score;

    }, 0) / stocks.length;

  let level = "";

  if (averageRisk < 30) {

    level = "Low";

  }

  else if (averageRisk < 60) {

    level = "Medium";

  }

  else {

    level = "High";

  }

  return {

    level,

    score: averageRisk.toFixed(0)

  };

};


// ========================================
// Risk Message
// ========================================

export const getRiskMessage = (riskLevel) => {

  switch (riskLevel) {

    case "Low":

      return "Portfolio is relatively stable with lower investment risk.";

    case "Medium":

      return "Portfolio has moderate risk. Monitor market movements.";

    case "High":

      return "Portfolio carries higher volatility. Invest carefully.";

    default:

      return "Risk data unavailable.";

  }

};


// ========================================
// Complete Risk Summary
// ========================================

export const getRiskSummary = (stocks) => {

  const portfolioRisk = getPortfolioRisk(stocks);

  return {

    level: portfolioRisk.level,

    score: portfolioRisk.score,

    diversification: getDiversificationRisk(stocks),

    message: getRiskMessage(portfolioRisk.level)

  };

};
