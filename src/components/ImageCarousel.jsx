// src/components/ImageCarousel.jsx
import React, { useState } from 'react';

const ImageCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div style={{
        width: '100%',
        height: '400px',
        backgroundColor: 'var(--color-bg-secondary)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 'var(--radius-lg)'
      }}>
        <span style={{ color: 'var(--color-text-secondary)' }}>No image available</span>
      </div>
    );
  }

  const goToPrevious = () => {
    const isFirstImage = currentIndex === 0;
    const newIndex = isFirstImage ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastImage = currentIndex === images.length - 1;
    const newIndex = isLastImage ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToImage = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      {/* Main Image */}
      <div style={{
        width: '100%',
        height: '400px',
        overflow: 'hidden',
        borderRadius: 'var(--radius-lg)',
        position: 'relative'
      }}>
        <img
          src={images[currentIndex]}
          alt={`Product view ${currentIndex + 1}`}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'scale(1)';
          }}
        />
      </div>

      {/* Navigation Arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            style={{
              position: 'absolute',
              top: '50%',
              left: 'var(--spacing-sm)',
              transform: 'translateY(-50%)',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              color: 'white',
              border: 'none',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            ‹
          </button>
          <button
            onClick={goToNext}
            style={{
              position: 'absolute',
              top: '50%',
              right: 'var(--spacing-sm)',
              transform: 'translateY(-50%)',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              color: 'white',
              border: 'none',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            ›
          </button>
        </>
      )}

      {/* Thumbnails */}
      {images.length > 1 && (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 'var(--spacing-sm)',
          marginTop: 'var(--spacing-md)'
        }}>
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => goToImage(index)}
              style={{
                width: '60px',
                height: '60px',
                border: index === currentIndex ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                cursor: 'pointer',
                padding: 0,
                backgroundColor: 'transparent'
              }}
            >
              <img
                src={image}
                alt={`Thumbnail ${index + 1}`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageCarousel;