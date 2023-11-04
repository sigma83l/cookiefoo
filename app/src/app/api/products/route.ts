import { NextRequest, NextResponse } from 'next/server'
import mock from '@/mock/procucts.mock.json';

export function GET(request: NextRequest){
    return NextResponse.json(mock)
}