import React from 'react';

// Mobile checkout with intentional UX issues for eval testing
// Tests platform-aware scoring (mobile thresholds differ from desktop)
export default function MobileCheckout({ items, total }) {
  return (
    <div style={{ padding: '8px', maxWidth: '100vw' }}>
      <h1 style={{ fontSize: '14px', color: '#888' }}>Checkout</h1>

      {/* Cart summary — no item details visible, only total */}
      <div style={{ marginBottom: '16px', fontSize: '13px' }}>
        <span>{items.length} items</span>
        <span style={{ float: 'right', fontWeight: 'bold' }}>${total}</span>
      </div>

      {/* Shipping form — placeholder-only labels, no autocomplete */}
      <input placeholder="Full name" style={{ width: '100%', padding: '6px', marginBottom: '4px', fontSize: '14px', border: '1px solid #ddd' }} />
      <input placeholder="Address" style={{ width: '100%', padding: '6px', marginBottom: '4px', fontSize: '14px', border: '1px solid #ddd' }} />
      <div style={{ display: 'flex', gap: '4px', marginBottom: '4px' }}>
        <input placeholder="City" style={{ flex: 2, padding: '6px', fontSize: '14px', border: '1px solid #ddd' }} />
        <input placeholder="ZIP" style={{ flex: 1, padding: '6px', fontSize: '14px', border: '1px solid #ddd' }} />
      </div>
      <input placeholder="Phone" style={{ width: '100%', padding: '6px', marginBottom: '16px', fontSize: '14px', border: '1px solid #ddd' }} />

      {/* Payment — credit card fields inline, tiny targets */}
      <div style={{ padding: '12px', background: '#f9f9f9', borderRadius: '4px', marginBottom: '16px' }}>
        <div style={{ fontSize: '11px', color: '#aaa', marginBottom: '8px' }}>PAYMENT</div>
        <input placeholder="Card number" style={{ width: '100%', padding: '6px', marginBottom: '4px', fontSize: '14px', border: '1px solid #ddd' }} />
        <div style={{ display: 'flex', gap: '4px' }}>
          <input placeholder="MM/YY" style={{ flex: 1, padding: '6px', fontSize: '14px', border: '1px solid #ddd' }} />
          <input placeholder="CVC" style={{ flex: 1, padding: '6px', fontSize: '14px', border: '1px solid #ddd' }} />
        </div>
      </div>

      {/* Promo code — appears before payment confirmation (bad flow) */}
      <div style={{ marginBottom: '16px' }}>
        <input placeholder="Promo code" style={{ width: '70%', padding: '6px', fontSize: '14px', border: '1px solid #ddd' }} />
        <button style={{ padding: '6px 8px', fontSize: '12px', marginLeft: '4px', border: '1px solid #ddd', background: '#fff' }}>
          Apply
        </button>
      </div>

      {/* Terms checkbox — tiny target */}
      <label style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '10px', color: '#999', marginBottom: '16px' }}>
        <input type="checkbox" />
        I agree to terms and conditions and privacy policy
      </label>

      {/* Submit — reasonable size but no loading state */}
      <button style={{
        width: '100%',
        padding: '14px',
        fontSize: '16px',
        fontWeight: 'bold',
        background: '#222',
        color: '#fff',
        border: 'none',
        borderRadius: '6px'
      }}>
        Pay ${total}
      </button>

      {/* No error states, no progress indicator, no order summary review */}
    </div>
  );
}
