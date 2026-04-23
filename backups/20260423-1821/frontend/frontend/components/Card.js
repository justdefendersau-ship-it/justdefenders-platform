export default function Card({ children }){

  return (
    <div style={{
      background:"rgba(255,255,255,0.03)",
      border:"1px solid #222",
      borderRadius:"12px",
      padding:"20px",
      marginBottom:"20px",
      boxShadow:"0 0 20px rgba(0,0,0,0.5)"
    }}>
      {children}
    </div>
  );
}