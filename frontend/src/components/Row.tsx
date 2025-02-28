export default function Row() {
  return (
    <div className="row">
      {[...Array(5)].map((_, i) => (
        <div key={i}></div>
      ))}
    </div>
  )
}
