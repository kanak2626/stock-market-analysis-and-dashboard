// ========================================
// Recommendation based on Percentage Change
// ========================================

export const getRecommendation = (percentChange) => {

  if (percentChange >= 5) {

    return {
      action: "STRONG BUY",
      color: "success",
      reason: "Strong positive momentum detected."
    };

  }

  if (percentChange >= 2) {

    return {
      action: "BUY",
      color: "success",
      reason: "Market trend is positive."
    };

  }

  if (percentChange > -2 && percentChange < 2) {

    return {
      action: "HOLD",
      color: "warning",
      reason: "Wait for a clearer market trend."
    };

  }

  if (percentChange > -5) {

    return {
      action: "SELL",
      color: "danger",
      reason: "Market is weakening."
    };

  }

  return {
    action: "STRONG SELL",
    color: "danger",
    reason: "Heavy downward trend detected."
  };

};


// ========================================
// Recommendation using Price Difference
// ========================================

export const getPriceRecommendation = (currentPrice, previousClose) => {

  if (!previousClose) {

    return getRecommendation(0);

  }

  const percentChange =
    ((currentPrice - previousClose) / previousClose) * 100;

  return getRecommendation(percentChange);

};


// ========================================
// Portfolio Recommendation
// ========================================

export const getPortfolioRecommendation = (profitLoss) => {

  if (profitLoss > 1000) {

    return "Portfolio Performing Excellent";

  }

  if (profitLoss > 0) {

    return "Portfolio Performing Well";

  }

  if (profitLoss === 0) {

    return "Portfolio Stable";

  }

  return "Portfolio Needs Attention";

};


// ========================================
// Investment Rating
// ========================================

export const getInvestmentRating = (percentChange) => {

  if (percentChange >= 5) {

    return 5;

  }

  if (percentChange >= 2) {

    return 4;

  }

  if (percentChange >= 0) {

    return 3;

  }

  if (percentChange >= -3) {

    return 2;

  }

  return 1;

};


// ========================================
// Complete Recommendation Summary
// ========================================

export const getRecommendationSummary = (
  currentPrice,
  previousClose,
  profitLoss
) => {

  const percent =
    previousClose === 0
      ? 0
      : ((currentPrice - previousClose) / previousClose) * 100;

  return {

    recommendation: getRecommendation(percent),

    portfolio: getPortfolioRecommendation(profitLoss),

    rating: getInvestmentRating(percent)

  };

};