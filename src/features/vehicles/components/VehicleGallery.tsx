import { useState } from 'react';

interface Props {
  exterior: string;
  interior: string;
  alt: string;
}

export default function VehicleGallery({ exterior, interior, alt }: Props) {
  const [view, setView] = useState<'exterior' | 'interior'>('exterior');
  const src = view === 'exterior' ? exterior : interior;

  return (
    <div className="vehicle-gallery">
      <div
        className="vehicle-detail-image"
        style={{ backgroundImage: `url('${src}')` }}
        role="img"
        aria-label={`${alt}: ${view}`}
      />
      <div className="gallery-tabs">
        <button
          className={`gallery-tab${view === 'exterior' ? ' active' : ''}`}
          onClick={() => setView('exterior')}
        >
          Exterior
        </button>
        <button
          className={`gallery-tab${view === 'interior' ? ' active' : ''}`}
          onClick={() => setView('interior')}
        >
          Interior
        </button>
      </div>
    </div>
  );
}
