import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Chart from 'chart.js/auto'; 

function Dashboard() {
  const { state } = useLocation();
  const responseData = state && state.responseData;
  const [adminDetails, setAdminDetails] = useState(null);
  const [chargeCustomers, setChargeCustomers] = useState(null);
  const [customSongAmount, setCustomSongAmount] = useState();
  const [regularSongAmounts, setRegularSongAmounts] = useState({});
  const [chart, setChart] = useState(null);

  const fetchAdminDetails = async (adminId) => {

    const url = `https://stg.dhunjam.in/account/admin/${adminId}`;
    const { data } = await axios.get(url);
    const { status, data: adminDetailsData } = data;
    if (status === 200) {
      setAdminDetails(adminDetailsData);
      const { charge_customers } = adminDetailsData;
      setChargeCustomers(charge_customers);
    } 
};

  useEffect(() => {
    if (responseData && responseData.id) {
      fetchAdminDetails(responseData.id);
    }
  }, [responseData]);

  useEffect(() => {
    if (adminDetails) {
      const { amount } = adminDetails;
      setCustomSongAmount(amount.category_6);
      setRegularSongAmounts({
        category_7: amount.category_7,
        category_8: amount.category_8,
        category_9: amount.category_9,
        category_10: amount.category_10
      });
    }
  }, [adminDetails]);

  useEffect(() => {
    if (adminDetails) {
      const chartData = {
        labels: ['Custom', 'Category 7', 'Category 8', 'Category 9', 'Category 10'],
        datasets: [
          {
            backgroundColor: ['#F0C3F1', '#F0C3F1', '#F0C3F1', '#F0C3F1', '#F0C3F1'],
            data: [
              customSongAmount,
              regularSongAmounts.category_7,
              regularSongAmounts.category_8,
              regularSongAmounts.category_9,
              regularSongAmounts.category_10,
            ],
          },
        ],
      };

      const chartOptions = {
        scales: {
          xAxes: [
            {
              type: 'category',
              labels: ['Custom', 'Category 7', 'Category 8', 'Category 9', 'Category 10'],
            },
          ],
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      };
      if (chart) {
        chart.destroy();
      }
      const newChart = new Chart(document.getElementById('myChart'), {
        type: 'bar',
        data: chartData,
        options: chartOptions,
      });
      setChart(newChart);
      console.log('Admin details:', adminDetails);
    }
  }, [adminDetails, customSongAmount, regularSongAmounts]);



  const handleSave = async () => {
      await axios.put(`https://stg.dhunjam.in/account/admin/${responseData.id}`, {
        amount: {
          category_6: customSongAmount,
          category_7: regularSongAmounts.category_7,
          category_8: regularSongAmounts.category_8,
          category_9: regularSongAmounts.category_9,
          category_10: regularSongAmounts.category_10,
        },
      });
      await fetchAdminDetails(responseData.id);
  };

  const isSaveButtonEnabled =
    customSongAmount > 99 &&
    regularSongAmounts.category_7 > 79 &&
    regularSongAmounts.category_8 > 59 &&
    regularSongAmounts.category_9 > 39 &&
    regularSongAmounts.category_10 > 19;

  const handleRadioChange = (value) => {
    setChargeCustomers(value);
  };

  return (

    <div className=' bg-black h-screen'>
      {adminDetails && (
        <div className=' text-white bg-black' >

          <div className='flex flex-col items-center justify-center pt-16 font-bold text-4xl sm:flex-row sm:items-center sm:justify-center'>
            <div className='pr-1 text-center sm:text-left'>{adminDetails.name},</div>
            <div className='pr-1 text-center sm:text-left'> {adminDetails.location}</div>
            <div className='text-center sm:text-left'>on Dhun Jam</div>
          </div>
          
          <div className=' flex items-center justify-center mt-10 font-semibold text-lg'>
            <div className=' pr-44'>
            Do you want to charge your <span style={{ display: 'block' }}>customers for requesting songs?</span>
            </div>
            <div className=" pr-16">
              <label className="pr-2">
              <input
                type="radio"
                value={true}
                checked={chargeCustomers === true}
                onChange={() => handleRadioChange(true)}
                className=" "
              />
              Yes
              </label>
              <label>
              <input
              type="radio"
              value={false}
              checked={chargeCustomers === false}
              onChange={() => handleRadioChange(false)}
              className=""
              />
              No
              </label>
            </div>
          </div>
          
            <div>
              <div className='flex  items-center justify-center mt-6 font-semibold text-lg'>
                  <div className='pr-16'> Custom Song Request Amount:</div>
                  <label className='pr-10'>
                  <input
                    type="number"
                    value={customSongAmount}
                    onChange={(e) => setCustomSongAmount(parseInt(e.target.value))}
                    className="block   border border-white p-1 bg-black rounded-lg text-center"
                    disabled={!chargeCustomers}
                  />
                  </label>
              </div>
              <div className='flex  items-center justify-center font-semibold text-lg mt-2'>
                <div className=' pr-16'>Regular song request amount <span style={{ display: 'block' }}>from high to low</span></div>
                <div className='flex flex-wrap items-center mt-10'>
                <label className=' pl-2 mr-2'>
                <input
                 type='number'
                 value={regularSongAmounts.category_7}
                 onChange={(e) => setRegularSongAmounts({ ...regularSongAmounts, category_7: parseInt(e.target.value) })}
                className='block border w-16 border-white bg-black rounded-lg text-center'
                disabled={!chargeCustomers}
                />
                </label>

                <label className='mb-2 sm:mb-0 sm:mr-2'>
                <input
                type='number'
                value={regularSongAmounts.category_8}
                onChange={(e) => setRegularSongAmounts({ ...regularSongAmounts, category_8: parseInt(e.target.value) })}
                className='block border w-16 border-white bg-black rounded-lg text-center'
                disabled={!chargeCustomers}
                />
                </label>
                <label className='mb-2 sm:mb-0 sm:mr-2'>
                <input
                type='number'
                value={regularSongAmounts.category_9}
                onChange={(e) => setRegularSongAmounts({ ...regularSongAmounts, category_9: parseInt(e.target.value) })}
                className='block border w-16 border-white bg-black rounded-lg text-center'
                disabled={!chargeCustomers}
                />
                </label>
                <label>
                <input
                type='number'
                value={regularSongAmounts.category_10}
                onChange={(e) => setRegularSongAmounts({ ...regularSongAmounts, category_10: parseInt(e.target.value) })}
                className='block border w-16 border-white bg-black rounded-lg text-center'
                disabled={!chargeCustomers}
                />
                </label>
                </div>
              </div>

              {chargeCustomers ? (
              <div className=' p-11' style={{ maxWidth: '600px', margin: '0 auto' }}>
                {chart && (
                  <div><canvas id="myChart"></canvas></div>
                )}

                <button 
                className=' w-full justify-center bg-purple-700 hover:border-purple-500 hover:bg-purple-500 focus:outline-none focus:border-purple-500 focus:ring focus:ring-purple-200 text-white p-2 mt-2 rounded-xl font-semibold text-lg'
                onClick={handleSave} 
                style={{fontSize: '16px' , backgroundColor: chargeCustomers && isSaveButtonEnabled ? '' : 'gray', color: 'white' }}
                disabled={!isSaveButtonEnabled}
                >
                Save
                </button>
            </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;



