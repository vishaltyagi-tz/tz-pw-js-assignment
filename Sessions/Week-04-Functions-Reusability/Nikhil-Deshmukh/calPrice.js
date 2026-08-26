  const calculateTotalPrice = (rate, taxrate) => rate + (rate * taxrate);

    console.log(calculateTotalPrice(120,0.25));
    
    console.log(calculateTotalPrice(10000,0.10));