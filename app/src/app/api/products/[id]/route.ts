import { NextRequest, NextResponse } from 'next/server'
import mock from '@/mock/procucts.mock.json';

type Props = {
    params: {
        id: string
    }
}

export function GET(request: Request, { params: { id } }: Props) {

    const res = mock.find((product)=> (
        product.id === id
    )) 

    if (!res) return NextResponse.json({ "message": "product not found!" })

    return NextResponse.json(res)
}