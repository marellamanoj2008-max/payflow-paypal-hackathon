import { useState } from "react";

type Transaction = {
  id: string;
  title: string;
  date: string;
  status: "Processing" | "AI Verified" | "Success";
  amount: string;
  positive?: boolean;
  icon: string;
  tone: string;
  fee?: string;
  hash?: string;
  gateway?: string;
};

const navItems = [
  { label: "Dashboard", icon: "🏠" },
  { label: "Transactions", icon: "⇄" },
  { label: "Wallet", icon: "👛" },
  { label: "AI Assistant", icon: "✨" },
  { label: "Deals & Rewards", icon: "🎁" },
  { label: "Settings", icon: "⚙️" },
  { label: "Help & Support", icon: "🎧" },
];

export default function App() {
  const [activeNav, setActiveNav] = useState("Dashboard");
  const [message, setMessage] = useState("");
  const [activeTab, setActiveTab] = useState("AI Assistant");
  const [walletBalance, setWalletBalance] = useState(1250.00);
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);
  
  const [chatMessages, setChatMessages] = useState([
    { 
      from: "bot", 
      text: "PayFlow Autonomous Intelligence Active.\nReady to process payments, evaluate compliance rules, and execute PayPal Sandbox flows.", 
      time: "10:24 AM",
      proof: null
    },
    { 
      from: "user", 
      text: "Execute payment verification for invoice #9921", 
      time: "10:24 AM",
      proof: null
    },
    { 
      from: "bot", 
      text: "✓ AI Risk Assessment: Passed (0.01% fraud probability). Smart contract verified. Ready for checkout authorization.", 
      time: "10:25 AM",
      proof: { device: "Match (iOS-Secure)", velocity: "Normal (1.2x)", geo: "Verified (Virudhunagar, IN)", model: "PayPal-RiskNet-v4" }
    },
  ]);

  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: "1", title: "PayPal Payment", date: "Oct 30, 2026 · 10:15 AM", status: "Processing", amount: "-$75.00", icon: "💳", tone: "blue", fee: "$0.30", hash: "0x89f...b21a", gateway: "PayPal Sandbox API" },
    { id: "2", title: "AI Verified Transfer", date: "Oct 30, 2026 · 09:42 AM", status: "AI Verified", amount: "+$200.00", positive: true, icon: "🛡️", tone: "green", fee: "$0.00", hash: "0x44c...99ef", gateway: "Direct Settlement" },
    { id: "3", title: "Online Purchase", date: "Oct 29, 2026 · 08:20 PM", status: "Success", amount: "-$49.99", icon: "👛", tone: "purple", fee: "$0.20", hash: "0x112...88aa", gateway: "PayPal Express Checkout" },
  ]);

  const [showNotifications, setShowNotifications] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const sendMessage = () => {
    const trimmed = message.trim();
    if (!trimmed) return;
    const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    
    setChatMessages((current) => [
      ...current,
      { from: "user", text: trimmed, time: now, proof: null },
      { from: "bot", text: `⚡ Analyzing instruction: "${trimmed}" via AI payment model...`, time: now, proof: null },
    ]);
    setMessage("");

    setTimeout(() => {
      setChatMessages((current) => [
        ...current,
        { 
          from: "bot", 
          text: `✓ Verified and executed successfully through PayPal Sandbox gateway.`, 
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          proof: { device: "Match (Secure Node)", velocity: "Optimal", geo: "Verified (Sandbox API)", model: "PayPal-RiskNet-v4" }
        },
      ]);
    }, 1200);
  };

  const handleQuickAction = (action: string) => {
    const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    if (action === "Top Up Wallet") {
      setWalletBalance(prev => prev + 100.00);
      const newTx: Transaction = {
        id: Date.now().toString(),
        title: "PayPal Sandbox Top-Up",
        date: `Nov 08, 2026 · ${now}`,
        status: "Success",
        amount: "+$100.00",
        positive: true,
        icon: "💳",
        tone: "green",
        fee: "$0.00",
        hash: "0x" + Math.random().toString(16).substring(2, 10),
        gateway: "PayPal Sandbox API"
      };
      setTransactions(prev => [newTx, ...prev]);
      setChatMessages(prev => [...prev, 
        { from: "user", text: "Top Up Wallet (+$100.00)", time: now, proof: null },
        { from: "bot", text: "✓ PayPal Sandbox payment verified. $100.00 credited to treasury.", time: now, proof: { device: "Token Authenticated", velocity: "Normal", geo: "Secured", model: "OAuth2.0" } }
      ]);
    } else if (action === "Send Money") {
      setWalletBalance(prev => prev - 50.00);
      const newTx: Transaction = {
        id: Date.now().toString(),
        title: "Autonomous P2P Transfer",
        date: `Nov 08, 2026 · ${now}`,
        status: "Processing",
        amount: "-$50.00",
        icon: "📤",
        tone: "blue",
        fee: "$0.15",
        hash: "0x" + Math.random().toString(16).substring(2, 10),
        gateway: "PayPal P2P Node"
      };
      setTransactions(prev => [newTx, ...prev]);
      setChatMessages(prev => [...prev, 
        { from: "user", text: "Send Funds (-$50.00)", time: now, proof: null },
        { from: "bot", text: "🛡️ AI Firewall auditing recipient endpoint... Transaction queued for settlement.", time: now, proof: null }
      ]);

      setTimeout(() => {
        setTransactions(curr => curr.map(t => t.id === newTx.id ? { ...t, status: "AI Verified" } : t));
      }, 2000);
      setTimeout(() => {
        setTransactions(curr => curr.map(t => t.id === newTx.id ? { ...t, status: "Success" } : t));
      }, 4000);
    } else {
      setChatMessages(prev => [...prev, 
        { from: "user", text: action, time: now, proof: null },
        { from: "bot", text: `Autonomous Protocol Status: [${action}] is fully operational and cryptographically secured.`, time: now, proof: null }
      ]);
    }
  };

  return (
    <div className="pf-app">
      <style>{styles}</style>

      {/* Sidebar */}
      <aside className={`sidebar ${mobileMenuOpen ? "sidebar-open" : ""}`}>
        <div className="brand">
          <div className="brand-mark">P</div>
          <div className="brand-name">PayFlow</div>
          <div className="brand-tagline">Autonomous Payment Intelligence</div>
          <button className="mobile-close" onClick={() => setMobileMenuOpen(false)}>✕</button>
        </div>

        <nav className="nav-list">
          {navItems.map(({ label, icon }) => (
            <button
              key={label}
              className={`nav-item ${activeNav === label ? "active" : ""}`}
              onClick={() => { setActiveNav(label); setMobileMenuOpen(false); }}
            >
              <span>{icon}</span>
              <span>{label}</span>
            </button>
          ))}
        </nav>

        {/* Enterprise Node Card */}
        <div className="premium-card">
          <div className="premium-crown">👑</div>
          <div className="premium-title">Enterprise Node</div>
          <div className="premium-subtitle">Zero-latency routing & AI firewalls.</div>
          <button className="premium-btn" onClick={() => alert("Enterprise Node active in Sandbox mode.")}>
            Manage Tier →
          </button>
        </div>

        <div className="sidebar-footer">
          <span>🔒 Cryptographic Guard</span>
        </div>
      </aside>

      {mobileMenuOpen && <button className="mobile-scrim" onClick={() => setMobileMenuOpen(false)} />}

      {/* Main Content Area */}
      <main className="main-area">
        <header className="topbar">
          <button className="mobile-menu" onClick={() => setMobileMenuOpen(true)}>☰</button>
          <div className="search-box">
            <span>🔍</span>
            <input placeholder="Search ledger, smart contracts, or execute CLI commands..." />
            <kbd>Ctrl + K</kbd>
          </div>
          <div className="topbar-actions">
            <div className="notification-wrap">
              <button className="icon-button notification-button" onClick={() => setShowNotifications(!showNotifications)}>
                🔔<span className="notification-count">2</span>
              </button>
              {showNotifications && (
                <div className="notification-popover">
                  <strong>System Security Logs</strong>
                  <p>Firewall block rate: 100%.</p>
                  <p>Sandbox sync completed.</p>
                </div>
              )}
            </div>
            <div className="profile-container">
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=96&h=96&fit=crop&crop=faces" alt="Manoj Sharma" />
              <span>Manoj Sharma</span>
              <span>▼</span>
            </div>
          </div>
        </header>

        {/* DYNAMIC VIEW ROUTING */}
        {activeNav === "Dashboard" && (
          <div className="dashboard-grid">
            {/* Left Column: Intelligence Terminal */}
            <section className="assistant-card panel">
              <div className="assistant-tabs-header">
                <button className={`ass-tab ${activeTab === "AI Assistant" ? "active" : ""}`} onClick={() => setActiveTab("AI Assistant")}>
                  ✨ Autonomous AI Agent
                </button>
                <button className={`ass-tab ${activeTab === "Quick Actions" ? "active" : ""}`} onClick={() => setActiveTab("Quick Actions")}>
                  🛡️ Security Rules
                </button>
                <button className={`ass-tab ${activeTab === "Help" ? "active" : ""}`} onClick={() => setActiveTab("Help")}>
                  ⚙️ API Status
                </button>
                <span className="online-badge">● PayPal Sandbox Live</span>
              </div>

              <div className="chat-area">
                {chatMessages.map((item, index) => (
                  <div className={`chat-row ${item.from === "user" ? "user-row" : "bot-row"}`} key={index}>
                    {item.from === "bot" && <div className="small-bot-avatar">✨</div>}
                    <div className={`chat-bubble ${item.from === "user" ? "user-bubble" : "bot-bubble"}`}>
                      <p style={{ whiteSpace: "pre-line" }}>{item.text}</p>
                      
                      {item.proof && (
                        <div className="ai-proof-box">
                          <div className="proof-title">📊 RiskNet AI Evaluation Matrix</div>
                          <div className="proof-grid">
                            <span>Device ID: <strong>{item.proof.device}</strong></span>
                            <span>Velocity: <strong>{item.proof.velocity}</strong></span>
                            <span>Geo-IP: <strong>{item.proof.geo}</strong></span>
                            <span>Model: <strong>{item.proof.model}</strong></span>
                          </div>
                        </div>
                      )}

                      <div className="message-time">
                        {item.time}
                        {item.from === "user" && <span className="read-check">✓✓</span>}
                      </div>
                    </div>
                    {item.from === "user" && (
                      <img className="user-chat-avatar" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=96&h=96&fit=crop&crop=faces" alt="" />
                    )}
                  </div>
                ))}
              </div>

              <div className="quick-actions">
                <div className="quick-title">Autonomous Workflows</div>
                <div className="quick-buttons">
                  <button onClick={() => handleQuickAction("Query Balance")}>⚖️ Query Balance</button>
                  <button onClick={() => handleQuickAction("Trace Transaction")}>🔄 Trace Transaction</button>
                  <button onClick={() => handleQuickAction("Export Ledger")}>📋 Export Ledger</button>
                  <button onClick={() => handleQuickAction("Firewall Check")}>🛡️ AI Risk Audit</button>
                </div>
              </div>

              <form className="message-composer" onSubmit={(e) => { e.preventDefault(); sendMessage(); }}>
                <button type="button" className="attach-button">✨</button>
                <input value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Ask AI to evaluate payment security or execute transfer..." />
                <button className="send-button" type="submit">➤</button>
              </form>
            </section>

            {/* Right Column: Wallet, Transactions & Actions */}
            <div className="right-column">
              <section className="wallet-card">
                <div className="wallet-glow" />
                <div className="wallet-topline">
                  <div className="wallet-icon">👛</div>
                  <span>Secure Treasury Node &gt;</span>
                  <div className="paypal-symbol">P</div>
                </div>
                <div className="wallet-balance">${walletBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
                <div className="wallet-change">↑ <strong>+12.5%</strong> <span>vs last settlement</span></div>
                <button className="paypal-button-high-contrast" onClick={() => handleQuickAction("Top Up Wallet")}>
                  <span className="paypal-mini">P</span> Execute PayPal Sandbox Transfer →
                </button>
                <div className="wallet-shine" />
              </section>

              <section className="transactions-card panel">
                <div className="section-heading">
                  <div className="section-title">⏱️ Immutable Transaction Log (Click to Inspect)</div>
                  <button className="view-all" onClick={() => setActiveNav("Transactions")}>Full Ledger →</button>
                </div>
                <div className="transaction-list">
                  {transactions.map((tx) => (
                    <div className="transaction-row clickable-row" key={tx.id} onClick={() => setSelectedTx(tx)}>
                      <div className={`transaction-icon ${tx.tone}`}>{tx.icon}</div>
                      <div className="transaction-info">
                        <div className="transaction-name">{tx.title}</div>
                        <div className="transaction-date">{tx.date}</div>
                      </div>
                      <span className={`transaction-status ${tx.status.toLowerCase().replace(" ", "-")}`}>
                        {tx.status}
                      </span>
                      <div className={`transaction-amount ${tx.positive ? "positive" : ""}`}>{tx.amount}</div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="quick-grid-card panel">
                <div className="section-heading" style={{ marginBottom: '10px' }}>
                  <div className="section-title">⚡ Gateway Operations</div>
                  <button className="view-all" onClick={() => setActiveNav("Transactions")}>All Nodes →</button>
                </div>
                <div className="actions-grid">
                  <button className="grid-action-item" onClick={() => handleQuickAction("Send Money")}>
                    <span className="grid-icon">📤</span>
                    <span>Send Funds</span>
                  </button>
                  <button className="grid-action-item" onClick={() => handleQuickAction("Top Up Wallet")}>
                    <span className="grid-icon">📥</span>
                    <span>Top Up</span>
                  </button>
                  <button className="grid-action-item" onClick={() => handleQuickAction("Trace Transaction")}>
                    <span className="grid-icon">🔄</span>
                    <span>Trace</span>
                  </button>
                  <button className="grid-action-item" onClick={() => handleQuickAction("Add Card")}>
                    <span className="grid-icon">➕</span>
                    <span>Tokenize</span>
                  </button>
                </div>
              </section>

              <section className="security-note">
                <div className="security-icon">🛡️</div>
                <div className="sec-text">
                  <strong>Zero-Trust Architecture Active.</strong>
                  <span>AES-256 Bit Encryption · Sandbox Verified</span>
                </div>
                <span className="sec-link">Inspect Node →</span>
              </section>
            </div>
          </div>
        )}

        {/* DEDICATED TRANSACTIONS VIEW */}
        {activeNav === "Transactions" && (
          <div className="full-view-panel panel">
            <div className="section-heading">
              <div>
                <h2>Full Immutable Transaction Ledger</h2>
                <p style={{ color: '#8da2cb', fontSize: '12px', margin: '4px 0 0' }}>All real-time cryptographic audit logs synchronized with PayPal Sandbox.</p>
              </div>
              <button className="paypal-button-high-contrast" style={{ width: 'auto', padding: '0 20px', position: 'static' }} onClick={() => handleQuickAction("Top Up Wallet")}>
                + New Sandbox Transfer
              </button>
            </div>
            <div className="transaction-list" style={{ marginTop: '20px' }}>
              {transactions.map((tx) => (
                <div className="transaction-row clickable-row" key={tx.id} onClick={() => setSelectedTx(tx)} style={{ padding: '12px', background: '#0a132b', borderRadius: '12px', border: '1px solid rgba(111,143,204,0.1)' }}>
                  <div className={`transaction-icon ${tx.tone}`}>{tx.icon}</div>
                  <div className="transaction-info">
                    <div className="transaction-name" style={{ fontSize: '13px' }}>{tx.title}</div>
                    <div className="transaction-date">{tx.date} · Hash: {tx.hash || '0x49f8'}</div>
                  </div>
                  <span className={`transaction-status ${tx.status.toLowerCase().replace(" ", "-")}`}>
                    {tx.status}
                  </span>
                  <div className={`transaction-amount ${tx.positive ? "positive" : ""}`} style={{ fontSize: '13px' }}>{tx.amount}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* DEDICATED WALLET VIEW */}
        {activeNav === "Wallet" && (
          <div className="full-view-panel panel" style={{ textAlign: 'center', padding: '40px' }}>
            <h2>Secure Treasury Node & Wallet</h2>
            <p style={{ color: '#8da2cb' }}>Available Balance across active PayPal Sandbox nodes</p>
            <div style={{ fontSize: '56px', fontWeight: '800', color: '#fff', margin: '20px 0' }}>
              ${walletBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
            <button className="paypal-button-high-contrast" style={{ width: '250px', margin: '0 auto', position: 'static' }} onClick={() => handleQuickAction("Top Up Wallet")}>
              Execute PayPal Transfer →
            </button>
          </div>
        )}

        {/* DEDICATED DEFAULT VIEW FOR OTHER TABS */}
        {["AI Assistant", "Deals & Rewards", "Settings", "Help & Support"].includes(activeNav) && (
          <div className="full-view-panel panel" style={{ padding: '30px' }}>
            <h2>{activeNav} Portal</h2>
            <p style={{ color: '#8da2cb' }}>Configuring secure decentralized protocol parameters for {activeNav.toLowerCase()}...</p>
            <div style={{ marginTop: '20px', padding: '20px', background: '#081026', borderRadius: '12px', border: '1px solid rgba(111,143,204,0.15)' }}>
              <p style={{ color: '#35d9a4', fontWeight: '600' }}>✓ Node connection stable · SSL Handshake Verified</p>
            </div>
          </div>
        )}

        {/* Transaction Detail Modal */}
        {selectedTx && (
          <div className="modal-backdrop" onClick={() => setSelectedTx(null)}>
            <div className="modal-content panel" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h3>🔍 Transaction Audit Details</h3>
                <button className="modal-close" onClick={() => setSelectedTx(null)}>✕</button>
              </div>
              <div className="modal-body">
                <p><strong>Title:</strong> {selectedTx.title}</p>
                <p><strong>Amount:</strong> <span style={{ color: selectedTx.positive ? '#35d9a4' : '#fff' }}>{selectedTx.amount}</span></p>
                <p><strong>Status:</strong> <span className={`transaction-status ${selectedTx.status.toLowerCase().replace(" ", "-")}`}>{selectedTx.status}</span></p>
                <p><strong>Timestamp:</strong> {selectedTx.date}</p>
                <p><strong>Cryptographic Hash:</strong> <code style={{ background: '#050b18', padding: '2px 6px', borderRadius: '4px', color: '#70aaff' }}>{selectedTx.hash || '0x49f8...11a2'}</code></p>
                <p><strong>Gateway Provider:</strong> {selectedTx.gateway || 'PayPal Sandbox API'}</p>
                <p><strong>Network Fee:</strong> {selectedTx.fee || '$0.00'}</p>
                <p><strong>AI Risk Verification:</strong> Passed with 99.99% confidence score.</p>
              </div>
              <button className="modal-action-btn" onClick={() => setSelectedTx(null)}>Close Inspection</button>
            </div>
          </div>
        )}

        <footer className="page-footer">
          <span>© 2026 PayFlow Autonomous Engine. All rights reserved.</span>
          <span><span className="status-dot" /> Sandbox Gateway Live</span>
        </footer>
      </main>
    </div>
  );
}

const styles = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
:root{font-family:'DM Sans',Inter,sans-serif;color:#f4f7ff;background:#050b18}
*{box-sizing:border-box}
body{margin:0;background:#050b18}
button,input{font:inherit}
button{cursor:pointer}
.pf-app{min-height:100vh;display:flex;background:radial-gradient(ellipse at 60% 0%,rgba(14,58,140,.2),transparent 40%),#050b18;color:#f4f7ff}
.sidebar{width:220px;min-width:220px;min-height:100vh;background:linear-gradient(180deg,#071026 0%,#050d21 100%);border-right:1px solid rgba(111,143,204,.1);padding:20px 14px;display:flex;flex-direction:column;position:relative;z-index:5}
.brand{padding:0 6px 22px;position:relative}
.brand-mark{font-size:36px;line-height:36px;font-weight:800;font-style:italic;color:#087bff;text-shadow:0 0 20px rgba(0,104,255,.4);letter-spacing:-4px;margin-bottom:6px}
.brand-name{font-size:18px;font-weight:800;letter-spacing:-.5px}
.brand-tagline{font-size:9.5px;line-height:1.4;color:#9cb2de;margin-top:2px}
.nav-list{display:flex;flex-direction:column;gap:4px;margin-bottom:auto}
.nav-item{border:0;background:transparent;color:#abc1ea;border-radius:10px;display:flex;align-items:center;gap:12px;padding:10px 12px;text-align:left;font-size:12.5px;font-weight:500;transition:.2s}
.nav-item:hover{background:rgba(53,101,209,.15);color:#fff}
.nav-item.active{color:white;background:linear-gradient(105deg,#0969ed,#0642c9);box-shadow:0 4px 15px rgba(0,83,235,.3)}
.premium-card{background:linear-gradient(145deg,#0d1d45,#08173d);border:1px solid rgba(64,124,255,.3);border-radius:14px;padding:14px;margin-top:15px;margin-bottom:12px;box-shadow:0 6px 20px rgba(0,35,120,.25);position:relative;overflow:hidden}
.premium-crown{font-size:20px;margin-bottom:6px}
.premium-title{font-weight:700;font-size:13px;color:#fff}
.premium-subtitle{font-size:10px;color:#b2c6ec;margin:3px 0 10px;line-height:1.35}
.premium-btn{width:100%;background:linear-gradient(135deg,#0875ff,#0542c9);border:0;color:#fff;border-radius:8px;padding:7px;font-size:11.5px;font-weight:700;box-shadow:0 4px 12px rgba(0,93,255,.35)}
.sidebar-footer{font-size:10px;color:#879dc8;display:flex;align-items:center;gap:6px;padding:4px 2px 0}
.status-dot{width:6px;height:6px;border-radius:50%;background:#35d9a4;display:inline-block;box-shadow:0 0 6px #35d9a4}
.main-area{flex:1;min-width:0;padding:16px 20px;display:flex;flex-direction:column}
.topbar{height:50px;display:flex;align-items:center;justify-content:space-between;margin-bottom:16px}
.search-box{width:min(460px,55%);height:42px;border-radius:14px;background:#0d1833;border:1px solid rgba(115,148,214,.1);display:flex;align-items:center;gap:12px;padding:0 14px;color:#a3b8e2}
.search-box input{background:transparent;border:0;outline:0;color:#fff;flex:1;font-size:12.5px}
.search-box input::placeholder{color:#8da2cb}
.search-box kbd{font-size:10.5px;color:#879ec8;background:#142247;padding:2px 6px;border-radius:4px}
.topbar-actions{display:flex;align-items:center;gap:16px}
.icon-button{border:0;background:transparent;color:#c6d6f5;position:relative;padding:6px;cursor:pointer}
.notification-count{position:absolute;right:0;top:0;background:#ef4560;color:white;border-radius:50%;width:15px;height:15px;font-size:9.5px;display:grid;place-items:center;font-weight:700}
.notification-wrap{position:relative}
.notification-popover{position:absolute;right:0;top:40px;width:220px;padding:12px;background:#0e1a38;border:1px solid #233765;border-radius:12px;z-index:8;box-shadow:0 10px 30px #0008;font-size:11.5px}
.notification-popover p{color:#b2c6ec;margin:8px 0 0}
.profile-container{display:flex;align-items:center;gap:8px;font-size:11.5px;font-weight:600;color:#f0f4ff;background:#0d1833;padding:5px 12px 5px 6px;border-radius:25px;border:1px solid rgba(111,143,204,.15)}
.profile-container img{width:28px;height:28px;border-radius:50%;object-fit:cover}
.dashboard-grid{display:grid;grid-template-columns:1.05fr 1fr;gap:16px;flex:1}
.panel{background:linear-gradient(145deg,rgba(13,24,51,.95),rgba(9,18,39,.95));border:1px solid rgba(111,143,204,.15);border-radius:16px;box-shadow:0 10px 25px rgba(0,0,0,.2)}
.full-view-panel{flex:1;padding:24px;display:flex;flex-direction:column}
.assistant-card{padding:16px 16px 14px;display:flex;flex-direction:column;min-height:540px}
.assistant-tabs-header{display:flex;align-items:center;gap:16px;border-bottom:1px solid rgba(111,143,204,.12);padding-bottom:12px;margin-bottom:16px}
.ass-tab{background:none;border:0;color:#a3b8e2;font-size:13px;font-weight:600;padding:4px 0;cursor:pointer;position:relative}
.ass-tab.active{color:#fff}
.ass-tab.active:after{content:'';position:absolute;bottom:-13px;left:0;right:0;height:2px;background:#0875ff}
.online-badge{margin-left:auto;font-size:10.5px;color:#35d9a4;font-weight:600}
.chat-area{display:flex;flex-direction:column;gap:14px;flex:1;overflow:auto;max-height:310px;padding-right:4px}
.chat-row{display:flex;align-items:flex-end;gap:8px}
.user-row{justify-content:flex-end}
.small-bot-avatar,.user-chat-avatar{width:32px;height:32px;border-radius:50%;display:grid;place-items:center;object-fit:cover;flex-shrink:0}
.small-bot-avatar{background:#1747a5;color:#fff;font-size:13.5px}
.chat-bubble{max-width:80%;padding:11px 14px;border-radius:14px;font-size:13px;line-height:1.5}
.chat-bubble p{margin:0}
.user-bubble{background:linear-gradient(120deg,#0752d9,#0755f3);border-top-right-radius:4px}
.bot-bubble{background:#142247;border-top-left-radius:4px;color:#f0f4ff;border:1px solid rgba(111,143,204,.1)}
.ai-proof-box{margin-top:10px;background:#081026;border:1px solid rgba(0,188,139,.3);border-radius:10px;padding:8px 10px;font-size:11px}
.proof-title{font-weight:700;color:#35d9a4;margin-bottom:4px}
.proof-grid{display:grid;grid-template-columns:1fr 1fr;gap:4px;color:#b2c6ec}
.message-time{font-size:9.5px;color:#97abe3;margin-top:5px;display:flex;gap:4px;justify-content:flex-end}
.quick-actions{background:#0a132b;border:1px solid rgba(111,143,204,.1);border-radius:14px;padding:12px;margin:12px 0}
.quick-title{font-size:11.5px;font-weight:600;margin-bottom:8px;color:#e2ecff}
.quick-buttons{display:flex;gap:6px;flex-wrap:wrap}
.quick-buttons button{border:1px solid rgba(111,143,204,.2);background:#132247;color:#e8f0ff;border-radius:18px;padding:6px 11px;font-size:11px;font-weight:500}
.message-composer{height:44px;border:1px solid rgba(111,143,204,.2);background:#0a132b;border-radius:14px;display:flex;align-items:center;padding:0 6px 0 12px;gap:8px}
.attach-button{border:0;background:transparent;color:#92a8d4}
.message-composer input{flex:1;background:transparent;border:0;outline:0;color:white;font-size:12.5px}
.message-composer input::placeholder{color:#8da2cb}
.send-button{width:34px;height:34px;border:0;border-radius:50%;background:linear-gradient(135deg,#0875ff,#0542c9);color:white;display:grid;place-items:center}
.right-column{display:flex;flex-direction:column;gap:14px}
.wallet-card{height:200px;border-radius:16px;padding:20px 24px;background:linear-gradient(115deg,#0754d9,#5544f4);position:relative;overflow:hidden;box-shadow:0 10px 25px rgba(0,61,190,.3)}
.wallet-glow{position:absolute;width:200px;height:100px;right:-40px;top:-30px;background:#8a62ff;filter:blur(40px);opacity:.6}
.wallet-topline{display:flex;align-items:center;gap:10px;font-weight:600;font-size:12.5px;position:relative;z-index:1;color:#f0f6ff}
.wallet-icon{width:28px;height:28px;background:rgba(255,255,255,.2);border-radius:8px;display:grid;place-items:center;font-size:13.5px}
.paypal-symbol{position:absolute;right:0;top:-10px;font-size:60px;font-weight:900;font-style:italic;color:#087fff;opacity:.35}
.wallet-balance{font-size:38px;font-weight:700;margin-top:6px;position:relative;z-index:1;letter-spacing:-1px}
.wallet-change{font-size:11.5px;color:#e2ecff;margin-top:2px;position:relative;z-index:1}
.wallet-change strong{color:#37edb4}
.paypal-button-high-contrast{position:absolute;left:20px;right:20px;bottom:16px;height:42px;border:0;border-radius:22px;background:linear-gradient(135deg,#00a86b,#008050);color:#fff;font-weight:800;font-style:italic;display:flex;align-items:center;justify-content:center;gap:8px;box-shadow:0 6px 18px rgba(0,168,107,.4);z-index:2;font-size:13px}
.transactions-card{padding:14px 16px;flex:1}
.section-heading{display:flex;align-items:center;justify-content:space-between;margin-bottom:10px}
.section-title{font-size:12.5px;font-weight:600;color:#eaf0ff}
.view-all{border:0;background:transparent;color:#a8c4f7;font-size:11px;cursor:pointer}
.transaction-list{display:flex;flex-direction:column;gap:10px}
.transaction-row{display:grid;grid-template-columns:32px 1fr auto auto;align-items:center;gap:10px;cursor:pointer;padding:4px 6px;border-radius:8px;transition:.2s}
.transaction-row:hover{background:rgba(255,255,255,.03)}
.transaction-icon{width:32px;height:32px;border-radius:50%;display:grid;place-items:center;color:#fff;font-size:13.5px}
.transaction-icon.blue{background:#087dff}
.transaction-icon.green{background:#00a98a}
.transaction-icon.purple{background:#5d54ff}
.transaction-info{min-width:0}
.transaction-name{font-size:11.5px;font-weight:500;color:#f4f7ff}
.transaction-date{font-size:9.5px;color:#97abe3}
.transaction-status{padding:3px 7px;border-radius:10px;font-size:9px;font-weight:600}
.transaction-status.processing{background:rgba(0,93,231,.25);color:#92d0ff}
.transaction-status.ai-verified,.transaction-status.success{background:rgba(0,190,142,.2);color:#57e7bd}
.transaction-amount{font-size:11.5px;font-weight:600;text-align:right}
.quick-grid-card{padding:14px 16px}
.actions-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:8px}
.grid-action-item{background:#0a132b;border:1px solid rgba(111,143,204,.15);border-radius:12px;padding:10px 6px;display:flex;flex-direction:column;align-items:center;gap:5px;color:#e2ecff;font-size:10.5px;font-weight:500;transition:.2s}
.grid-action-item:hover{background:#132247;border-color:#3b72e0}
.grid-icon{font-size:16.5px}
.security-note{display:flex;align-items:center;gap:10px;padding:10px 14px;background:#0a132b;border:1px solid rgba(111,143,204,.12);border-radius:12px;color:#c6d6f5;font-size:10.5px}
.security-icon{font-size:16.5px}
.sec-text{display:flex;flex-direction:column;gap:2px;flex:1}
.sec-text strong{color:#f4f7ff;font-weight:600}
.sec-text span{color:#a3b8e2;font-size:9.5px}
.sec-link{color:#8ab8ff;font-size:10.5px;font-weight:600}
.page-footer{font-size:9.5px;color:#7892bd;padding-top:12px;display:flex;justify-content:space-between;border-top:1px solid rgba(111,143,204,.08);margin-top:10px}
.modal-backdrop{position:fixed;inset:0;background:rgba(0,0,0,.7);display:grid;place-items:center;z-index:100;backdrop-filter:blur(5px)}
.modal-content{width:400px;padding:24px;border:1px solid rgba(111,143,204,.3);animation:fadeIn .2s ease}
.modal-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:16px}
.modal-header h3{margin:0;font-size:16px;color:#fff}
.modal-close{background:none;border:0;color:#a3b8e2;font-size:16px;cursor:pointer}
.modal-body{display:flex;flex-direction:column;gap:10px;font-size:12.5px;color:#c6d6f5;margin-bottom:20px}
.modal-body p{margin:0;display:flex;justify-content:space-between}
.modal-action-btn{width:100%;background:#0875ff;border:0;color:#fff;border-radius:10px;padding:10px;font-weight:700;font-size:13px}
@keyframes fadeIn{from{opacity:0;transform:scale(.95)}to{opacity:1;transform:scale(1)}}
.mobile-menu,.mobile-close,.mobile-scrim{display:none}
`;