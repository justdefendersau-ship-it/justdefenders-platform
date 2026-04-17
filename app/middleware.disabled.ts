import { createServerClient } from "@supabase/ssr"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest){

const res = NextResponse.next()

const supabase = createServerClient(

process.env.NEXT_PUBLIC_SUPABASE_URL!,
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
{
cookies:{
get:(name)=>req.cookies.get(name)?.value
}
}

)

const { data:{ session } } = await supabase.auth.getSession()

const isAuthRoute = req.nextUrl.pathname.startsWith("/login")

if(!session && !isAuthRoute){

return NextResponse.redirect(new URL("/login",req.url))

}

if(session && isAuthRoute){

return NextResponse.redirect(new URL("/analytics/command-center",req.url))

}

return res

}

export const config = {

matcher:["/analytics/:path*","/fuel","/shed"]

}