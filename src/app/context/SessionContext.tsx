// "use client";
// import React, {
//   useState,
//   useContext,
//   createContext,
//   Dispatch,
//   SetStateAction,
// } from "react";
// import { User } from "@prisma/client";
// import { SignInResponse } from "next-auth/react";

// type SessionContextType = {
//   user: SignInResponse | User | null | undefined;
//   setUser: Dispatch<SetStateAction<SignInResponse | User | null | undefined>>;
// };

// type Props = {
//   children: React.ReactNode;
// };

// // export const SessionContext = createContext<SessionContextType | null>(null);

// // export const useSession = () => {
// //   const context = useContext(SessionContext);
// //   if (!context) {
// //     throw new Error("useSession must be used within a SessionProvider");
// //   }
// //   return context;
// // };

// export const SessionProvider = ({ children }: Props) => {
//   const [user, setUser] = useState<SignInResponse | User | null | undefined>(
//     null
//   );

//   return (
//     <SessionContext.Provider value={{ user, setUser }}>
//       {children}
//     </SessionContext.Provider>
//   );
// };
