export default interface Address {
  city: string;
  address: string;
  zipCode: string;
}

export const createEmptyAddressObject = (): Address => {
  return {
    city: null as any,
    address: null as any,
    zipCode: null as any,
  };
};
