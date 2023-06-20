import middleware from 'next-auth/middleware'

export default middleware
export const config = { matcher: '/((?!login|api|static|.*\\..*|_next).*)' }
