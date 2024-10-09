// src/api/currencyApi.js
const BASE_URL = 'http://3.110.84.29:8080/api/v1';

export const fetchCurrencyPairs = async () => {
    const response = await fetch(`${BASE_URL}/scraping/existing-pairs`);
    if (!response.ok) {
        throw new Error('Failed to fetch currency pairs.');
    }
    return response.json();
};

export const fetchTrackedPairs = async () => {
    const response = await fetch(`${BASE_URL}/tracking/get-existing-pairs`);
    if (!response.ok) {
        throw new Error('Failed to fetch tracked pairs.');
    }
    return response.json();
};

export const fetchCurrencyData = async (base, quote) => {
    const response = await fetch(`${BASE_URL}/tracking/get-data?base=${base}&quote=${quote}`);
    if (!response.ok) {
        throw new Error('Failed to fetch currency data.');
    }
    return response.json();
};

export const fetchAverageRate = async (base, quote, startDate, endDate) => {
    const response = await fetch(`${BASE_URL}/scraping/average-rate?base=${base}&quote=${quote}&startDate=${startDate}&endDate=${endDate}`);
    if (!response.ok) {
        throw new Error('Failed to fetch average conversion rate.');
    }
    return response.json();
};

export const fetchClosingRate = async (base, quote, date) => {
    const response = await fetch(`${BASE_URL}/scraping/closing-rate?base=${base}&quote=${quote}&date=${date}`);
    if (!response.ok) {
        throw new Error('Failed to fetch closing rate.');
    }
    return response.json();
};

export const addCurrencyPair = async (base, quote) => {
    const response = await fetch(`${BASE_URL}/scraping/add-pair?base=${base}&quote=${quote}`, {
        method: 'POST',
    });
    if (!response.ok) {
        throw new Error('Failed to add currency pair.');
    }
    return response.json();
};

export const addTrackingPair = async (base, quote) => {
    const response = await fetch(`${BASE_URL}/tracking/add-pair?base=${base}&quote=${quote}`, {
        method: 'POST',
    });
    if (!response.ok) {
        throw new Error('Failed to add tracking pair.');
    }
    return response.json();
};