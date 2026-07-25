// ========================================
// Determine Market Mood
// ========================================

export const getMarketMood = (percentChange) => {

  if (percentChange >= 3) {

    return {
      mood: "Strong Bullish",
      color: "success",
      icon: "📈"
    };

  }

  if (percentChange >= 1) {

    return {
      mood: "Bullish",
      color: "success",
      icon: "🟢"
    };

  }

  if (percentChange > -1 && percentChange < 1) {

    return {
      mood: "Neutral",
      color: "warning",
      icon: "🟡"
    };

  }

  if (percentChange > -3) {

    return {
      mood: "Bearish",
      color: "danger",
      icon: "🔴"
    };

  }

  return {
    mood: "Strong Bearish",
    color: "danger",
    icon: "📉"
  };

};


// ========================================
// Market Trend Description
// ========================================

export const getMarketDescription = (percentChange) => {

  if (percentChange >= 3) {

    return "The market is showing strong upward momentum.";

  }

  if (percentChange >= 1) {

    return "The market is performing positively.";

  }

  if (percentChange > -1 && percentChange < 1) {

    return "The market is moving sideways with little volatility.";

  }

  if (percentChange > -3) {

    return "The market is experiencing moderate selling pressure.";

  }

  return "The market is experiencing strong downward pressure.";

};


// ========================================
// Market Volatility
// ========================================

export const getVolatility = (percentChange) => {

  const value = Math.abs(percentChange);

  if (value < 1) {

    return "Low";

  }

  if (value < 3) {

    return "Medium";

  }

  return "High";

};


// ========================================
// Trading Signal
// ========================================

export const getTradingSignal = (percentChange) => {

  if (percentChange >= 2) {

    return "BUY";

  }

  if (percentChange <= -2) {

    return "SELL";

  }

  return "HOLD";

};


// ========================================
// Market Summary
// ========================================

export const getMarketSummary = (percentChange) => {

  return {

    mood: getMarketMood(percentChange),

    description: getMarketDescription(percentChange),

    volatility: getVolatility(percentChange),

    signal: getTradingSignal(percentChange)

  };

};