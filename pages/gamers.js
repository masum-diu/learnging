import React, { useState, useEffect } from 'react';
import styles from '../styles/HomeStyles.module.css';

export default function Gamers() {
  const [gamers, setGamers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('points');
  const [newGamer, setNewGamer] = useState({ name: '', username: '', games: '' });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchGamers();
  }, [sortBy]);

  const fetchGamers = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/gamers?sortBy=${sortBy}`);
      const result = await response.json();
      if (result.success) {
        setGamers(result.data);
      }
    } catch (error) {
      console.error('Error fetching gamers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddGamer = async (e) => {
    e.preventDefault();
    if (!newGamer.name || !newGamer.username) {
      alert('Please fill in all fields');
      return;
    }

    try {
      const response = await fetch('/api/gamers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newGamer.name,
          username: newGamer.username,
          games: newGamer.games ? newGamer.games.split(',').map(g => g.trim()) : []
        })
      });

      const result = await response.json();
      if (result.success) {
        setNewGamer({ name: '', username: '', games: '' });
        setShowForm(false);
        fetchGamers();
      }
    } catch (error) {
      console.error('Error adding gamer:', error);
    }
  };

  const handleDeleteGamer = async (id) => {
    if (confirm('Are you sure you want to delete this gamer?')) {
      try {
        const response = await fetch(`/api/gamers?id=${id}`, { method: 'DELETE' });
        const result = await response.json();
        if (result.success) {
          fetchGamers();
        }
      } catch (error) {
        console.error('Error deleting gamer:', error);
      }
    }
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <nav className={styles.navbar}>
        <div className={styles.navContent}>
          <div className={styles.logo}>
            <span className={styles.logoIcon}>🎮</span>
            <h1>Gamer League</h1>
          </div>
          <div className={styles.navLinks}>
            <a href="/" className={styles.navLink}>Home</a>
            <a href="#gamers" className={styles.navLink}>Leaderboard</a>
            <a href="#" className={styles.btnSignup} onClick={() => setShowForm(!showForm)}>
              + Add Gamer
            </a>
          </div>
        </div>
      </nav>

      {/* Add Gamer Form */}
      {showForm && (
        <section style={{ background: '#f8f9fa', padding: '2rem', textAlign: 'center' }}>
          <h2>Add New Gamer</h2>
          <form onSubmit={handleAddGamer} style={{ maxWidth: '500px', margin: '0 auto', textAlign: 'left' }}>
            <div style={{ marginBottom: '1rem' }}>
              <input
                type="text"
                placeholder="Full Name"
                value={newGamer.name}
                onChange={(e) => setNewGamer({ ...newGamer, name: e.target.value })}
                style={{
                  width: '100%',
                  padding: '0.8rem',
                  border: '2px solid #ddd',
                  borderRadius: '8px',
                  fontFamily: 'Poppins',
                  fontSize: '1rem'
                }}
              />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <input
                type="text"
                placeholder="Username"
                value={newGamer.username}
                onChange={(e) => setNewGamer({ ...newGamer, username: e.target.value })}
                style={{
                  width: '100%',
                  padding: '0.8rem',
                  border: '2px solid #ddd',
                  borderRadius: '8px',
                  fontFamily: 'Poppins',
                  fontSize: '1rem'
                }}
              />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <input
                type="text"
                placeholder="Games (comma-separated)"
                value={newGamer.games}
                onChange={(e) => setNewGamer({ ...newGamer, games: e.target.value })}
                style={{
                  width: '100%',
                  padding: '0.8rem',
                  border: '2px solid #ddd',
                  borderRadius: '8px',
                  fontFamily: 'Poppins',
                  fontSize: '1rem'
                }}
              />
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button
                type="submit"
                style={{
                  flex: 1,
                  background: 'linear-gradient(135deg, #667eea, #764ba2)',
                  color: 'white',
                  padding: '0.8rem',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontFamily: 'Poppins'
                }}
              >
                Add Gamer
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                style={{
                  flex: 1,
                  background: '#ddd',
                  color: '#333',
                  padding: '0.8rem',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontFamily: 'Poppins'
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </section>
      )}

      {/* Leaderboard */}
      <section id="gamers" style={{ maxWidth: '1200px', margin: '3rem auto', padding: '0 2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div>
            <h2 style={{ fontSize: '2rem', color: '#333', margin: 0 }}>🏆 Gamer Leaderboard</h2>
            <p style={{ color: '#666', margin: '0.5rem 0 0 0' }}>Top gamers in the community</p>
          </div>
          <div>
            <label style={{ marginRight: '1rem', fontWeight: '600' }}>Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                padding: '0.6rem 1rem',
                border: '2px solid #667eea',
                borderRadius: '8px',
                cursor: 'pointer',
                fontFamily: 'Poppins',
                fontWeight: '600'
              }}
            >
              <option value="points">Points</option>
              <option value="level">Level</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '2rem' }}>Loading gamers...</div>
        ) : (
          <div style={{ display: 'grid', gap: '1.5rem' }}>
            {gamers.map((gamer, index) => (
              <div
                key={gamer.id}
                style={{
                  background: index < 3 ? `linear-gradient(135deg, ${['#ffd700', '#c0c0c0', '#cd7f32'][index]}40, transparent)` : 'white',
                  padding: '1.5rem',
                  borderRadius: '12px',
                  display: 'grid',
                  gridTemplateColumns: 'auto 1fr auto',
                  gap: '1.5rem',
                  alignItems: 'center',
                  border: '1px solid #eee',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                }}
              >
                {/* Rank */}
                <div style={{ textAlign: 'center', minWidth: '50px' }}>
                  <div style={{ fontSize: '1.8rem', fontWeight: '800' }}>
                    {index < 3 ? ['🥇', '🥈', '🥉'][index] : `#${index + 1}`}
                  </div>
                </div>

                {/* Gamer Info */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '2rem' }}>{gamer.avatar}</span>
                    <div>
                      <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '700', color: '#333' }}>
                        {gamer.name}
                      </h3>
                      <p style={{ margin: '0.3rem 0 0 0', color: '#667eea', fontWeight: '600', fontSize: '0.9rem' }}>
                        @{gamer.username}
                      </p>
                    </div>
                  </div>
                  <div style={{ marginTop: '0.8rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    {gamer.badges.map((badge, i) => (
                      <span
                        key={i}
                        style={{
                          background: '#f0f0ff',
                          color: '#667eea',
                          padding: '0.3rem 0.8rem',
                          borderRadius: '20px',
                          fontSize: '0.8rem',
                          fontWeight: '600'
                        }}
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                  <div style={{ marginTop: '0.8rem', fontSize: '0.9rem', color: '#666' }}>
                    Games: {gamer.games.join(', ') || 'None'}
                  </div>
                </div>

                {/* Stats & Actions */}
                <div style={{ textAlign: 'right', minWidth: '150px' }}>
                  <div style={{ marginBottom: '1rem' }}>
                    <div style={{ fontSize: '2rem', fontWeight: '800', color: '#667eea' }}>
                      {gamer.level}
                    </div>
                    <p style={{ margin: '0.2rem 0 0 0', color: '#999', fontSize: '0.85rem' }}>Level</p>
                  </div>
                  <div style={{ marginBottom: '1rem' }}>
                    <div style={{ fontSize: '1.3rem', fontWeight: '700', color: '#764ba2' }}>
                      {gamer.points.toLocaleString()}
                    </div>
                    <p style={{ margin: '0.2rem 0 0 0', color: '#999', fontSize: '0.85rem' }}>Points</p>
                  </div>
                  <button
                    onClick={() => handleDeleteGamer(gamer.id)}
                    style={{
                      background: '#ff6b6b',
                      color: 'white',
                      border: 'none',
                      padding: '0.5rem 1rem',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '0.85rem',
                      fontWeight: '600',
                      fontFamily: 'Poppins'
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerSection}>
            <h4>About</h4>
            <ul>
              <li><a href="#about">About Us</a></li>
              <li><a href="#tournaments">Tournaments</a></li>
              <li><a href="#community">Community</a></li>
            </ul>
          </div>
          <div className={styles.footerSection}>
            <h4>Games</h4>
            <ul>
              <li><a href="#valorant">Valorant</a></li>
              <li><a href="#csgo">CS:GO</a></li>
              <li><a href="#fortnite">Fortnite</a></li>
            </ul>
          </div>
          <div className={styles.footerSection}>
            <h4>Support</h4>
            <ul>
              <li><a href="#help">Help Center</a></li>
              <li><a href="#contact">Contact</a></li>
              <li><a href="#faq">FAQ</a></li>
            </ul>
          </div>
          <div className={styles.footerSection}>
            <h4>Legal</h4>
            <ul>
              <li><a href="#privacy">Privacy</a></li>
              <li><a href="#terms">Terms</a></li>
            </ul>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <p>&copy; 2024 Gamer League. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
