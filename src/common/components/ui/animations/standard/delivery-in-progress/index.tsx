import Animation from "../../animation";

interface DeliveryInProgressProps {
  className?: string;
}

const DeliveryInProgress = ({ className }: DeliveryInProgressProps) => {
  return (
    <div className={`${className}`}>
      <Animation animationPath="/animations/delivery-in-progress.json" />
    </div>
  );
};

export default DeliveryInProgress;
