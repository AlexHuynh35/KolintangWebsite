export default function Clamp() {
  return (
    <div className="relative w-full h-full">
      <div className="fixed top-0 left-0 right-0 h-1/2 bg-black -z-100" />
      <div className="fixed bottom-0 left-0 right-0 h-1/2 bg-accent-intense -z-100" />
    </div>
  )
}