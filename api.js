 import axios from "axios";

/* ==============================
   API KEYS
============================== */

const TWELVE_API_KEY = "b1c4a1a9401740f886c519240d80711a";
const FINNHUB_API_KEY = "d9ibt0hr01ql3fe13pugd9ibt0hr01ql3fe13pv0";
const ALPHA_API_KEY = "3I9FQ33H4PNBWL8E";

/* ==============================
   LIVE STOCK QUOTE
   Twelve Data -> Finnhub
============================== */

export const getStockQuote = async (symbol) => {

  /* -------- Try Twelve Data -------- */

  try {

    const { data } = await axios.get(
      `https://api.twelvedata.com/quote?symbol=${symbol}&apikey=${TWELVE_API_KEY}`
    );

    if (data && !data.code) {

      return {

        symbol: data.symbol,

        name: data.name || data.symbol,

        close: Number(data.close),

        open: Number(data.open),

        high: Number(data.high),

        low: Number(data.low),

        previous_close: Number(data.previous_close),

        percent_change: Number(data.percent_change),

        volume: data.volume,

        exchange: data.exchange

      };

    }

  }

  catch (error) {

    console.log("Twelve Data failed");

  }

  /* -------- Fallback : Finnhub -------- */

  try {

    const quote = await axios.get(

      `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${FINNHUB_API_KEY}`

    );

    const profile = await axios.get(

      `https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=${FINNHUB_API_KEY}`

    );

    return {

      symbol,

      name: profile.data.name || symbol,

      close: quote.data.c,

      open: quote.data.o,

      high: quote.data.h,

      low: quote.data.l,

      previous_close: quote.data.pc,

      percent_change:
        ((quote.data.c - quote.data.pc) / quote.data.pc) * 100,

      volume: "-",

      exchange: profile.data.exchange || "NASDAQ"

    };

  }

  catch (error) {

    console.log("Finnhub failed");

    throw new Error("Unable to fetch stock.");

  }

};

/* ==============================
   HISTORICAL DATA
   Alpha Vantage
============================== */

export const getStockHistory = async (symbol) => {

  try {

    const { data } = await axios.get(

      `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${ALPHA_API_KEY}`

    );

    return data;

  }

  catch {

    throw new Error("History unavailable");

  }

};

/* ==============================
   MARKET NEWS
   Finnhub
============================== */

export const getMarketNews = async () => {

  try {

    const { data } = await axios.get(

      `https://finnhub.io/api/v1/news?category=general&token=${FINNHUB_API_KEY}`

    );

    return data.map((item) => ({

      id: item.id,

      headline: item.headline,

      image: item.image,

      source: item.source,

      summary: item.summary,

      url: item.url,

      datetime: item.datetime

    }));

  }

  catch {

    return [];

  }

};

/* ==============================
   COMPANY PROFILE
============================== */

export const getCompanyProfile = async (symbol) => {

  const { data } = await axios.get(

    `https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=${FINNHUB_API_KEY}`

  );

  return data;

};

/* ==============================
   MARKET STATUS
============================== */

export const getMarketStatus = async () => {

  const { data } = await axios.get(

    `https://finnhub.io/api/v1/stock/market-status?exchange=US&token=${FINNHUB_API_KEY}`

  );

  return data;

};
/* ==============================
   LIVE QUOTE (Alias)
============================== */

export const getLiveQuote = async (symbol) => {
  return await getStockQuote(symbol);
};


/* ==============================
   MARKET CHART DATA
============================== */

export const getMarketChartData = async () => {

  const symbols = ["AAPL", "MSFT", "META", "IBM"];

  const result = await Promise.all(

    symbols.map(async (symbol) => {

      try {

        return await getStockQuote(symbol);

      }

      catch {

        return null;

      }

    })

  );

  return result.filter(Boolean);

};