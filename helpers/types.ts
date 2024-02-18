import { NeynarFrameValidationInternalModel } from './neynarTypes';

/**
 * Frame Data
 *
 * Note: exported as public Type
 */
export interface FrameData {
  buttonIndex: number;
  castId: {
    fid: number;
    hash: string;
  };
  inputText: string;
  fid: number;
  messageHash: string;
  network: number;
  timestamp: number;
  url: string;
}

/**
 * Frame Request
 *
 * Note: exported as public Type
 */
export interface FrameRequest {
  untrustedData: FrameData;
  trustedData: {
    messageBytes: string;
  };
}

/**
 * Simplified Object model with the raw Neynar data if-needed.
 */
export interface FrameValidationData {
  button: number; // Number of the button clicked
  following: boolean; // Indicates if the viewer clicking the frame follows the cast author
  input: string; // Text input from the viewer typing in the frame
  interactor: {
    fid: number; // Viewer Farcaster ID
    custody_address: string; // Viewer custody address
    verified_accounts: string[]; // Viewer account addresses
  };
  liked: boolean; // Indicates if the viewer clicking the frame liked the cast
  raw: NeynarFrameValidationInternalModel;
  recasted: boolean; // Indicates if the viewer clicking the frame recasted the cast
  valid: boolean; // Indicates if the frame is valid
}

export type FrameValidationResponse =
  | { isValid: true; message: FrameValidationData }
  | { isValid: false; message: undefined };

export function convertToFrame(json: any) {
  return {
    fid: json.fid,
    url: json.frameActionBody?.url.toString(),
    messageHash: json.messageHash,
    timestamp: json.timestamp,
    network: json.network,
    buttonIndex: json.frameActionBody?.buttonIndex,
    castId: {
      fid: json.frameActionBody?.castId?.fid,
      hash: json.frameActionBody?.castId?.hash,
    },
  };
}

/**
 * Frame Request
 *
 * Note: exported as public Type
 */
export type FrameButtonMetadata =
  | {
      action: 'link' | 'mint';
      label: string;
      target: string;
    }
  | {
      action?: 'post' | 'post_redirect';
      label: string;
    };

/**
 * Frame Request
 *
 * Note: exported as public Type
 */
export type FrameInputMetadata = {
  text: string;
};

/**
 * Frame Request
 *
 * Note: exported as public Type
 */
export type FrameImageMetadata = {
  src: string;
  aspectRatio?: '1.91:1' | '1:1';
};

/**
 * Frame Request
 *
 * Note: exported as public Type
 */
export type FrameMetadataType = {
  buttons?: [FrameButtonMetadata, ...FrameButtonMetadata[]];
  image?: string | FrameImageMetadata;
  input?: FrameInputMetadata;
  /** @deprecated Prefer `postUrl` */
  post_url?: string;
  postUrl?: string;
  /** @deprecated Prefer `refreshPeriod` */
  refresh_period?: number;
  refreshPeriod?: number;
};

/**
 * Frame Metadata Response
 *
 * Note: exported as public Type
 */
export type FrameMetadataResponse = Record<string, string>;
