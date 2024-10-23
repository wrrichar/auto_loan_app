import React, { useState } from 'react';
import './App.css'; // Import the CSS file

const App = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    yoj: '',
    income: ''
  });
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  // Hard-coded Bearer token and client credentials (replace with your actual values)
  const hardCodedToken = "eyJqa3UiOiJodHRwczovL2xvY2FsaG9zdC9TQVNMb2dvbi90b2tlbl9rZXlzIiwia2lkIjoibGVnYWN5LXRva2VuLWtleSIsInR5cCI6IkpXVCIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJjZDYzZDFkOS04MWZhLTRiM2EtYjE1YS04YTM2MTUzNmU2Y2EiLCJ1c2VyX25hbWUiOiJyb3NyaWMiLCJvcmlnaW4iOiJsZGFwIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdC9TQVNMb2dvbi9vYXV0aC90b2tlbiIsImF1dGhvcml0aWVzIjpbIlNBU0FkbWluaXN0cmF0b3JzIiwiRGF0YUFnZW50QWRtaW5pc3RyYXRvcnMiLCJEYXRhQWdlbnRQb3dlclVzZXJzIl0sImNsaWVudF9pZCI6InNhcy5jbGkiLCJhdWQiOlsic2FzLndvcmtsb2FkT3JjaGVzdHJhdG9yIiwic2NpbSIsImNsaWVudHMiLCJzYXMudHJhbnNmZXIiLCJzYXMuY29tcHV0ZSIsInNhcy5jbGkiLCJzYXMuZGFnZW50c3J2Iiwic2FzLmpvYkV4ZWN1dGlvbiIsInNhcy5sYXVuY2hlciIsInVhYSIsInNhcy5iYWNrdXAtYWdlbnQiLCJzYXMuYXV0aG9yaXphdGlvbiIsInNhcy5jb25uZWN0Iiwic2FzLmF1ZGl0Iiwic2FzLmNvbmZpZ3VyYXRpb24iLCJvcGVuaWQiLCJzYXMuZGV2aWNlTWFuYWdlbWVudCIsInNhcy5yZXBvcnRQYWNrYWdlcyIsInNhcy5jYXNDb250cm9sIiwic2FzLmNyZWRlbnRpYWxzIiwic2FzLmZvbGRlcnMiLCJzYXMuc2NoZWR1bGVyIiwic2FzLndlYmFzc2V0cyIsInNhcy5pZGVudGl0aWVzIiwic2FzLmJhdGNoIl0sImV4dF9pZCI6InVpZD1yb3NyaWMsb3U9dXNlcnMsZGM9c2FzLGRjPWNvbSIsInppZCI6InVhYSIsImdyYW50X3R5cGUiOiJwYXNzd29yZCIsInVzZXJfaWQiOiJjZDYzZDFkOS04MWZhLTRiM2EtYjE1YS04YTM2MTUzNmU2Y2EiLCJhenAiOiJzYXMuY2xpIiwic2NvcGUiOlsic2FzLmF1ZGl0LnVzZXJfaW1wZXJzb25hdGlvbiIsInNhcy5hdXRob3JpemF0aW9uLnVzZXJfaW1wZXJzb25hdGlvbiIsInNhcy5kZXZpY2VNYW5hZ2VtZW50LnVzZXJfaW1wZXJzb25hdGlvbiIsInNhcy5qb2JFeGVjdXRpb24udXNlcl9pbXBlcnNvbmF0aW9uIiwic2FzLmJhdGNoLnVzZXJfaW1wZXJzb25hdGlvbiIsInNhcy53b3JrbG9hZE9yY2hlc3RyYXRvci51c2VyX2ltcGVyc29uYXRpb24iLCJzYXMuZGFnZW50c3J2LnVzZXJfaW1wZXJzb25hdGlvbiIsInNhcy5jb25uZWN0LnVzZXJfaW1wZXJzb25hdGlvbiIsInNhcy5yZXBvcnRQYWNrYWdlcy51c2VyX2ltcGVyc29uYXRpb24iLCJzYXMubGF1bmNoZXIudXNlcl9pbXBlcnNvbmF0aW9uIiwic2FzLmNvbXB1dGUudXNlcl9pbXBlcnNvbmF0aW9uIiwic2FzLmJhY2t1cC1hZ2VudC51c2VyX2ltcGVyc29uYXRpb24iLCJjbGllbnRzLnJlYWQiLCJzYXMuY29uZmlndXJhdGlvbi51c2VyX2ltcGVyc29uYXRpb24iLCJjbGllbnRzLnNlY3JldCIsInNhcy5mb2xkZXJzLnVzZXJfaW1wZXJzb25hdGlvbiIsIm9wZW5pZCIsInVhYS5hZG1pbiIsImNsaWVudHMuYWRtaW4iLCJzYXMuc2NoZWR1bGVyLnVzZXJfaW1wZXJzb25hdGlvbiIsInNhcy50cmFuc2Zlci51c2VyX2ltcGVyc29uYXRpb24iLCJzY2ltLnJlYWQiLCJ1YWEudXNlciIsInNhcy5pZGVudGl0aWVzLnVzZXJfaW1wZXJzb25hdGlvbiIsInNhcy53ZWJhc3NldHMudXNlcl9pbXBlcnNvbmF0aW9uIiwiU0FTQWRtaW5pc3RyYXRvcnMiLCJzYXMuY2FzQ29udHJvbC51c2VyX2ltcGVyc29uYXRpb24iLCJzYXMuY3JlZGVudGlhbHMudXNlcl9pbXBlcnNvbmF0aW9uIiwiY2xpZW50cy53cml0ZSIsInNjaW0ud3JpdGUiXSwiYXV0aF90aW1lIjoxNzI5MjU3MDA4LCJleHAiOjE3MjkyNjA2MDgsImlhdCI6MTcyOTI1NzAwOCwianRpIjoiOTU4MWU5OTE4MzgwNGU3NTlhMTVlMjQ1NjFlYmZmZjgiLCJlbWFpbCI6IlJvc3MuUmljaGFyZHNAc2FzLmNvbSIsInJldl9zaWciOiI4NzM3YmY4MSIsImNsaWVudF9hdXRoX21ldGhvZCI6Im5vbmUiLCJjaWQiOiJzYXMuY2xpIn0.0YJ6OTu-OaMcBadiMe3ezeRfrbEz-tlE31RyPK08SFeDKl7wtCjy09-pf2irR4XBiwncBvZ99Z9N1DcWbAsLnsx7qEXASXQzWPVTXJ_6xSlwh_vNpCiQhWWWi2MycYwb1ahBIycCCNkXetqQwCaFRfvFaFDu5usGkBjszEn3BzXGcoq-M-Be-qnvHx2B4svHe9-pY7N9JQseZ2WNibcZlFnMTiT9kEoouBp6UcSWwIqlCpPXVXf4eznCktL6QnFmip5wNCMQwDZJgvROnt2S-mHNtTlpSEVSh7BI2YgnD-Kvm1EGdOTeYpQaAc_ZFUHY9G1yJAfJ9M5pY5829E11Ug";
  const clientId = 'auto_loan_web_app2';
  const clientSecret = 'Orion123';

  // Base64 encode client_id and client_secret
  const base64Credentials = btoa(`${clientId}:${clientSecret}`);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Submit form data to your API endpoint
      const response = await fetch('https://d79543.lev1-azure-nginx-7504bb02.unx.sas.com/microanalyticScore/modules/auto_loan_web_app', {
        //mode: 'no-cors',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${hardCodedToken}`, // Hard-coded Bearer token
          'Authorization': `Basic ${base64Credentials}`, // Base64 encoded client_id:client_secret
        },
        body: JSON.stringify(formData),
      });

      // Log the entire response object to inspect it
      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);

      // Check if the response has content (status 204 is "No Content")
      if (response.status === 204) {
        setResult('No content returned from server.');
        return;
      }

      // Check if the response has a JSON content type
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        // Parse JSON response
        const data = await response.json();
        console.log('Response JSON data:', data);
        setResult(data.message || 'Success');
      } else {
        // If the response is not JSON, handle it accordingly
        const text = await response.text();
        console.log('Response text data:', text);
        setResult(`Received non-JSON response: ${text}`);
      }
    } catch (error) {
      console.error('Error:', error);
      setResult('An error occurred while submitting the form.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <nav className="navbar">
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>
      <div className="header">
        <h1>VR Auto</h1>
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
            <label htmlFor="income">Income:</label>
            <select
              id="income"
              name="income"
              value={formData.income}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            >
              <option value="">Select...</option>
              <option value="Less than 50,000">Less than 50,000</option>
              <option value="50,001-74,999">50,001-74,999</option>
              <option value="75,000-99,999">75,000-99,999</option>
              <option value="100,000-124,999">100,000-124,999</option>
              <option value="125,000-149,999">125,000-149,999</option>
              <option value="150,000+">150,000+</option>
            </select>
          </div>
          <button type="submit" disabled={loading} style={{ width: '100%', padding: '10px', borderRadius: '4px', backgroundColor: '#007bff', color: '#fff', border: 'none', cursor: 'pointer' }}>
            {loading ? 'Loading...' : 'Submit'}
          </button>
        </form>
        {result && <p style={{ marginTop: '20px', textAlign: 'center' }}>{result}</p>}
      </div>
    </div>
  );
};

export default App;