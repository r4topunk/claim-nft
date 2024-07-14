import MintButton from "@/components/MintButton";
import { createClient } from "@/utils/supabase/server";
import { thirdwebClient } from "@/utils/thirdweb/client";
import { MediaRenderer } from "thirdweb/react";
import "./globals.css";

export default async function Home() {
  const supabase = createClient();

  const { data: nfts } = await supabase.from("NFTs").select();
  console.log(nfts);

  return (
    <main className="container mx-auto py-4">
      <h1 className="text-2xl font-bold mb-4">NFTs</h1>
      {nfts && nfts.length ? (
        <div className="grid grid-cols-3 gap-8">
          {nfts.map((nft) => (
            <div
              key={nft.id}
              className="rounded-lg p-6 w-fit flex flex-col gap-4 shadow-xl"
            >
              <p className="text-lg">
                #{nft.id} - {nft.title}
              </p>
              <div className="w-full aspect-square content-center">
                <MediaRenderer src={nft.image} client={thirdwebClient} />
              </div>
              <MintButton minted={nft.minted} uuid={nft.uuid} />
            </div>
          ))}
        </div>
      ) : (
        <p>Nenhuma NFT foi encontrada</p>
      )}
    </main>
  );
}
