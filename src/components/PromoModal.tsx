interface PromoModalProps {
  imageSrc?: string;
  onClose: () => void;
}

export default function PromoModal({
  imageSrc = "/promo.jpg",
  onClose,
}: PromoModalProps) {
  return (
    <div
      className="promo-overlay"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div className="promo-modal" onClick={(e) => e.stopPropagation()}>
        <button className="promo-close" aria-label="Close" onClick={onClose}>
          ×
        </button>
        <div className="promo-body">
          <img src={imageSrc} alt="Promo" className="promo-img" />
        </div>
      </div>
    </div>
  );
}
