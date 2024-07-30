const colors = {
  primaryColor: (op = 1) => `rgba(135, 40, 49, ${op})`,
  secondaryColor: (op = 1) => `rgba(104, 168, 197, ${op})`,
  tertiaryColor: (op = 1) => `rgba(226, 158, 6, ${op})`,
  white: (op = 1) => `rgba(232, 225, 225, ${op})`,
  black: (op = 1) => `rgba(0, 0, 0, ${op})`,
};

export default {
  ...colors,
};