export async function GET() {
  return Response.json({
    apiUrl: process.env.NEXT_PUBLIC_WEB_ORIGIN || 'https://scorepal-dev.mts-lab.net'
  })
}
