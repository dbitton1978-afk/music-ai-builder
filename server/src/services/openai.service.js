function buildPrompt(inputText) {
  return `
You are a senior AI music production translator.

Your job:
Convert the user's free-form music idea into a strict JSON object only.

Rules:
- Return valid JSON only
- No markdown
- No code fences
- No explanation outside JSON
- Be concrete and producer-oriented
- Separate extracted values from inferred values
- Fill missing musical details intelligently
- Keep all field names exactly as requested

Return exactly this structure:
{
  "schemaVersion": "1.0.0",
  "input": {
    "mode": "text",
    "rawText": "string",
    "language": "string",
    "cleanedText": "string"
  },
  "extracted": {
    "genreHints": [],
    "moodHints": [],
    "energyHints": [],
    "vocalHints": [],
    "instrumentHints": [],
    "structureHints": [],
    "technicalHints": [],
    "referenceHints": []
  },
  "inferred": {
    "genre": { "value": "string", "confidence": 0.0, "reason": "string" },
    "bpm": { "value": 0, "confidence": 0.0, "reason": "string" },
    "key": { "value": "string", "confidence": 0.0, "reason": "string" },
    "scale": { "value": "string", "confidence": 0.0, "reason": "string" }
  },
  "normalizedSpec": {
    "genre": "string",
    "subGenre": "string",
    "mood": [],
    "energy": 0,
    "bpm": 0,
    "key": "string",
    "scale": "string",
    "groove": {
      "type": "string",
      "swing": 0,
      "humanization": 0
    },
    "vocalProfile": {
      "enabled": true,
      "type": "string",
      "style": "string",
      "processing": []
    },
    "soundDesign": {
      "warmth": 0,
      "brightness": 0,
      "distortion": 0,
      "stereoWidth": 0,
      "reverbDepth": 0
    }
  },
  "professionalInterpretation": {
    "simple": "string",
    "professional": "string"
  },
  "productionBrief": {
    "genre": "string",
    "subGenre": "string",
    "mood": [],
    "energy": 0,
    "bpm": 0,
    "key": "string",
    "scale": "string",
    "rhythmStyle": "string",
    "arrangementDirection": "string",
    "soundDesignDirection": "string",
    "referenceVibe": "string"
  },
  "arrangementPlan": [
    {
      "section": "string",
      "bars": 0,
      "energy": 0,
      "elements": [],
      "notes": "string"
    }
  ],
  "musicalInstructions": {
    "leadMelody": {
      "role": "string",
      "complexity": 0,
      "range": "string",
      "movement": "string",
      "notes": "string"
    },
    "bassline": {
      "role": "string",
      "relationshipToKick": "string",
      "density": 0,
      "notes": "string"
    },
    "drums": {
      "kick": "string",
      "snareClap": "string",
      "hats": "string",
      "percussion": "string"
    },
    "vocals": {
      "type": "string",
      "placement": "string",
      "processing": []
    },
    "transitions": {
      "tools": [],
      "notes": "string"
    },
    "tensionRelease": {
      "strategy": "string",
      "notes": "string"
    },
    "repetitionLogic": {
      "motifCycle": "string",
      "vocalCycle": "string",
      "notes": "string"
    }
  },
  "exportTargets": {
    "generatorPrompt": "string",
    "midiPlanning": {
      "lead": "string",
      "bass": "string",
      "drums": "string"
    },
    "dawGuidance": {
      "sessionStart": "string",
      "arrangementOrder": []
    },
    "pluginChains": {
      "bass": [],
      "vocals": [],
      "drums": []
    },
    "producerNotes": []
  },
  "validation": {
    "isValid": true,
    "errors": [],
    "warnings": [],
    "fallbacksUsed": []
  },
  "meta": {
    "model": "string",
    "generatedAt": "ISO_DATE",
    "generationVersion": 1,
    "schemaVersion": "1.0.0"
  }
}

User input:
${inputText}
  `.trim();
}

function buildFallbackResult(inputText, generationVersion, modelName) {
  return {
    schemaVersion: "1.0.0",
    input: {
      mode: "text",
      rawText: inputText,
      language: "auto",
      cleanedText: inputText
    },
    extracted: {
      genreHints: [],
      moodHints: [],
      energyHints: [],
      vocalHints: [],
      instrumentHints: [],
      structureHints: [],
      technicalHints: [],
      referenceHints: []
    },
    inferred: {
      genre: {
        value: "Electronic",
        confidence: 0.4,
        reason: "fallback default"
      },
      bpm: {
        value: 124,
        confidence: 0.4,
        reason: "fallback default"
      },
      key: {
        value: "C",
        confidence: 0.3,
        reason: "fallback default"
      },
      scale: {
        value: "minor",
        confidence: 0.5,
        reason: "fallback default"
      }
    },
    normalizedSpec: {
      genre: "Electronic",
      subGenre: "General Electronic",
      mood: ["focused"],
      energy: 70,
      bpm: 124,
      key: "C",
      scale: "minor",
      groove: {
        type: "steady electronic groove",
        swing: 10,
        humanization: 15
      },
      vocalProfile: {
        enabled: false,
        type: "none",
        style: "none",
        processing: []
      },
      soundDesign: {
        warmth: 50,
        brightness: 50,
        distortion: 20,
        stereoWidth: 55,
        reverbDepth: 30
      }
    },
    professionalInterpretation: {
      simple: "המערכת תרגמה את הרעיון למבנה הפקה בסיסי ומסודר.",
      professional:
        "The user provided a music concept that was translated into a practical structured production specification."
    },
    productionBrief: {
      genre: "Electronic",
      subGenre: "General Electronic",
      mood: ["focused"],
      energy: 70,
      bpm: 124,
      key: "C",
      scale: "minor",
      rhythmStyle: "steady electronic groove",
      arrangementDirection: "standard electronic structure",
      soundDesignDirection: "clean electronic base with room for refinement",
      referenceVibe: "modern electronic draft"
    },
    arrangementPlan: [
      {
        section: "intro",
        bars: 8,
        energy: 30,
        elements: ["atmosphere", "light percussion"],
        notes: "open with filtered space and gentle rhythm"
      },
      {
        section: "build",
        bars: 16,
        energy: 60,
        elements: ["drums", "bass hint", "riser"],
        notes: "add tension gradually before main section"
      },
      {
        section: "drop",
        bars: 32,
        energy: 85,
        elements: ["full drums", "bass", "lead motif"],
        notes: "deliver the main hook with stable groove"
      },
      {
        section: "outro",
        bars: 8,
        energy: 25,
        elements: ["reduced drums", "atmosphere"],
        notes: "release energy and close cleanly"
      }
    ],
    musicalInstructions: {
      leadMelody: {
        role: "memorable hook",
        complexity: 35,
        range: "narrow to medium",
        movement: "simple repeating motif",
        notes: "keep it clear and easy to recall"
      },
      bassline: {
        role: "supportive low-end driver",
        relationshipToKick: "tight and controlled",
        density: 55,
        notes: "support groove without overplaying"
      },
      drums: {
        kick: "solid central kick pattern",
        snareClap: "simple backbeat support",
        hats: "light movement with subtle variation",
        percussion: "add groove without clutter"
      },
      vocals: {
        type: "optional",
        placement: "hook support if needed",
        processing: []
      },
      transitions: {
        tools: ["riser", "filter sweep"],
        notes: "maintain clarity between sections"
      },
      tensionRelease: {
        strategy: "reduce before impact",
        notes: "leave a small gap before strong returns"
      },
      repetitionLogic: {
        motifCycle: "every 1-2 bars",
        vocalCycle: "as needed",
        notes: "keep recall high"
      }
    },
    exportTargets: {
      generatorPrompt:
        "Create an electronic track at 124 BPM in C minor with a clear hook, stable groove, controlled low end, and a practical arrangement.",
      midiPlanning: {
        lead: "simple repeating motif",
        bass: "tight groove-based low-end",
        drums: "steady kick with supporting hats and percussion"
      },
      dawGuidance: {
        sessionStart: "start from groove and hook foundation",
        arrangementOrder: ["intro", "build", "drop", "outro"]
      },
      pluginChains: {
        bass: ["eq", "saturation", "sidechain compressor"],
        vocals: ["eq", "delay", "reverb"],
        drums: ["eq", "transient shaper", "bus compressor"]
      },
      producerNotes: [
        "keep the idea focused",
        "avoid too many competing layers",
        "prioritize groove clarity"
      ]
    },
    validation: {
      isValid: true,
      errors: [],
      warnings: ["Fallback generation used"],
      fallbacksUsed: ["full_response_fallback"]
    },
    meta: {
      model: modelName,
      generatedAt: new Date().toISOString(),
      generationVersion,
      schemaVersion: "1.0.0"
    }
  };
}

function tryParseJson(text) {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

function extractJson(text) {
  if (!text) return null;

  const direct = tryParseJson(text);
  if (direct) return direct;

  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");

  if (start === -1 || end === -1 || end <= start) {
    return null;
  }

  return tryParseJson(text.slice(start, end + 1));
}

function finalizeResult(raw, inputText, generationVersion, modelName) {
  const fallback = buildFallbackResult(inputText, generationVersion, modelName);
  const parsed = extractJson(raw);

  if (!parsed || typeof parsed !== "object") {
    return fallback;
  }

  return {
    ...fallback,
    ...parsed,
    input: {
      ...fallback.input,
      ...(parsed.input || {})
    },
    extracted: {
      ...fallback.extracted,
      ...(parsed.extracted || {})
    },
    inferred: {
      ...fallback.inferred,
      ...(parsed.inferred || {})
    },
    normalizedSpec: {
      ...fallback.normalizedSpec,
      ...(parsed.normalizedSpec || {})
    },
    professionalInterpretation: {
      ...fallback.professionalInterpretation,
      ...(parsed.professionalInterpretation || {})
    },
    productionBrief: {
      ...fallback.productionBrief,
      ...(parsed.productionBrief || {})
    },
    arrangementPlan: Array.isArray(parsed.arrangementPlan)
      ? parsed.arrangementPlan
      : fallback.arrangementPlan,
    musicalInstructions: {
      ...fallback.musicalInstructions,
      ...(parsed.musicalInstructions || {})
    },
    exportTargets: {
      ...fallback.exportTargets,
      ...(parsed.exportTargets || {})
    },
    validation: {
      ...fallback.validation,
      ...(parsed.validation || {})
    },
    meta: {
      ...fallback.meta,
      ...(parsed.meta || {}),
      model: modelName,
      generatedAt: new Date().toISOString(),
      generationVersion,
      schemaVersion: "1.0.0"
    }
  };
}

export async function createMusicSpec(inputText, generationVersion) {
  const modelName = process.env.OPENAI_MODEL || "gpt-5.4";

  try {
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: modelName,
        input: buildPrompt(inputText)
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.error?.message || "OpenAI request failed");
    }

    const rawText =
      data.output_text ||
      data.output?.map((item) => item?.content?.map((c) => c?.text).join(" ")).join(" ") ||
      "";

    return {
      modelName,
      schemaVersion: "1.0.0",
      result: finalizeResult(rawText, inputText, generationVersion, modelName)
    };
  } catch (error) {
    return {
      modelName,
      schemaVersion: "1.0.0",
      result: buildFallbackResult(inputText, generationVersion, modelName),
      error: error.message
    };
  }
}
