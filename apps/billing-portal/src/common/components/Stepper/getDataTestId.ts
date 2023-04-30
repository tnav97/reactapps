export const getDataTestId = (index: number, activeStep: number) => {
  if (index === activeStep) return 'activeStep';
  if (index < activeStep) return 'completedStep';
  return 'inactiveStep';
};
