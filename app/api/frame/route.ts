import { FrameRequest, getFrameMessage, getFrameHtmlResponse } from '@coinbase/onchainkit';
import { NextRequest, NextResponse } from 'next/server';
import { NEXT_PUBLIC_URL } from '../../config';

async function getResponse(req: NextRequest): Promise<NextResponse> {
  let accountAddress: string | undefined = '';
  let text: string | undefined = '';

  const body: FrameRequest = await req.json();
  const { isValid, message } = await getFrameMessage(body, { neynarApiKey: 'NEYNAR_ONCHAIN_KIT' });

  if (!isValid || !message.interactor.verified_accounts[0]/*|| !message.following || !message.liked || !message.recasted*/) {
    return new NextResponse(
      getFrameHtmlResponse({
        buttons: [
          {
            label: 'Did you forget to follow, like, or recast? 🤔',
          },
        ],
        image: `${NEXT_PUBLIC_URL}/park-2.png`,
        post_url: `${NEXT_PUBLIC_URL}/api/frame`,
      }),
    );
  }

  accountAddress = message.interactor.verified_accounts[0];

  if (message?.button === 2) {
    return NextResponse.redirect(
      'https://app.uniswap.io',
      { status: 302 },
    );
  }

  if (message?.button === 3) {
    return NextResponse.redirect(
      'https://opensea.io',
      { status: 302 },
    );
  }

  // its a free mint!

  return new NextResponse(
    getFrameHtmlResponse({
      buttons: [
        {
          label: `Free mint for ${accountAddress}! 🎉`,
        },
      ],
      image: `${NEXT_PUBLIC_URL}/park-2.png`,
      post_url: `${NEXT_PUBLIC_URL}/api/frame`,
    }),
  );
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
