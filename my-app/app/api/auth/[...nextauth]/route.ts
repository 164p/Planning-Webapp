import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                const res = await fetch("/your/endpoint", {
                method: 'POST',
                body: JSON.stringify(credentials),
                headers: { "Content-Type": "application/json" }
                })
                const user = await res.json()
                if (res.ok && user) {
                    return user
                    }
                return null
            }
        })
    ],
    pages: {
        signIn: '/auth/signin',
    },
    callbacks: {
        async signIn({ user, account, profile, email, credentials }:any) {
            return true
        },
        async redirect({ url, baseUrl }:any) {
            return baseUrl
        },
        async session({ session, user, token }:any) {
            if(token){
                session.user.id = token.id
                session.user.role = token.role
                session.user.username = token.username
                session.user.email = token.email
            }
            return session
        },
        async jwt({ token, user, account, profile, isNewUser }:any) {
            if (user) {
                token.id = user.id
                token.role = user.role
                token.username = user.username
                token.email = user.email
            }
            return token
        }
    }
})

export { handler as GET, handler as POST }