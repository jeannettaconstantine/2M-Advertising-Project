import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini AI Client
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// Health check endpoint
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", service: "2M Advertising Signage API" });
});

// AI Quick Design & Signage Consultant Endpoint
app.post("/api/ai/design-signage", async (req, res) => {
  try {
    const { brandName, businessType, preferredVibe, currentType } = req.body;

    if (!brandName || typeof brandName !== 'string') {
      return res.status(400).json({ error: "brandName is required" });
    }

    const ai = getGeminiClient();

    // If Gemini API is available, generate an intelligent architectural signage design
    if (ai) {
      const prompt = `You are a master signage architect and branding consultant at CV. 2M AdvertisinG, Bandar Lampung (established 2002).
A client wants a quick interactive signage design recommendation for their brand.
Client Brand Name: "${brandName}"
Business Type: "${businessType || 'General Retail & Commercial'}"
Preferred Vibe / Style: "${preferredVibe || 'Modern & High-Impact'}"
Current Selected Type: "${currentType || 'lettering'}"

Analyze this brand and generate the optimal signage recommendation in JSON format matching the schema.
Consider:
1. Best sign type for this business type: 'lettering' (Huruf Timbul 3D), 'neonbox' (Neon Box Akrilik), 'pylon' (Pylon Sign Totem), or 'neonflex' (Custom Neon Flex).
2. Ideal Font family archetype: 'sans' (Modern Clean Geometric), 'bold' (Heavy Impact), 'serif' (Luxury Heritage), 'industrial' (Slab & Workshop), or 'script' (Artisan Neon).
3. Primary letter color (hex e.g. #FFFFFF, #2563EB, #DC2626, #F59E0B, #10B981, #06B6D4, #D97706, #E11D48).
4. LED Glow lighting mode: 'frontlit' (Bright Face Diffusion), 'halobacklit' (Warm/Cool Halo Backlight on Wall), 'neon' (Vibrant Silicone Tube Lumens), or 'edgelit'.
5. Optimal Glow Color (hex e.g. #3B82F6, #EF4444, #F59E0B, #10B981, #FFFFFF, #8B5CF6).
6. Ideal Facade Wall texture: 'concrete' (Urban Dark Concrete), 'marble' (White Luxury Marble), 'wood' (Warm Timber Slats), or 'brick' (Rustic Red Brick).
7. A catchy commercial tagline/subtext for the sign (e.g. "SPECIALTY COFFEE & ROASTERY", "DENTAL CLINIC & IMPLANT CENTER", "BOUTIQUE HOTEL & SUITES", "EST. 2024").
8. Professional 2M technical engineering tip (mention LED module, acrylic thickness, or structural safety).
9. Estimated optimal sightline distance (e.g. "50 - 80 Meter").`;

      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: prompt,
        config: {
          systemInstruction: "You are an expert exterior advertising designer and structural engineer at 2M Advertising. Provide strictly valid JSON output conforming to the response schema.",
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              signType: {
                type: Type.STRING,
                description: "Recommended sign type: lettering, neonbox, pylon, or neonflex",
              },
              fontStyle: {
                type: Type.STRING,
                description: "Recommended font style: sans, bold, serif, industrial, or script",
              },
              fontColor: {
                type: Type.STRING,
                description: "Hex color code for the sign lettering/face",
              },
              glowMode: {
                type: Type.STRING,
                description: "Glow mode: frontlit, halobacklit, or neon",
              },
              glowColor: {
                type: Type.STRING,
                description: "Hex color code for the LED illumination glow",
              },
              wallTexture: {
                type: Type.STRING,
                description: "Recommended wall texture: concrete, marble, wood, or brick",
              },
              subText: {
                type: Type.STRING,
                description: "Catchy professional subtext or category label",
              },
              engineeringTip: {
                type: Type.STRING,
                description: "Practical material and manufacturing recommendation from 2M workshop",
              },
              sightline: {
                type: Type.STRING,
                description: "Estimated visibility distance range",
              },
              designRationale: {
                type: Type.STRING,
                description: "A 1-2 sentence explanation of why this look fits the brand",
              },
            },
            required: [
              "signType",
              "fontStyle",
              "fontColor",
              "glowMode",
              "glowColor",
              "wallTexture",
              "subText",
              "engineeringTip",
              "sightline",
              "designRationale",
            ],
          },
        },
      });

      const jsonText = response.text?.trim();
      if (jsonText) {
        const parsed = JSON.parse(jsonText);
        return res.json({
          source: "gemini",
          data: parsed,
        });
      }
    }

    // Graceful fallback heuristics if Gemini API key not present
    const fallbackDesign = getHeuristicSignageDesign(brandName, businessType);
    return res.json({
      source: "curated",
      data: fallbackDesign,
    });
  } catch (error: any) {
    console.error("AI Signage Design API error:", error);
    const fallback = getHeuristicSignageDesign(req.body.brandName || "BRAND", req.body.businessType);
    return res.json({
      source: "fallback",
      data: fallback,
    });
  }
});

function getHeuristicSignageDesign(brandName: string, businessType?: string) {
  const bType = (businessType || "").toLowerCase();
  const name = brandName.toLowerCase();

  if (bType.includes("cafe") || bType.includes("kopi") || name.includes("coffee") || name.includes("kopi")) {
    return {
      signType: "lettering",
      fontStyle: "serif",
      fontColor: "#F59E0B",
      glowMode: "halobacklit",
      glowColor: "#F59E0B",
      wallTexture: "wood",
      subText: "ARTISAN COFFEE & ROASTERY",
      engineeringTip: "Huruf timbul kuningan/acrylic gold dengan warm-white 3000K halo lighting memberikan kesan estetik & welcoming.",
      sightline: "40 - 70 Meter",
      designRationale: "Nuansa kayu dan cahaya hangat 3000K menciptakan impresi artisan yang nyaman bagi pengunjung cafe.",
    };
  }

  if (bType.includes("klinik") || bType.includes("apotek") || bType.includes("dental") || name.includes("clinic") || name.includes("med")) {
    return {
      signType: "neonbox",
      fontStyle: "sans",
      fontColor: "#FFFFFF",
      glowMode: "frontlit",
      glowColor: "#10B981",
      wallTexture: "marble",
      subText: "24 HOURS HEALTHCARE CLINIC",
      engineeringTip: "Neon box akrilik Marga Cipta dengan modul Samsung IP68 putih bersih 6500K standar kebersihan medis.",
      sightline: "80 - 120 Meter",
      designRationale: "Format neonbox akrilik putih dengan aksen hijau medis memberikan sinyal kejelasan tinggi siang dan malam.",
    };
  }

  if (bType.includes("hotel") || bType.includes("resort") || bType.includes("spbu") || name.includes("tower") || name.includes("hotel")) {
    return {
      signType: "pylon",
      fontStyle: "bold",
      fontColor: "#FFFFFF",
      glowMode: "frontlit",
      glowColor: "#3B82F6",
      wallTexture: "concrete",
      subText: "HOTEL & CONVENTION CENTER",
      engineeringTip: "Pylon totem setinggi 6-8 meter dengan pelat ACP Seven PVDF dan pondasi angkur cakar ayam tahan badai.",
      sightline: "150 - 250 Meter",
      designRationale: "Pylon sign berdiri tegak di tepi jalan protokol untuk memandu pengendara dari kejauhan sebelum memasuki lobi.",
    };
  }

  // Default clean modern brand
  return {
    signType: "lettering",
    fontStyle: "bold",
    fontColor: "#2563EB",
    glowMode: "frontlit",
    glowColor: "#3B82F6",
    wallTexture: "concrete",
    subText: "OFFICIAL STORE & HEADQUARTERS",
    engineeringTip: "Stainless 304 anti karat kombinasi tutup akrilik susu 3mm bergaransi resmi LED 2 tahun.",
    sightline: "60 - 90 Meter",
    designRationale: "Paduan huruf timbul 3D biru elektrik dengan pencahayaan muka memberikan visibilitas komersial maksimal.",
  };
}

// Serve images-logo folder statically
app.use("/images-logo", express.static(path.join(process.cwd(), "images-logo")));

async function startServer() {
  // Vite middleware in dev mode
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
