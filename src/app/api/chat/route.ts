import { NextRequest, NextResponse } from 'next/server';
import { generateFirebaseChatResponse } from '@/lib/firebase/ai';

export async function POST(request: NextRequest) {
  try {
    const { message, history } = await request.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Call Firebase AI Logic (Gemini API) with domain knowledge fallback
    const result = await generateFirebaseChatResponse(message, history || []);

    return NextResponse.json({
      reply: result.reply,
      source: result.source,
      suggestions: result.suggestions,
      actions: result.actions,
      projectId: result.projectId,
      timestamp: new Date().toISOString(),
    });
  } catch (error: unknown) {
    const errMsg = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json(
      { error: errMsg },
      { status: 500 }
    );
  }
}

