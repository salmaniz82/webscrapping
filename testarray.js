const metaObject = {
    'METRIC WEIGHT': '370/400g',
    'IMPERIAL WEIGHT': '13/14oz',
    'CLOTH CODE': 'CL2-1',
    COLOUR: 'Grey',
    PATTERN: 'Plain',
  };
  
  // Using Object.entries()
  const metaArray = Object.entries(metaObject).map(([key, value]) => ({
    [key]: value,
  }));
  
  // Using for...in loop
  const metaArray2 = [];
  for (const key in metaObject) {
    metaArray2.push({ [key]: metaObject[key] });
  }
  
  console.log(metaArray);
  console.log(metaArray2);