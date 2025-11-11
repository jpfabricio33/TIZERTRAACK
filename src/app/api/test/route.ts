import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    return NextResponse.json({
      status: 'success',
      message: 'API funcionando corretamente',
      timestamp: new Date().toISOString(),
      runtime: 'nodejs18.x',
      environment: process.env.NODE_ENV
    });
  } catch (error) {
    return NextResponse.json(
      { 
        status: 'error',
        message: 'Erro na API',
        error: error instanceof Error ? error.message : 'Erro desconhecido'
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    return NextResponse.json({
      status: 'success',
      message: 'POST recebido com sucesso',
      data: body,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json(
      { 
        status: 'error',
        message: 'Erro ao processar POST',
        error: error instanceof Error ? error.message : 'Erro desconhecido'
      },
      { status: 500 }
    );
  }
}