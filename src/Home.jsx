import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './Home.css'; // Assume we'll create this CSS file

function Home() {
    // State variables
    const [pairs, setPairs] = useState([]);
    const [selectedPair, setSelectedPair] = useState(null);
    const [value, setValue] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [isAverage, setIsAverage] = useState(false);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [closingRate, setClosingRate] = useState(null);
    const [averageRate, setAverageRate] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [newBaseCurrency, setNewBaseCurrency] = useState('');
    const [newQuoteCurrency, setNewQuoteCurrency] = useState('');
    const [successMessage, setSuccessMessage] = useState(null);
    const [trackedPairs, setTrackedPairs] = useState([]);
    const [selectedTrackedPair, setSelectedTrackedPair] = useState('');
    const [chartData, setChartData] = useState([]);

    // Effects
    useEffect(() => {
        fetchCurrencyPairs();
        fetchTrackedPairs();
    }, []);

    // API calls
    const fetchCurrencyPairs = async () => {
        try {
            const response = await fetch('http://3.110.84.29:8080/api/v1/scraping/existing-pairs');
            const data = await response.json();
            setPairs(data);
        } catch (error) {
            console.error('Error fetching data: ', error);
            setErrorMessage('Failed to fetch currency pairs.');
        }
    };

    const fetchTrackedPairs = async () => {
        try {
            const response = await fetch('http://3.110.84.29:8080/api/v1/tracking/get-existing-pairs');
            const data = await response.json();
            setTrackedPairs(data);
        } catch (error) {
            console.error('Error fetching tracked pairs: ', error);
            setErrorMessage('Failed to fetch tracked pairs.');
        }
    };

    const fetchCurrencyData = async (base, quote) => {
        try {
            const response = await fetch(`http://3.110.84.29:8080/api/v1/tracking/get-data?base=${base}&quote=${quote}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching currency data:', error);
            setErrorMessage('Failed to fetch currency data.');
            return [];
        }
    };

    // Event handlers
    const handleCurrencyChange = (e) => {
        setClosingRate(null);
        setErrorMessage(null);
        setAverageRate(null);
        const [baseCurrencyCode, quoteCurrencyCode] = e.target.value.split(' / ');
        const selected = pairs.find(pair => pair.baseCurrencyCode === baseCurrencyCode && pair.quoteCurrencyCode === quoteCurrencyCode);
        setSelectedPair(selected);
        setValue(e.target.value);
    };

    const handleTrackedPairChange = async (e) => {
        setSelectedTrackedPair(e.target.value);
        const [base, quote] = e.target.value.split(' / ');
        const data = await fetchCurrencyData(base, quote);
        setChartData(processCurrencyData(data));
    };

    const handleSubmit = async () => {
        const url = isAverage
            ? `http://3.110.84.29:8080/api/v1/scraping/average-rate?base=${selectedPair.baseCurrencyCode}&quote=${selectedPair.quoteCurrencyCode}&startDate=${startDate}&endDate=${endDate}`
            : `http://3.110.84.29:8080/api/v1/scraping/closing-rate?base=${selectedPair.baseCurrencyCode}&quote=${selectedPair.quoteCurrencyCode}&date=${startDate}`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            if (response.ok) {
                isAverage ? setAverageRate(data.average) : setClosingRate(data.closing);
                setErrorMessage(null);
            } else {
                throw new Error(isAverage ? "Failed to fetch average conversion rate." : "Failed to fetch closing rate");
            }
        } catch (error) {
            console.error("Error fetching rate: ", error);
            setErrorMessage(error.message);
            isAverage ? setAverageRate(null) : setClosingRate(null);
        }

        setShowModal(false);
    };

    const handleAddPair = async () => {
        if (!newBaseCurrency || !newQuoteCurrency) {
            setErrorMessage("Please enter both base and quote currencies.");
            return;
        }

        if (newBaseCurrency === newQuoteCurrency) {
            setErrorMessage("Base Currency and Quote Currency can't be the same.");
            return;
        }

        try {
            const response = await fetch(`http://3.110.84.29:8080/api/v1/scraping/add-pair?base=${newBaseCurrency}&quote=${newQuoteCurrency}`, {
                method: 'POST',
            });

            if (response.ok) {
                setErrorMessage(null);
                setNewBaseCurrency('');
                setNewQuoteCurrency('');
                await fetchCurrencyPairs();
                setSuccessMessage("Currency pair added successfully!");
                setTimeout(() => setSuccessMessage(null), 5000);
            } else {
                throw new Error("Failed to add currency pair.");
            }
        } catch (error) {
            console.error("Error adding currency pair: ", error);
            setErrorMessage(error.message);
        }
    };

    const handleAddTrackingPair = async () => {
        if (!selectedPair) {
            setErrorMessage("Please select a currency first.");
            return;
        }

        try {
            const response = await fetch(`http://3.110.84.29:8080/api/v1/tracking/add-pair?base=${selectedPair.baseCurrencyCode}&quote=${selectedPair.quoteCurrencyCode}`, {
                method: 'POST',
            });
            const data = await response.json();

            if (response.ok) {
                setErrorMessage(null);
                setSuccessMessage(data.message);
                await fetchTrackedPairs();
                setTimeout(() => setSuccessMessage(null), 5000);
            } else {
                throw new Error("Failed to add tracking pair.");
            }
        } catch (error) {
            console.error("Error adding tracking pair: ", error);
            setErrorMessage(error.message);
        }
    };

    // Helper functions
    const processCurrencyData = (data) => {
        return data.map(entry => ({
            date: entry.rateDate,
            rate: entry.exchangeRate
        }));
    };

    const getMaxDate = () => {
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);
        return yesterday.toISOString().split('T')[0];
    }

    // Render functions
    const renderCurrencyPairSelector = () => (
        <div className="section">
            <h2>Select Currency Pair</h2>
            <select className='form-control' onChange={handleCurrencyChange} value={value || ''}>
                <option value="" disabled>select a currency pair</option>
                {pairs.map((pair, index) => (
                    <option key={index} value={`${pair.baseCurrencyCode} / ${pair.quoteCurrencyCode}`}>
                        {pair.baseCurrencyCode} / {pair.quoteCurrencyCode}
                    </option>
                ))}
            </select>
        </div>
    );

    const renderSelectedPairActions = () => (
        selectedPair && (
            <div className="section">
                <h2>Selected Pair: {selectedPair.baseCurrencyCode} / {selectedPair.quoteCurrencyCode}</h2>
                <h3>What do you wish to learn?</h3>
                <div className="button-group">
                    <button className="btn btn-primary" onClick={() => { setIsAverage(true); setShowModal(true); }}>
                        Average Conversion Rate
                    </button>
                    <button className="btn btn-secondary" onClick={() => { setIsAverage(false); setShowModal(true); }}>
                        Closing Conversion Rate
                    </button>
                    <button className="btn btn-info" onClick={handleAddTrackingPair}>
                        Start tracking this
                    </button>
                </div>
            </div>
        )
    );

    const renderRateDisplay = () => (
        <div className="section" style={{ color: '#ff0000' }}>
            {averageRate && <h3>Average Conversion rate: {averageRate}</h3>}
            {closingRate && <h3>Closing Conversion Rate: {closingRate}</h3>}
        </div>
    );

    const renderTrackedPairsSelector = () => (
        <div className="section">
            <h2>Tracked Currency Pairs</h2>
            <select className='form-control' onChange={handleTrackedPairChange} value={selectedTrackedPair}>
                <option value="" disabled>select a tracked currency pair</option>
                {trackedPairs.map((pair, index) => (
                    <option key={index} value={`${pair.baseCurrencyCode} / ${pair.quoteCurrencyCode}`}>
                        {pair.baseCurrencyCode} / {pair.quoteCurrencyCode}
                    </option>
                ))}
            </select>
        </div>
    );

    const renderAddNewPair = () => (
        <div className="section">
            <h2>Add New Currency Pair</h2>
            <div className="input-group">
                <input
                    type='text'
                    className="form-control"
                    placeholder='Base Currency (e.g., USD)'
                    value={newBaseCurrency}
                    onChange={(e) => setNewBaseCurrency(e.target.value.toUpperCase())}
                />
                <input
                    type='text'
                    className="form-control"
                    placeholder='Quote Currency (e.g., INR)'
                    value={newQuoteCurrency}
                    onChange={(e) => setNewQuoteCurrency(e.target.value.toUpperCase())}
                />
                <button className="btn btn-success" onClick={handleAddPair}>Add Currency Pair</button>
            </div>
        </div>
    );

    const renderChart = () => (
        chartData.length > 0 && (
            <div className="chart-container">
                <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="rate" stroke="#8884d8" activeDot={{ r: 8 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        )
    );

    const renderModal = () => (
        <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>
                    {isAverage ? 'Average Conversion Rate' : 'Closing Conversion Rate'}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {isAverage ? (
                    <>
                        <label>Select Start Date</label>
                        <input
                            type='date'
                            className='form-control'
                            value={startDate}
                            min='2024-10-01'
                            max={getMaxDate()}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                        <label>Select End Date</label>
                        <input
                            type='date'
                            className='form-control'
                            value={endDate}
                            min='2024-10-01'
                            max={getMaxDate()}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </>
                ) : (
                    <>
                        <label>Select Date</label>
                        <input
                            type='date'
                            className='form-control'
                            value={startDate}
                            min='2024-10-01'
                            max={getMaxDate()}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
                <Button variant="primary" onClick={handleSubmit}>Submit</Button>
            </Modal.Footer>
        </Modal>
    );

    return (
        <div className="container">
            {renderCurrencyPairSelector()}
            {renderSelectedPairActions()}
            {renderRateDisplay()}
            {errorMessage && <div className='alert alert-danger' style={{ fontSize: 50 }}>{errorMessage}</div>}
            {successMessage && <div className="alert alert-success">{successMessage}</div>}
            {renderTrackedPairsSelector()}
            {renderAddNewPair()}
            {renderChart()}
            {renderModal()}
        </div>
    );
}

export default Home;