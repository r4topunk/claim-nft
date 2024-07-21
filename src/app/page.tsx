import { PROJECT_URL } from "@/utils/constants";
import { formatEthAddress } from "@/utils/eth";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import QRCode from "react-qr-code";

export default async function Home() {
  const supabase = createClient();

  const { data: nfts } = await supabase.from("NFTs").select("*").order("id");

  return (
    <main className="mx-auto w-full h-screen flex flex-col lg:flex-row gap-8 lg:gap-12 justify-center items-center">
      {nfts?.map((nft) => (
        <div key={nft.id} className="font-mono flex flex-col gap-1 text-center">
          <Link href={`https://${PROJECT_URL}/nft/${nft.uuid}`}>
            <QRCode
              size={128}
              bgColor="black"
              fgColor="#B1FD00"
              value={`https://${PROJECT_URL}/nft/${nft.uuid}`}
            />
          </Link>
          {nft.owner ? <p>{formatEthAddress(nft.owner)}</p> : <p>Claimable</p>}
        </div>
      ))}
    </main>
  );
}
