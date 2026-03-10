// Stub backend — this app uses no backend canister.
import type { HttpAgentOptions } from "@icp-sdk/core/agent";

export interface backendInterface {
  _initializeAccessControlWithSecret: (token: string) => Promise<void>;
}

export interface CreateActorOptions {
  agentOptions?: HttpAgentOptions;
}

export class ExternalBlob {
  private _bytes: Uint8Array;
  onProgress?: (progress: number) => void;

  constructor(bytes: Uint8Array) {
    this._bytes = bytes;
  }

  static fromURL(_url: string): ExternalBlob {
    return new ExternalBlob(new Uint8Array());
  }

  async getBytes(): Promise<Uint8Array> {
    return this._bytes;
  }
}

export function createActor(
  _canisterId: string,
  _upload: (file: ExternalBlob) => Promise<Uint8Array>,
  _download: (bytes: Uint8Array) => Promise<ExternalBlob>,
  _options?: CreateActorOptions,
): Promise<backendInterface> {
  return Promise.resolve({
    _initializeAccessControlWithSecret: async () => {},
  } as backendInterface);
}
