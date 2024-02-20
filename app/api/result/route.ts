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

  if (message?.button === 4) {
    return NextResponse.redirect(
      'https://dist-git-main-thaddadavis.vercel.app/',
      { status: 302 },
    );
  }

  let imgSrc;

  if (message?.button === 1) {
    imgSrc = `${NEXT_PUBLIC_URL}/happy_fom.webp`;
  } else if (message?.button === 2) {
    imgSrc = `${NEXT_PUBLIC_URL}/caffeinated_fom.webp`;
  } else if (message?.button === 3) {
    imgSrc = `${NEXT_PUBLIC_URL}/calm_fom.webp`;
  } else {
    imgSrc = `${NEXT_PUBLIC_URL}/unexpected_state.webp`;
  }

  return new NextResponse(
    getFrameHtmlResponse({
      buttons: [
        {
          label: 'Happy 🙂',
        },
        {
          label: 'Jittery ☕️',
        },
        {
          label: 'Calm 😌',
        },
        {
          label: 'Go back 🔙',
        }
      ],
      image: {
        src: imgSrc,
        aspectRatio: '1:1',
      },
      postUrl: `${NEXT_PUBLIC_URL}/api/result`,
    }),
  );
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
