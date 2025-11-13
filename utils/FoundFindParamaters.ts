export const extractCoordinates = (inputUrl: string): string[] => {
    const match = inputUrl.match(/q=(-?\d+(\.\d+)?),(-?\d+(\.\d+)?)/);
    return match ? [match[1], match[3]] : [];
  };