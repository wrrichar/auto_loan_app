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
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Hamburger menu state

  // Hardcoded bearer token (replace with your actual token)
  const hardCodedBearerToken = 'eyJqa3UiOiJodHRwczovL2xvY2FsaG9zdC9TQVNMb2dvbi90b2tlbl9rZXlzIiwia2lkIjoibGVnYWN5LXRva2VuLWtleSIsInR5cCI6IkpXVCIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJjZDYzZDFkOS04MWZhLTRiM2EtYjE1YS04YTM2MTUzNmU2Y2EiLCJ1c2VyX25hbWUiOiJyb3NyaWMiLCJvcmlnaW4iOiJsZGFwIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdC9TQVNMb2dvbi9vYXV0aC90b2tlbiIsImF1dGhvcml0aWVzIjpbIlNBU0FkbWluaXN0cmF0b3JzIiwiRGF0YUFnZW50QWRtaW5pc3RyYXRvcnMiLCJEYXRhQWdlbnRQb3dlclVzZXJzIl0sImNsaWVudF9pZCI6InNhcy5jbGkiLCJhdWQiOlsic2FzLndvcmtsb2FkT3JjaGVzdHJhdG9yIiwic2NpbSIsImNsaWVudHMiLCJzYXMudHJhbnNmZXIiLCJzYXMuY29tcHV0ZSIsInNhcy5jbGkiLCJzYXMuZGFnZW50c3J2Iiwic2FzLmpvYkV4ZWN1dGlvbiIsInNhcy5sYXVuY2hlciIsInVhYSIsInNhcy5iYWNrdXAtYWdlbnQiLCJzYXMuYXV0aG9yaXphdGlvbiIsInNhcy5jb25uZWN0Iiwic2FzLmF1ZGl0Iiwic2FzLmNvbmZpZ3VyYXRpb24iLCJvcGVuaWQiLCJzYXMuZGV2aWNlTWFuYWdlbWVudCIsInNhcy5yZXBvcnRQYWNrYWdlcyIsInNhcy5jYXNDb250cm9sIiwic2FzLmNyZWRlbnRpYWxzIiwic2FzLmZvbGRlcnMiLCJzYXMuc2NoZWR1bGVyIiwic2FzLndlYmFzc2V0cyIsInNhcy5pZGVudGl0aWVzIiwic2FzLmJhdGNoIl0sImV4dF9pZCI6InVpZD1yb3NyaWMsb3U9dXNlcnMsZGM9c2FzLGRjPWNvbSIsInppZCI6InVhYSIsImdyYW50X3R5cGUiOiJwYXNzd29yZCIsInVzZXJfaWQiOiJjZDYzZDFkOS04MWZhLTRiM2EtYjE1YS04YTM2MTUzNmU2Y2EiLCJhenAiOiJzYXMuY2xpIiwic2NvcGUiOlsic2FzLmF1ZGl0LnVzZXJfaW1wZXJzb25hdGlvbiIsInNhcy5hdXRob3JpemF0aW9uLnVzZXJfaW1wZXJzb25hdGlvbiIsInNhcy5kZXZpY2VNYW5hZ2VtZW50LnVzZXJfaW1wZXJzb25hdGlvbiIsInNhcy5qb2JFeGVjdXRpb24udXNlcl9pbXBlcnNvbmF0aW9uIiwic2FzLmJhdGNoLnVzZXJfaW1wZXJzb25hdGlvbiIsInNhcy53b3JrbG9hZE9yY2hlc3RyYXRvci51c2VyX2ltcGVyc29uYXRpb24iLCJzYXMuZGFnZW50c3J2LnVzZXJfaW1wZXJzb25hdGlvbiIsInNhcy5jb25uZWN0LnVzZXJfaW1wZXJzb25hdGlvbiIsInNhcy5yZXBvcnRQYWNrYWdlcy51c2VyX2ltcGVyc29uYXRpb24iLCJzYXMubGF1bmNoZXIudXNlcl9pbXBlcnNvbmF0aW9uIiwic2FzLmNvbXB1dGUudXNlcl9pbXBlcnNvbmF0aW9uIiwic2FzLmJhY2t1cC1hZ2VudC51c2VyX2ltcGVyc29uYXRpb24iLCJjbGllbnRzLnJlYWQiLCJzYXMuY29uZmlndXJhdGlvbi51c2VyX2ltcGVyc29uYXRpb24iLCJjbGllbnRzLnNlY3JldCIsInNhcy5mb2xkZXJzLnVzZXJfaW1wZXJzb25hdGlvbiIsIm9wZW5pZCIsInVhYS5hZG1pbiIsImNsaWVudHMuYWRtaW4iLCJzYXMuc2NoZWR1bGVyLnVzZXJfaW1wZXJzb25hdGlvbiIsInNhcy50cmFuc2Zlci51c2VyX2ltcGVyc29uYXRpb24iLCJzY2ltLnJlYWQiLCJ1YWEudXNlciIsInNhcy5pZGVudGl0aWVzLnVzZXJfaW1wZXJzb25hdGlvbiIsInNhcy53ZWJhc3NldHMudXNlcl9pbXBlcnNvbmF0aW9uIiwiU0FTQWRtaW5pc3RyYXRvcnMiLCJzYXMuY2FzQ29udHJvbC51c2VyX2ltcGVyc29uYXRpb24iLCJzYXMuY3JlZGVudGlhbHMudXNlcl9pbXBlcnNvbmF0aW9uIiwiY2xpZW50cy53cml0ZSIsInNjaW0ud3JpdGUiXSwiYXV0aF90aW1lIjoxNzI5NjkxMjkyLCJleHAiOjE3Mjk2OTQ4OTIsImlhdCI6MTcyOTY5MTI5MiwianRpIjoiYjMzZmM4YTA4MWFlNDRlMThiMDVmZDIzNmJmODZlOTIiLCJlbWFpbCI6IlJvc3MuUmljaGFyZHNAc2FzLmNvbSIsInJldl9zaWciOiI4NzM3YmY4MSIsImNsaWVudF9hdXRoX21ldGhvZCI6Im5vbmUiLCJjaWQiOiJzYXMuY2xpIn0.rYRXgyALinz_NjheqOCYKZK4i9lpfc5zIpKHud1nvb6TEB5h2hXbmDC6QaL5iAI11IFYCjpM53lSQ3PNG1vhhtKwNsOYuvqg89_ut9S41c9_ZnGEODCxUn04HiBrXe8q8a04c7IBiAhVMhFEz6OGQCQRm2w3QGn0LpvlNwI24dcHzd96nCXMI2qQmdNtVcxBcrqDx11HO9LB3IlkGacEE9MeCuFu-g-_y_4gMKBVcFIdT93ZBryVMES1Mvm8oShKsvITcVMPaVgVB_jlxAJXFynfxFsnkvrJvWFb6gw3BMlWzKpx6idBwn9f56G4VTXjZbAECEUCHWd7pdNdwun49A';

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Allow only numbers, commas, and periods in the income input
    if (name === "income") {
      const regex = /^[0-9,.]*$/; // Regex to allow numbers, commas, and periods
      if (regex.test(value) || value === '') {
        setFormData({ ...formData, [name]: value });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Format JSON payload
  const formatJSONPayload = (formData) => {
    // Remove commas from the income before converting to float
    const incomeValue = parseFloat(formData.income.replace(/,/g, ''));

    return {
      inputs: [
        { name: "fname_", type: "string", dim: "0", size: formData.firstName },
        { name: "lname_", type: "string", dim: "0", size: formData.lastName },
        { name: "job_", type: "string", dim: "0", size: formData.yoj },
        { name: "inc_", type: "decimal", dim: "0", size: incomeValue.toFixed(2) } // Ensuring two decimal places
      ]
    };
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log('Payload being sent:', formatJSONPayload(formData));

      const response = await fetch('https://d79543.lev1-azure-nginx-7504bb02.unx.sas.com/microanalyticScore/modules/auto_loan_test/steps/execute', {
        method: 'POST',
        headers: {
          mode: 'no-cors',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${hardCodedBearerToken}`
        },
        body: JSON.stringify(formatJSONPayload(formData))
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error submitting form: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log('API Response:', data);

      const responseMessageObj = data.outputs.find(output => output.name === 'responseMessage');
      if (responseMessageObj) {
        setResponseMessage(responseMessageObj.value);
      } else {
        setResponseMessage('responseMessage not found');
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
              type="text"
              id="income"
              name="income"
              value={formData.income}
              onChange={handleChange}
              required
              placeholder="Enter income (e.g., 10,000.00)"
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