import { getFrameMetadata } from '@coinbase/onchainkit';
import type { Metadata } from 'next';
import { NEXT_PUBLIC_URL } from './config';

const frameMetadata = getFrameMetadata({
  buttons: [
    {
      label: 'Free Mint!',
    },
    {
      label: 'Link to DEX',
      action: 'link',
      target: 'https://app.uniswap.org/',
    },
    {
      label: 'Link to Opensea',
      action: 'link',
      target: 'https://opensea.io/',
    },
  ],
  image: `${NEXT_PUBLIC_URL}/park-1.png`,
  post_url: `${NEXT_PUBLIC_URL}/api/frame`,
});

export const metadata: Metadata = {
  title: 'erc404frame',
  description: 'LFG',
  openGraph: {
    title: 'erc404frame',
    description: 'LFG',
    images: [`${NEXT_PUBLIC_URL}/park-1.png`],
  },
  other: {
    ...frameMetadata,
  },
};

export default function Page() {
  return (
    <>
      <h1>erc404frame</h1>
    </>
  );
}
