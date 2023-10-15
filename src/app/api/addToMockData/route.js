// src/app/api/addToMockData/route.js
import fs from 'fs';
import path from 'path';

export async function POST(req, res) {
  const filePath = path.join(process.cwd(), 'src', 'app', 'mockData.json');
  const fileData = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(fileData);
  
  data.push(req.body);
  
  fs.writeFileSync(filePath, JSON.stringify(data));
  
  res.status(200).json({ message: 'Data added successfully' });
}
