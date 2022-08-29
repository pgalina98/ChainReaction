import Animation from "../../animation";

interface LoadingOverlayProps {
  className?: string;
}

const LoadingOverlay = ({ className }: LoadingOverlayProps) => {
  return (
    <div
      className={`h-screen ${className} bg_primary flex items-center justify-center`}
    >
      <Animation
        styles="loading_overlay_icon_height"
        animationPath="/animations/loading-cart.json"
      />
    </div>
  );
};

export default LoadingOverlay;
