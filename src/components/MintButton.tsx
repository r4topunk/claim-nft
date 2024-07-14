"use client"

import { useState } from "react";

function MintButton({ uuid, defaultMinted }: { uuid: string; defaultMinted: boolean }) {
  const [minted, setMinted] = useState(defaultMinted)
  const [loading, setLoading] = useState(false)

  const handleClick = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/mint", {
        method: "POST",
        body: JSON.stringify({uuid}),
        headers: {
          "content-type": "application/json"
        }
      })
      if (res.ok) {
        setMinted(minted => !minted)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      disabled={minted}
      className="text-sm text-center w-full p-2 rounded-md bg-zinc-700 text-white"
      onClick={handleClick}
    >
      {minted ? "Mintado" : loading ? "Mintando..." : "Mintar"}
    </button>
  );
}

export default MintButton;