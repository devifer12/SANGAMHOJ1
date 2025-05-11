import React, { useState } from "react";

export default function ProductModal({ product, onClose }) {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setScale((prev) => Math.max(prev - 0.25, 1));
  };

  const handleReset = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  // Handle both mouse and touch events for dragging
  const handleDragStart = (e) => {
    if (scale > 1) {
      setIsDragging(true);
      // Handle both mouse and touch events
      const clientX = e.type.includes("mouse")
        ? e.clientX
        : e.touches[0].clientX;
      const clientY = e.type.includes("mouse")
        ? e.clientY
        : e.touches[0].clientY;
      setDragStart({ x: clientX, y: clientY });
    }
  };

  const handleDragMove = (e) => {
    if (isDragging && scale > 1) {
      // Prevent default to stop scrolling on mobile
      e.preventDefault();

      // Handle both mouse and touch events
      const clientX = e.type.includes("mouse")
        ? e.clientX
        : e.touches[0].clientX;
      const clientY = e.type.includes("mouse")
        ? e.clientY
        : e.touches[0].clientY;

      const deltaX = clientX - dragStart.x;
      const deltaY = clientY - dragStart.y;
      setPosition((prev) => ({ x: prev.x + deltaX, y: prev.y + deltaY }));
      setDragStart({ x: clientX, y: clientY });
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 md:p-8"
      onClick={handleBackdropClick}
    >
      <div className="bg-burgundy border border-gold/30 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex justify-between items-center p-4 border-b border-gold/30">
          <h3 className="font-serif text-2xl text-gold">
            {product.product_name}
          </h3>
          <button
            onClick={onClose}
            className="text-gold hover:text-gold/70 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-auto p-4">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/2 relative">
              <div
                className="overflow-hidden rounded-lg bg-black/20 aspect-square"
                onMouseDown={handleDragStart}
                onMouseMove={handleDragMove}
                onMouseUp={handleDragEnd}
                onMouseLeave={handleDragEnd}
                onTouchStart={handleDragStart}
                onTouchMove={handleDragMove}
                onTouchEnd={handleDragEnd}
                onTouchCancel={handleDragEnd}
              >
                {product.image_url && (
                  <img
                    src={`${product.image_url}?w=800&q=90`}
                    alt={product.product_name}
                    className="w-full h-full object-contain transition-transform cursor-move"
                    style={{
                      transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
                      transformOrigin: "center",
                    }}
                    draggable="false"
                  />
                )}
              </div>

              <div className="flex justify-center gap-4 mt-4">
                <button
                  onClick={handleZoomIn}
                  className="bg-gold/20 hover:bg-gold/30 text-gold p-2 rounded-full transition-colors"
                  title="Zoom In"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    <line x1="11" y1="8" x2="11" y2="14"></line>
                    <line x1="8" y1="11" x2="14" y2="11"></line>
                  </svg>
                </button>
                <button
                  onClick={handleZoomOut}
                  className="bg-gold/20 hover:bg-gold/30 text-gold p-2 rounded-full transition-colors"
                  title="Zoom Out"
                  disabled={scale <= 1}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    <line x1="8" y1="11" x2="14" y2="11"></line>
                  </svg>
                </button>
                <button
                  onClick={handleReset}
                  className="bg-gold/20 hover:bg-gold/30 text-gold p-2 rounded-full transition-colors"
                  title="Reset Zoom"
                  disabled={scale === 1 && position.x === 0 && position.y === 0}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 2v6h6"></path>
                    <path d="M21 12A9 9 0 0 0 6 5.3L3 8"></path>
                    <path d="M21 22v-6h-6"></path>
                    <path d="M3 12a9 9 0 0 0 15 6.7l3-2.7"></path>
                  </svg>
                </button>
              </div>

              <div className="text-gold/60 text-sm text-center mt-2">
                {scale > 1
                  ? "Click and drag to move the image"
                  : "Zoom in to enable panning"}
              </div>
            </div>

            <div className="md:w-1/2">
              <div className="text-gold/80 mb-6">{product.description}</div>

              {product.collections && (
                <div className="mb-4">
                  <span className="text-gold font-medium">Collection: </span>
                  <span className="text-gold/80">
                    {product.collections.collection_name}
                  </span>
                </div>
              )}

              <div className="text-gold/60 text-sm italic mt-8">
                For pricing and availability, please contact us directly.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}