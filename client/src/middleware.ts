import { NextRequest, NextResponse } from 'next/server';
import { host } from './urlApi';
import { redirect } from 'next/dist/server/api-utils';

export default function middleware(req: NextRequest) {

    // Criação de tokens
    const token = req.cookies.get('key')?.value;

    if (!token && req.url !== `${host}/auth`) {
        return NextResponse.redirect(`${host}/auth`);
    }

    if (token) {
        if (token === 'qa') {
            if (req.url === `${host}/auth`) {
                return NextResponse.redirect(`${host}/qa`)
            } else if (req.url === `${host}/qa/get-pdf` || req.url === `${host}/qa`) {
                return NextResponse.next()
            } else {
                return NextResponse.redirect(`${host}/auth`);
            }
        }

        if (token === 'prod') {
            if (req.url === `${host}/auth`) {
                return NextResponse.redirect(`${host}/prod/get-list`)
            } else if (req.url === `${host}/prod/get-list` || req.url === `${host}/prod/get-pdf` || req.url === `${host}/prod/list-upload`) {
                return NextResponse.next()
            } else {
                return NextResponse.redirect(`${host}/auth`);
            }
        }

        if (token === 'eng') {
            if (req.url === `${host}/auth`) {
                return NextResponse.redirect(`${host}/eng/list-upload`)
            } else if (req.url === `${host}/eng/list-upload`) {
                return NextResponse.next()
            } else {
                return NextResponse.redirect(`${host}/auth`);
            }
        }

        if (token === 'sgi') {
            if (req.url === `${host}/auth`) {
                return NextResponse.redirect(`${host}/sgi/upload-it`)
            } else if (req.url === `${host}/sgi/upload-it` || req.url === `${host}/sgi/upload-quality-file` || req.url === `${host}/sgi/get-pdf` || req.url === `${host}/sgi/view-it-qa`) {
                return NextResponse.next()
            } else {
                return NextResponse.redirect(`${host}/auth`);
            }
        }
    }
}

export const config = {
    matcher: ['/qa/:path*', '/eng/:path*', '/prod/:path*', '/sgi/:path*', '/auth/'],
};