import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";
import { mockListings } from "@/lib/mockData";
import { Listing } from "@/types/listing";

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

// Helper function to extract requirements from user query using Gemini
async function extractRequirements(query: string): Promise<{
  bedrooms?: number;
  maxPrice?: number;
  neighborhoods?: string[];
  minPrice?: number;
}> {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const prompt = `You are a real estate assistant. Extract the following information from the user's query about apartment listings:
- Number of bedrooms (if mentioned)
- Maximum price per month (if mentioned)
- Minimum price per month (if mentioned)
- Neighborhoods or areas mentioned (e.g., SOMA, Financial District, Mission District, etc.)

User query: "${query}"

Respond ONLY with a JSON object in this exact format (use null for missing values):
{
  "bedrooms": number or null,
  "maxPrice": number or null,
  "minPrice": number or null,
  "neighborhoods": ["neighborhood1", "neighborhood2"] or null
}

Example neighborhoods in San Francisco: SOMA, Financial District, Mission District, Hayes Valley, Nob Hill, Pacific Heights, Marina, Lower Haight, Mission Bay, Potrero Hill, Dogpatch

Only return the JSON object, nothing else.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text().trim();
    
    // Extract JSON from response (handle markdown code blocks if present)
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    return {};
  } catch (error) {
    console.error("Error extracting requirements:", error);
    return {};
  }
}

// Helper function to filter listings based on requirements
function filterListings(requirements: {
  bedrooms?: number;
  maxPrice?: number;
  neighborhoods?: string[];
  minPrice?: number;
}): Listing[] {
  let filtered = [...mockListings];

  if (requirements.bedrooms !== undefined && requirements.bedrooms !== null) {
    filtered = filtered.filter((l) => l.bedrooms === requirements.bedrooms);
  }

  if (typeof requirements.maxPrice === 'number') {
    const maxPrice = requirements.maxPrice;
    filtered = filtered.filter((l) => l.price <= maxPrice);
  }

  if (typeof requirements.minPrice === 'number') {
    const minPrice = requirements.minPrice;
    filtered = filtered.filter((l) => l.price >= minPrice);
  }

  if (requirements.neighborhoods && requirements.neighborhoods.length > 0) {
    const normalizedNeighborhoods = requirements.neighborhoods.map((n) =>
      n.toLowerCase()
    );
    filtered = filtered.filter((l) =>
      normalizedNeighborhoods.some((n) =>
        l.neighborhood.toLowerCase().includes(n) ||
        l.neighborhood.toLowerCase() === n
      )
    );
  }

  return filtered;
}

// Helper function to generate a natural language response with recommendations
async function generateResponse(
  query: string,
  requirements: any,
  matchingListings: Listing[]
): Promise<string> {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const listingsSummary = matchingListings.slice(0, 5).map((listing) => ({
    id: listing.id,
    address: listing.address,
    neighborhood: listing.neighborhood,
    price: listing.price,
    bedrooms: listing.bedrooms,
    bathrooms: listing.bathrooms,
    availableDate: listing.availableDate,
  }));

  const prompt = `You are a helpful real estate assistant helping tenants find apartments in San Francisco.

User's query: "${query}"

Based on the user's requirements, I found ${matchingListings.length} matching listing(s).

Here are the top ${Math.min(5, matchingListings.length)} recommendations:
${JSON.stringify(listingsSummary, null, 2)}

Provide a friendly, helpful response that:
1. Acknowledges their requirements
2. Mentions how many listings match their criteria
3. Highlights the top 3-5 listings with key details (address, neighborhood, price, bedrooms)
4. Suggests they can click on listings to see more details
5. Keeps the response conversational and helpful

Format the response naturally, as if you're a helpful assistant. Don't use markdown formatting.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error generating response:", error);
    return `I found ${matchingListings.length} listing(s) matching your criteria. Here are the top recommendations:\n\n${matchingListings
      .slice(0, 5)
      .map(
        (l) =>
          `• ${l.address}, ${l.neighborhood} - $${l.price.toLocaleString()}/mo, ${l.bedrooms} bed${l.bedrooms !== 1 ? "s" : ""}, ${l.bathrooms} bath${l.bathrooms !== 1 ? "s" : ""}`
      )
      .join("\n")}`;
  }
}

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY is not configured" },
        { status: 500 }
      );
    }

    // Extract requirements from user query
    const requirements = await extractRequirements(message);

    // Filter listings based on requirements
    const matchingListings = filterListings(requirements);

    // Generate natural language response
    const response = await generateResponse(
      message,
      requirements,
      matchingListings
    );

    return NextResponse.json({
      response,
      listings: matchingListings.slice(0, 10), // Return top 10 matching listings
      requirements,
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Failed to process chat message" },
      { status: 500 }
    );
  }
}
