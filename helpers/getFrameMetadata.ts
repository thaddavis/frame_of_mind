import { FrameMetadataResponse, FrameMetadataType, FrameImageMetadata } from './types';

/**
 * This function generates the metadata for a Farcaster Frame.
 * @param buttons: The buttons to use for the frame.
 * @param image: The image to use for the frame.
 * @param input: The text input to use for the frame.
 * @param postUrl: The URL to post the frame to.
 * @param refreshPeriod: The refresh period for the image used.
 * @returns The metadata for the frame.
 */
export const getFrameMetadata = function ({
  buttons,
  image,
  input,
  postUrl,
  post_url,
  refreshPeriod,
  refresh_period,
}: FrameMetadataType): FrameMetadataResponse {
  const postUrlToUse = postUrl || post_url;
  const refreshPeriodToUse = refreshPeriod || refresh_period;

  const metadata: Record<string, string> = {
    'fc:frame': 'vNext',
  };
  if (typeof image === 'string') {
    metadata['fc:frame:image'] = image;
  } else if (image) {
    metadata['fc:frame:image'] = image?.src;
    if (image?.aspectRatio) {
      metadata['fc:frame:image:aspect_ratio'] = image?.aspectRatio;
    }
  }
  if (input) {
    metadata['fc:frame:input:text'] = input.text;
  }
  if (buttons) {
    buttons.forEach((button: any, index: number) => {
      metadata[`fc:frame:button:${index + 1}`] = button.label;
      if (button.action) {
        metadata[`fc:frame:button:${index + 1}:action`] = button.action;
      }
      if ((button.action == 'link' || button.action == 'mint') && button.target) {
        metadata[`fc:frame:button:${index + 1}:target`] = button.target;
      }
    });
  }
  if (postUrlToUse) {
    metadata['fc:frame:post_url'] = postUrlToUse;
  }
  if (refreshPeriodToUse) {
    metadata['fc:frame:refresh_period'] = refreshPeriodToUse.toString();
  }
  return metadata;
};
