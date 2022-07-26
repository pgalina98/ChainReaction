export enum RentABikeStep {
  SELECT_GEAR = 1,
  CHOOSE_LOCATION = 2,
  PICKUP_DATE = 3,
  FINISHED = 4,
}

export const RentABikeSteps = [
  RentABikeStep.SELECT_GEAR,
  RentABikeStep.CHOOSE_LOCATION,
  RentABikeStep.PICKUP_DATE,
  RentABikeStep.FINISHED,
];

export const determineNextStep = (currentStep: RentABikeStep): RentABikeStep => {
  switch (currentStep) {
    case RentABikeStep.SELECT_GEAR:
      return RentABikeStep.CHOOSE_LOCATION;

    case RentABikeStep.CHOOSE_LOCATION:
      return RentABikeStep.PICKUP_DATE;

    case RentABikeStep.PICKUP_DATE:
      return RentABikeStep.FINISHED;

    default:
      return RentABikeStep.SELECT_GEAR;
  }
};

export const determinePreviousStep = (currentStep: RentABikeStep): RentABikeStep => {
  switch (currentStep) {
    case RentABikeStep.FINISHED:
      return RentABikeStep.PICKUP_DATE;

    case RentABikeStep.PICKUP_DATE:
      return RentABikeStep.CHOOSE_LOCATION;

    case RentABikeStep.CHOOSE_LOCATION:
      return RentABikeStep.SELECT_GEAR;

    default:
      return RentABikeStep.SELECT_GEAR;
  }
};
