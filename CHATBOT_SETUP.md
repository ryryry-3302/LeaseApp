# ChatBot Setup Instructions

## Overview
The ChatBot feature uses Google's Gemini API to help tenants find listings based on natural language queries.

## Setup Steps

1. **Get a Gemini API Key**
   - Visit: https://makersuite.google.com/app/apikey
   - Sign in with your Google account
   - Click "Create API Key"
   - Copy your API key

2. **Add API Key to Environment Variables**
   - Create a `.env.local` file in the root of your project (if it doesn't exist)
   - Add the following line:
     ```
     GEMINI_API_KEY=your_actual_api_key_here
     ```
   - Replace `your_actual_api_key_here` with your actual API key

3. **Restart Your Dev Server**
   - Stop your current dev server (Ctrl+C)
   - Run `npm run dev` again
   - The ChatBot should now work!

## Usage

1. Click the chat icon in the bottom-right corner of the listings page
2. Ask questions like:
   - "I'm looking for a 2 bedroom unit near SOMA for around $3000/month"
   - "Find me a 1 bedroom apartment in the Financial District"
   - "Show me listings with 3 bedrooms under $5000"

The ChatBot will:
- Understand your requirements
- Filter listings based on your criteria
- Recommend the best matches
- Provide clickable links to view listing details

## Example Queries

- "hi im looking for a 2 bd rm unit for me and my roomate ideally it is nearby to our offices in soma and finacial district reccomend a good place for around 3000 a month"
- "Find a 1 bedroom apartment in Mission District"
- "Show me verified listings with 2 bedrooms"
- "I need a place near SOMA, 2 bedrooms, max $3500/month"
