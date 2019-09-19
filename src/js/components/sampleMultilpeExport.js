const handleFirstFunction = () => {
  console.log('this is the first function for multiple export');
};

const handleSecondFunction = () => {
  console.log('this is the second function for multiple export');
};

export { handleFirstFunction, handleSecondFunction };
