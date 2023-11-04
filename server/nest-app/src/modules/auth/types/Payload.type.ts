export type JwtPayload = {
  sub: number;
  role: string;
  name: string;
};

export type JwtPayloadWithRefreshToken = JwtPayload & { refreshToken: string };
