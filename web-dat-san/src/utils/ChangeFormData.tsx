export const getChangedFields = (oldData: any, newData: any) => {
  const formData: Record<string, any> = {};
  for (const [key, newVal] of Object.entries(newData)) {
    const oldVal = oldData[key];

    if (oldVal != newVal) {
      formData[key] = newVal;
    }
  }
  return formData;
};
