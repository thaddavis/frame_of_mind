import { FrameRequest, getFrameMessage, getFrameHtmlResponse } from '@coinbase/onchainkit';
import { NextRequest, NextResponse } from 'next/server';
import { NEXT_PUBLIC_URL } from '../../config';

async function getResponse(req: NextRequest): Promise<NextResponse> {
  let accountAddress: string | undefined = '';
  let text: string | undefined = '';

  const body: FrameRequest = await req.json();
  const { isValid, message } = await getFrameMessage(body, { neynarApiKey: 'NEYNAR_ONCHAIN_KIT' });

  if (isValid) {
    accountAddress = message.interactor.verified_accounts[0];
  }

  if (message?.input) {
    text = message.input;
  }

  if (message?.button === 3) {
    return NextResponse.redirect(
      'https://www.google.com/search?q=cute+dog+pictures&tbm=isch&source=lnms',
      { status: 302 },
    );
  }

  let imgSrc;
  switch (message?.input) {
    case 'calm':
      imgSrc = `${NEXT_PUBLIC_URL}/caffeinated_fom.webp`;
      break;
    case 'caffeinated':
      imgSrc = `${NEXT_PUBLIC_URL}/caffeinated_fom.webp`;
      break;
    case 'happy':
      imgSrc = `${NEXT_PUBLIC_URL}/happy_fom.webp`;
      break;
    default:
      imgSrc = `${NEXT_PUBLIC_URL}/fom.webp`;
  }
  

  return new NextResponse(
    getFrameHtmlResponse({
      buttons: [
        {
          label: 'Go back',
          action: 'post_redirect',
        },
        {
          label: `Mint 'Frame of Mind' NFT 🧠`,
        },
      ],
      image: {
        src: imgSrc,
      },
      postUrl: `${NEXT_PUBLIC_URL}/api/post-result`,
    }),
  );
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
