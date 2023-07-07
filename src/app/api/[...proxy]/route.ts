/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'


// ANCHOR helper
// ================================
const baseURL = process.env.API_URL

const getPath = (url: string) => url.split('api').at(1) ?? '/'

// ANCHOR next.js methods
// ================================
export async function GET(req: NextRequest) {
  const path = getPath(req.url)

  const headers: HeadersInit = {
    accept: 'application/json',
    'Content-Type': 'application/json',
  }
  const token = await getToken({ req })
  if (token?.bearerToken) {
    headers.authorization = `Bearer ${token.bearerToken}`
  }

  const res = await fetch(baseURL + path, { headers })
  const json = await res.json()
  return NextResponse.json(json)
}

export async function DELETE(req: NextRequest) {
  const path = getPath(req.url)

  const headers: HeadersInit = {
    accept: 'application/json',
    'Content-Type': 'application/json',
  }
  const token = await getToken({ req })
  if (token?.bearerToken) {
    headers.authorization = `Bearer ${token.bearerToken}`
  }

  const res = await fetch(baseURL + path, { 
    method: 'DELETE',
    headers 
  })
  const json = await res.json()
  return NextResponse.json(json)
}


export async function POST(req: NextRequest) {
  const path = getPath(req.url)

  const type = req.headers.get('content-type') ?? ''
  let formData

  if (type.includes('multipart/form-data')) {
    formData = await req.formData()
  }
  const headers: HeadersInit = {
    accept: 'application/json',
  }
  if (!type.includes('multipart/form-data')) {
    headers['Content-Type'] = 'application/json'
  }
  const token = await getToken({ req })
  if (token?.bearerToken) {
    headers.authorization = `Bearer ${token.bearerToken}`
  }

  const res = await fetch(baseURL + path, {
    method: 'POST',
    headers,
    body: formData ?? req.body,
  })
  const json = await res.json()
  return NextResponse.json(json)
}

export async function PUT(req: NextRequest) {
  const body = await req.json()
  const path = getPath(req.url)

  const type = req.headers.get('content-type') ?? ''
  let formData

  if (type.includes('multipart/form-data')) {
    formData = await req.formData()
  }
  const headers: HeadersInit = {
    accept: 'application/json',
  }
  if (!type.includes('multipart/form-data')) {
    headers['Content-Type'] = 'application/json'
  }
  const token = await getToken({ req })
  if (token?.bearerToken) {
    headers.authorization = `Bearer ${token.bearerToken}`
  }

  const res = await fetch(baseURL + path, {
    method: 'PUT',
    headers,
    body: formData ?? JSON.stringify(body),
  })

  const json = await res.json()

  return NextResponse.json(json)
}
