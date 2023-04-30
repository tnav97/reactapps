export const getFadeAndUpStyles = (delay: number, duration: number) => ({
  entering: {
    opacity: 0,
    transform: 'translateY(50px)',
  },
  entered: {
    opacity: 1,
    transform: 'translateX(0)',
    transition: `opacity ${duration}ms, transform ${duration}ms`,
    transitionDelay: `${delay}ms`,
  },
});
