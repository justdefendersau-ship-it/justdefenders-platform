export default function RootLayout({ children }) {
  return (
    <html>
      <body style={{
        background: "linear-gradient(180deg,#050505,#0a0a0a)",
        color: "#ddd",
        fontFamily: "Segoe UI, sans-serif"
      }}>

        {/* NAV BAR */}
        <div style={{
          display:"flex",
          alignItems:"center",
          padding:"14px 24px",
          borderBottom:"1px solid #222",
          background:"rgba(20,20,20,0.6)",
          backdropFilter:"blur(8px)"
        }}>

          <div style={{color:"#888",marginRight:"40px"}}>
            JustDefenders ©
          </div>

          <div style={{display:"flex",gap:"25px"}}>
            <a href="/" style={{color:"#fff"}}>🏠 Home</a>
            <a href="/intelligence" style={{color:"#fff"}}>🧠 Intelligence</a>
            <a href="/parts" style={{color:"#fff"}}>🔧 Parts</a>
            <a href="/fuel" style={{color:"#fff"}}>⛽ Fuel</a>
            <a href="/service" style={{color:"#fff"}}>🛠 Service</a>
            <a href="/admin" style={{color:"#fff"}}>⚙ Admin</a>
          </div>

        </div>

        {/* CONTENT */}
        <div style={{
          padding:"30px",
          maxWidth:"1200px",
          margin:"0 auto"
        }}>
          {children}
        </div>

      </body>
    </html>
  );
}