// mockDataFunctions.js
import data from '../app/mockData.json';
import fs from 'fs';
import path from 'path';

export const addToMockData = (newData) => {
  const filePath = path.join(process.cwd(), 'mockData.json');
  const updatedData = [...data, newData];
  fs.writeFileSync(filePath, JSON.stringify(updatedData));
};
