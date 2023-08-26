export default (date: string) => {
  if (date) {
    return new Date(date).toLocaleDateString();
  }
};
