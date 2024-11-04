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

  const hardCodedBearerToken = 'eyJqa3UiOiJodHRwczovL2xvY2FsaG9zdC9TQVNMb2dvbi90b2tlbl9rZXlzIiwia2lkIjoibGVnYWN5LXRva2VuLWtleSIsInR5cCI6IkpXVCIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJjZDYzZDFkOS04MWZhLTRiM2EtYjE1YS04YTM2MTUzNmU2Y2EiLCJzZXNzaW9uX3NpZyI6IjBiZjE0YmZlLWNlNzctNGRlMC05YmVhLWY2NTMwMGFmYmQwZCIsInVzZXJfbmFtZSI6InJvc3JpYyIsIm9yaWdpbiI6ImxkYXAiLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0L1NBU0xvZ29uL29hdXRoL3Rva2VuIiwiYXV0aG9yaXRpZXMiOlsiU0FTQWRtaW5pc3RyYXRvcnMiLCJEYXRhQWdlbnRBZG1pbmlzdHJhdG9ycyIsIkRhdGFBZ2VudFBvd2VyVXNlcnMiXSwiY2xpZW50X2lkIjoiYXV0b19sb2FuX2RlbW8iLCJhdWQiOlsic2NpbSIsImF1dG9fbG9hbl9kZW1vIiwiY2xpZW50cyIsInVhYSIsIm9wZW5pZCJdLCJleHRfaWQiOiJ1aWQ9cm9zcmljLG91PXVzZXJzLGRjPXNhcyxkYz1jb20iLCJyZW1vdGVfaXAiOiIxNDkuMTczLjguMTI3IiwiemlkIjoidWFhIiwiZ3JhbnRfdHlwZSI6ImF1dGhvcml6YXRpb25fY29kZSIsInVzZXJfaWQiOiJjZDYzZDFkOS04MWZhLTRiM2EtYjE1YS04YTM2MTUzNmU2Y2EiLCJhenAiOiJhdXRvX2xvYW5fZGVtbyIsInNjb3BlIjpbImNsaWVudHMucmVhZCIsImNsaWVudHMuc2VjcmV0IiwidWFhLnJlc291cmNlIiwiU0FTQWRtaW5pc3RyYXRvcnMiLCJvcGVuaWQiLCJjbGllbnRzLndyaXRlIiwidWFhLmFkbWluIiwiY2xpZW50cy5hZG1pbiIsInNjaW0ud3JpdGUiLCJzY2ltLnJlYWQiXSwiYXV0aF90aW1lIjoxNzI5Nzk5NzcxLCJleHAiOjE3NjEzMzU3NzEsImlhdCI6MTcyOTc5OTc3MSwianRpIjoiNDMyZGQ1NzZlYWM4NGI0ODkyODg0OWFkYzg4YWQyNmQiLCJlbWFpbCI6IlJvc3MuUmljaGFyZHNAc2FzLmNvbSIsInJldl9zaWciOiJjMjljMGU0OCIsImNpZCI6ImF1dG9fbG9hbl9kZW1vIn0.ijm0uNofZyohLdmWTvY57m9g9vmhU-CZBAAhQnjTdS8-_-6yKULjiyVQVZ4WuxrscOZ5O20BAXscsaThXpkJ0IAw9pbSPWAjQdFGelDDmHSsKXnlx310yFTj2t5AYqgNXd9tZWgEJBCcQkuuLIfnKyIr1sk2g9MRDDtvyU7dmtoLy1ZG1lSPa1BpY0Xrhxaw0-fUuMq4yAyEBwAhD1Sv_DZ8ottd24l5TMMd6aV_q1GSwXeDWQDM6mKf7qlVWefYlrO0u05s1zXWLetDJv0O_vkkmJjpuh3QEP4n3IjhnzaxSK0cNpIj65nSbMB8dnm_6ciev0hGhwF_4dVcMg6S9Q';

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