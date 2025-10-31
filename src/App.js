import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    yoj: '',
    income: ''
  });
  const [responseMessage, setResponseMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const hardCodedBearerToken = 'eyJqa3UiOiJodHRwczovL2xvY2FsaG9zdC9TQVNMb2dvbi90b2tlbl9rZXlzIiwia2lkIjoibGVnYWN5LXRva2VuLWtleSIsInR5cCI6IkpXVCIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJjZDYzZDFkOS04MWZhLTRiM2EtYjE1YS04YTM2MTUzNmU2Y2EiLCJzZXNzaW9uX3NpZyI6IjAzMGFhMmRiLTAxOWUtNDdkZi05YTQ1LWVjMzNmODg0ZTllMyIsInVzZXJfbmFtZSI6InJvc3JpYyIsIm9yaWdpbiI6ImxkYXAiLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0L1NBU0xvZ29uL29hdXRoL3Rva2VuIiwiYXV0aG9yaXRpZXMiOlsiRGF0YUFnZW50QWRtaW5pc3RyYXRvcnMiLCJEYXRhQWdlbnRQb3dlclVzZXJzIl0sImNsaWVudF9pZCI6InJvc3JpYy1jbGllbnQtaWQiLCJhdWQiOlsic2NpbSIsImNsaWVudHMiLCJ1YWEiLCJvcGVuaWQiLCJyb3NyaWMtY2xpZW50LWlkIl0sImV4dF9pZCI6InVpZD1yb3NyaWMsb3U9dXNlcnMsZGM9c2FzLGRjPWNvbSIsInJlbW90ZV9pcCI6IjE0OS4xNzMuNDUuODYiLCJ6aWQiOiJ1YWEiLCJncmFudF90eXBlIjoiYXV0aG9yaXphdGlvbl9jb2RlIiwidXNlcl9pZCI6ImNkNjNkMWQ5LTgxZmEtNGIzYS1iMTVhLThhMzYxNTM2ZTZjYSIsImF6cCI6InJvc3JpYy1jbGllbnQtaWQiLCJzY29wZSI6WyJjbGllbnRzLnJlYWQiLCJjbGllbnRzLnNlY3JldCIsInVhYS5yZXNvdXJjZSIsIm9wZW5pZCIsImNsaWVudHMud3JpdGUiLCJ1YWEuYWRtaW4iLCJjbGllbnRzLmFkbWluIiwic2NpbS53cml0ZSIsInNjaW0ucmVhZCJdLCJhdXRoX3RpbWUiOjE3NjE5MjM3MTcsImV4cCI6MTc5MzQ1OTcxNywiaWF0IjoxNzYxOTIzNzE3LCJqdGkiOiJiZDVjNWQxOTIxMDE0ZTlmYTA5YTI2NmI5MmE2OGQyYiIsImVtYWlsIjoiUm9zcy5SaWNoYXJkc0BzYXMuY29tIiwicmV2X3NpZyI6IjgyM2E5Y2Q5IiwiY2lkIjoicm9zcmljLWNsaWVudC1pZCJ9.umAld0HcwPM-eY4SikIat4I0divd9MLv3Yzppi7QMx3bfQ2JManmEKFlz4bcVztWDI8oWXwllgImeWje1p_UNvDti9zYyRXrIM1uU3QS1ollbgdwKcB1qaUH0LNvSuLCUx7jy_9orE4Z0ek_4x8S83KRe11j7qubHxB9oh6OM8kdnwaJvMoSYuIo8PX85_2Cj4WJ2rR1sufDnzE3JlN0ugzYs2IzwyRval8p0yzsu2B9J6CoBt5JWG4GVsLxiniJRuW19_Q4bW9TXq6RLILMiXRoBzL7lZgEkBfS3AxT3i8AjYQfH4gpIW_apblvddgCCdylNUWRhvwt_kX4aSq9nw';

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Format JSON payload, rounding income to nearest integer
  const formatJSONPayload = (formData) => {
    return {
      inputs: [
        { name: "fname_", type: "string", value: formData.firstName.trim() },
        { name: "lname_", type: "string", value: formData.lastName.trim() },
        { name: "job_", type: "string", value: formData.yoj.trim() },
        { name: "inc_", type: "decimal", value: parseFloat(formData.income) }
      ]
    };
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Log the JSON payload being sent to the API
    const payload = formatJSONPayload(formData);
    console.log('Payload being sent to API:', JSON.stringify(payload, null, 2));

    try {
      const response = await fetch('https://d79543.lev1-azure-nginx-7504bb02.unx.sas.com/microanalyticScore/modules/auto_loan_approval/steps/execute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${hardCodedBearerToken}`
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error submitting form: ${response.status} - ${errorText}`);
      }

      // Parse and log the API response
      const data = await response.json();
      console.log('API Response:', JSON.stringify(data, null, 2));

      // Look for the 'auto_loan_message' in the 'outputs' array
      const autoLoanMessageObj = data.outputs.find(output => output.name === 'auto_loan_message');

      // Set responseMessage with auto_loan_message if found
      if (autoLoanMessageObj) {
        setResponseMessage(autoLoanMessageObj.value);
      } else {
        setResponseMessage('auto_loan_message not found');
      }

    } catch (error) {
      console.error('Error:', error);
      setResponseMessage('An error occurred: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>

        <ul className={`nav-menu ${isMenuOpen ? 'open' : ''}`}>
          <li><a href="#home">Home</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>

      <div className="header">
        <h1>V&R Auto</h1>
        <p>Your Very Reliable Dealer</p>
      </div>

      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="yoj">YOJ (Years on Job):</label>
            <select
              id="yoj"
              name="yoj"
              value={formData.yoj}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            >
              <option value="">Select...</option>
              <option value="<1 Year">&lt;1 Year</option>
              <option value="1 year">1 year</option>
              <option value="2 years">2 years</option>
              <option value="3 years">3 years</option>
              <option value="4 years">4 years</option>
              <option value="5 years">5 years</option>
              <option value="6 years">6 years</option>
              <option value="7 years">7 years</option>
              <option value="8 years">8 years</option>
              <option value="9 years">9 years</option>
              <option value="10+ years">10+ years</option>
              <option value="n/a">n/a</option>
            </select>
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="income">Income (Enter Dollar Amount):</label>
            <input
              type="number"
              id="income"
              name="income"
              value={formData.income}
              onChange={handleChange}
              required
              step="1"
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </div>
          <button type="submit" disabled={loading} style={{ width: '100%', padding: '10px', borderRadius: '4px', backgroundColor: '#007bff', color: '#fff', border: 'none', cursor: 'pointer' }}>
            {loading ? 'Loading...' : 'Submit'}
          </button>
        </form>
        {responseMessage && <p style={{ marginTop: '20px', textAlign: 'center' }}>{responseMessage}</p>}
      </div>
    </div>
  );
};

export default App;