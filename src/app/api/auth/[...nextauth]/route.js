import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcryptjs';
import User from "../../../../../models/user"; // ใช้โมเดล MySQL

const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {},
            async authorize(credentials) {
                const { username, password } = credentials;

                try {
                    // ใช้เมธอด findByUsername ของโมเดล User (MySQL)
                    const user = await User.findByUsername(username);

                    if (!user) {
                        return null; // ถ้าไม่พบผู้ใช้
                    }

                    // ตรวจสอบรหัสผ่าน
                    const passwordMatch = await bcrypt.compare(password, user.password);

                    if (!passwordMatch) {
                        return null; // รหัสผ่านไม่ถูกต้อง
                    }

                    // คืนค่าผู้ใช้ (ไม่รวมรหัสผ่าน)
                    return {
                        id: user.user_id,
                        name: user.username,
                        email: user.username, // เปลี่ยนเป็น username แทน email
                        role: user.user_role
                    };
                } catch (error) {
                    console.log("Error: ", error);
                    return null; // จัดการข้อผิดพลาด
                }
            }
        })
    ],
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/login"
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                return {
                    ...token,
                    id: user.id,
                    role: user.role
                };
            }
            return token;
        },
        async session({ session, token }) {
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id,
                    role: token.role
                }
            };
        }
    }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
