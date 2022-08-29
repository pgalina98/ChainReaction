import Animation from "../../animation";

interface DeliveryOverlayProps {
  className?: string;
}

const DeliveryOverlay = ({ className }: DeliveryOverlayProps) => {
  return (
    <div className={`h-screen ${className} bg_primary relative`}>
      <Animation
        className="absolute -left-20 -bottom-4"
        styles="delivery_overlay_icon_height"
        animationPath="/animations/package-delivery.json"
      />
    </div>
  );
};

export default DeliveryOverlay;
