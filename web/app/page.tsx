"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  return (
    <main style={{ padding: 40 }}>
      <h1>InboxAction OAuth Test</h1>

      {!session ? (
        <button onClick={() => signIn("google")}>Connect Gmail</button>
      ) : (
        <>
          <p>Connected as {session.user?.email}</p>
          <button onClick={() => signOut()}>Disconnect</button>
        </>
      )}
    </main>
  );
}
