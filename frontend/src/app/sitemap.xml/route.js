import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  // Read the sitemap.xml file from the public directory
  const filePath = path.join(process.cwd(), 'public', 'sitemap.xml');
  const fileContent = fs.readFileSync(filePath, 'utf8');

  return new NextResponse(fileContent, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}