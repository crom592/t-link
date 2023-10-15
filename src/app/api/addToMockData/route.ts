import fs from 'fs';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    let data = '';
    for await (const chunk of req) {
      data += chunk;
    }

    console.log("Parsed Stream Data:", JSON.parse(data));

    const filePath = path.join(process.cwd(), 'src', 'app', 'mockData.json');
    const fileData = fs.readFileSync(filePath, 'utf8');
    const existingData = JSON.parse(fileData);

    existingData.push(JSON.parse(data));
    fs.writeFileSync(filePath, JSON.stringify(existingData));

    res.status(200).json({ message: 'Data added successfully' });

  } catch (error) {
    console.error('Error occurred:', error);
    res.status(500).json({ message: 'Internal Server Error', error });
  }
}
