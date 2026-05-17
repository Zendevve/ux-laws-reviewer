import React from 'react';

// A poorly designed login form for UX evaluation testing
export default function BadLogin() {
  return (
    <div style={{ margin: '0 auto', width: '800px', display: 'flex', flexDirection: 'column' }}>
      <h1>Sign In To Your Account Now Please</h1>
      
      {/* Violates Law of Proximity (distant label), WCAG 1.4.3 (poor contrast), missing programmatic label */}
      <span style={{ color: '#b0b0b0', marginBottom: '40px' }}>User email:</span>
      <input type="text" placeholder="user@example.com" style={{ border: 'none', borderBottom: '1px solid #ccc' }} />
      
      <span style={{ color: '#b0b0b0', marginTop: '50px', marginBottom: '40px' }}>Pass:</span>
      <input type="password" style={{ border: 'none', borderBottom: '1px solid #ccc' }} />
      
      {/* Violates Fitts's Law (tiny target), Hick's law/Visual Hierarchy (equal weight to secondary actions) */}
      <div style={{ marginTop: '50px', display: 'flex', gap: '50px' }}>
        <button style={{ padding: '2px 4px', fontSize: '10px' }}>Submit</button>
        <button style={{ padding: '2px 4px', fontSize: '10px' }}>Forgot Password</button>
        <button style={{ padding: '2px 4px', fontSize: '10px' }}>Register</button>
        <button style={{ padding: '2px 4px', fontSize: '10px' }}>Help</button>
      </div>
    </div>
  );
}
