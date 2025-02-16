const getOptionStyle = (type: 'brand' | 'series' | 'model') => {
  switch(type) {
    case 'brand':
      return {
        paddingLeft: '8px',
        fontWeight: 'bold',
        color: 'gray.600',
      };
    case 'series':
      return {
        paddingLeft: '16px',
        fontWeight: 'semibold',
        color: 'gray.600',
      };
    case 'model':
      return {
        paddingLeft: '36px',
      };
  }
};

export default getOptionStyle;