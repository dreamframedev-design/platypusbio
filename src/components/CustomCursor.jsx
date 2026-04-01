export default function CustomCursor({ x, y, isHovering }) {
  return (
    <div
      className="custom-cursor hidden md:block"
      style={{
        left: `${x}px`,
        top: `${y}px`,
        width: isHovering ? '50px' : '20px',
        height: isHovering ? '50px' : '20px',
        borderColor: isHovering ? 'var(--color-platypus-amber)' : 'var(--color-platypus-orange)',
        background: isHovering ? 'rgba(232, 122, 46, 0.1)' : 'transparent',
      }}
    />
  )
}
