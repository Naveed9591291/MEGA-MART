'use client';

import React, { useState } from 'react';
import { ShoppingCart, Bot, Sparkles, Plus, Trash2 } from 'lucide-react';

const PRODUCTS = [
  { id: 1, name: 'سوبرائٹی چاول (Basmati Rice 5kg)', price: 1850, category: 'Staples' },
  { id: 2, name: 'کپاس کا تیل (Cooking Oil 3L)', price: 1520, category: 'Staples' },
  { id: 3, name: 'تازہ دودھ (Fresh Milk 1L)', price: 210, category: 'Dairy' },
  { id: 4, name: 'چکن (Chicken Fresh 1kg)', price: 620, category: 'Meat' },
  { id: 5, name: 'آلو (Potatoes 2kg)', price: 180, category: 'Vegetables' },
];

export default function MegaMartHome() {
  const [cart, setCart] = useState([]);
  const [budget, setBudget] = useState('');
  const [familySize, setFamilySize] = useState('4');
  const [notes, setNotes] = useState('');
  const [aiPlan, setAiPlan] = useState('');
  const [loading, setLoading] = useState(false);

  // Cart operations
  const addToCart = (product) => setCart([...cart, product]);
  const removeFromCart = (index) => setCart(cart.filter((_, i) => i !== index));
  const totalCartCost = cart.reduce((sum, item) => sum + item.price, 0);

  // AI Assistant Call
  const handleGenerateAIPlan = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAiPlan('');

    try {
      const res = await fetch('/api/ai-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          budget,
          familySize,
          dietaryPreference: notes,
        }),
      });

      const data = await res.json();
      if (data.plan) {
        setAiPlan(data.plan);
      } else {
        alert(data.error || 'کچھ غلط ہو گیا');
      }
    } catch (err) {
      alert('نیٹ ورک کا مسئلہ ہے۔');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ fontFamily: 'sans-serif', backgroundColor: '#f8fafc', minHeight: '100vh', padding: '20px' }}>
      {/* Header */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#1e293b', color: 'white', padding: '15px 30px', borderRadius: '10px' }}>
        <h1 style={{ margin: 0, fontSize: '24px' }}>🛒 MegaMart Store</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ShoppingCart size={24} />
          <span><b>{cart.length}</b> آئٹمز | <b>PKR {totalCartCost}</b></span>
        </div>
      </header>

      <main style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px', marginTop: '20px' }}>
        
        {/* Left Side: Product List & AI Smart List */}
        <div>
          {/* AI Feature Box */}
          <section style={{ backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '10px', padding: '20px', marginBottom: '20px' }}>
            <h2 style={{ color: '#1e40af', display: 'flex', alignItems: 'center', gap: '10px', marginTop: 0 }}>
              <Bot size={28} /> AI Smart Grocery Planner
            </h2>
            <p style={{ color: '#3b82f6' }}>اپنا بجٹ بتائیں اور AI سے اپنی ہفتہ وار گروسری لسٹ خودکار تیار کروائیں۔</p>

            <form onSubmit={handleGenerateAIPlan} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto', gap: '10px', marginTop: '15px' }}>
              <input
                type="number"
                placeholder="ہفتہ وار بجٹ (PKR)"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                required
                style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
              />
              <input
                type="number"
                placeholder="گھر کے افراد"
                value={familySize}
                onChange={(e) => setFamilySize(e.target.value)}
                required
                style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
              />
              <input
                type="text"
                placeholder="خصوصی ہدایت (مثلاً دالیں زیادہ)"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
              />
              <button
                type="submit"
                disabled={loading}
                style={{ backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '5px', padding: '10px 20px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}
              >
                <Sparkles size={16} /> {loading ? 'بن رہا ہے...' : 'لسٹ بنائیں'}
              </button>
            </form>

            {aiPlan && (
              <div style={{ marginTop: '20px', backgroundColor: 'white', padding: '15px', borderRadius: '5px', whiteSpace: 'pre-wrap', borderLeft: '4px solid #2563eb' }}>
                <h3>AI Grocery Recommendation:</h3>
                {aiPlan}
              </div>
            )}
          </section>

          {/* Catalog Products */}
          <section style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px' }}>
            <h2>گروسری پراڈکٹس (Store Catalog)</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '15px', marginTop: '15px' }}>
              {PRODUCTS.map((prod) => (
                <div key={prod.id} style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '15px', textAlign: 'center' }}>
                  <h4 style={{ margin: '0 0 10px 0' }}>{prod.name}</h4>
                  <p style={{ color: '#16a34a', fontWeight: 'bold' }}>PKR {prod.price}</p>
                  <button
                    onClick={() => addToCart(prod)}
                    style={{ backgroundColor: '#059669', color: 'white', border: 'none', borderRadius: '5px', padding: '6px 12px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '5px' }}
                  >
                    <Plus size={16} /> Add to Cart
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Side: Checkout / Cart Summary */}
        <aside style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', height: 'fit-content' }}>
          <h2 style={{ marginTop: 0 }}>آپ کی ٹوکری (Cart)</h2>
          {cart.length === 0 ? (
            <p style={{ color: '#64748b' }}>کارٹ بالکل خالی ہے۔</p>
          ) : (
            <div>
              {cart.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f1f5f9', padding: '8px 0' }}>
                  <span>{item.name}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span>PKR {item.price}</span>
                    <button onClick={() => removeFromCart(idx)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
              <hr style={{ margin: '15px 0' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: 'bold' }}>
                <span>کل رقم:</span>
                <span>PKR {totalCartCost}</span>
              </div>
              <button
                onClick={() => alert('Order Placed Successfully!')}
                style={{ width: '100%', marginTop: '15px', backgroundColor: '#16a34a', color: 'white', padding: '10px', border: 'none', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer' }}
              >
                آرڈر مکمل کریں (Checkout)
              </button>
            </div>
          )}
        </aside>

      </main>
    </div>
  );
}
