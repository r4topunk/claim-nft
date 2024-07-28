import ClaimButton from "@/components/ClaimButton";
import NftRender from "@/components/NftRender";
import { IPFS_URL } from "@/utils/constants";
import { createClient } from "@/utils/supabase/server";
import { twServerClient } from "@/utils/thirdweb/server";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Address, getContract } from "thirdweb";
import { zoraSepolia } from "thirdweb/chains";
import { getNFT } from "thirdweb/extensions/erc1155";

async function NftPage({ params }: { params: { uuid: string } }) {
  const supabase = createClient();

  const { data: supaNft } = await supabase
    .from("NFTs")
    .select()
    .eq("uuid", params.uuid)
    .single();

  if (!supaNft) {
    notFound();
  }

  const contract = getContract({
    chain: zoraSepolia,
    address: supaNft.address,
    client: twServerClient,
  });

  const nft = await getNFT({
    contract,
    tokenId: BigInt(supaNft.token_id),
  });

  return (
    <div
      className={`
        h-screen flex flex-col gap-6 p-4
        items-center justify-center
        overflow-x-hidden
      `}
    >
      <ClaimButton
        contract={contract}
        quantity={BigInt(1)}
        tokenId={BigInt(supaNft.token_id)}
        owner={supaNft.owner as Address}
        uuid={params.uuid}
      />
      {nft.metadata.image && <NftRender src={nft.metadata.image} />}
      {nft.metadata.external_url && (
        <>
          <iframe
            width="300px"
            className="aspect-square"
            src={nft.metadata.external_url.replace("ipfs://", IPFS_URL)}
          />
          <Link href={nft.metadata.external_url.replace("ipfs://", IPFS_URL)}>
            Acessar PDF
          </Link>
        </>
      )}
    </div>
  );
}

export default NftPage;
