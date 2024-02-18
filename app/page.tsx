// import { getFrameMetadata } from '@coinbase/onchainkit';

import { getFrameMetadata } from '../helpers/getFrameMetadata';

import type { Metadata } from 'next';
import { NEXT_PUBLIC_URL } from './config';

const frameMetadata = getFrameMetadata({
  buttons: [
    {
      label: 'Generate an image of your frame of mind',
    },
  ],
  // image: {
  //   src: `${NEXT_PUBLIC_URL}/park-3.png`,
  //   aspectRatio: '1:1',
  // },
  input: {
    text: 'Describe your frame of mind',
  },
  postUrl: `${NEXT_PUBLIC_URL}/api/frame`,
});

export const metadata: Metadata = {
  title: 'What\'s your frame of mind?',
  description: '🧠',
  openGraph: {
    title: 'fom.xyz',
    description: '🧠',
    images: [`${NEXT_PUBLIC_URL}/fom.webp`],
  },
  other: {
    ...frameMetadata,
  },
};

export default function Page() {
  return (
    <>
      <h1>What's your frame of mind?</h1>
    </>
  );
}
