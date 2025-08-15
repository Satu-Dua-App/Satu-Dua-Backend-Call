import { RtcRole, RtcTokenBuilder } from "agora-token";

export function buildRtcToken(channelName: string, uid: number, ttlSeconds = 3600) {
  const appId = process.env.AGORA_APP_ID!;
  const appCert = process.env.AGORA_APP_CERT!;
  const role = RtcRole.PUBLISHER;
  const now = Math.floor(Date.now() / 1000);
  const expire = now + ttlSeconds;

  return RtcTokenBuilder.buildTokenWithUid(
    appId,
    appCert,
    channelName,
    uid,
    role,
    expire,
    expire
  );
}
