import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Profile, UserRole } from '@prisma/client';
import * as jwt from 'jsonwebtoken';
import JwksRsa, { JwksClient } from 'jwks-rsa';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  private readonly jwksClient: JwksClient;

  constructor(
    private readonly prisma: PrismaService,
    configService: ConfigService,
  ) {
    const jwksUri = configService.get<string>('SUPABASE_JWKS_URL');
    if (!jwksUri) {
      throw new Error('SUPABASE_JWKS_URL is not defined');
    }

    this.jwksClient = JwksRsa({
      jwksUri: process.env.SUPABASE_JWKS_URL!,
      cache: true,
      cacheMaxEntries: 5,
      cacheMaxAge: 10 * 60 * 1000,
      rateLimit: true,
      jwksRequestsPerMinute: 10,
    });
  }

  async validateToken(token: string): Promise<{ supabaseId: string }> {
    try {
      const decodedFull = jwt.decode(token, { complete: true });
      const decoded = await this.verifyJwt(token);
      if (!decoded.sub || !decoded.exp) {
        throw new UnauthorizedException('Invalid token payload');
      }

      return { supabaseId: decoded.sub };
    } catch (error) {
      this.logger.error(
        'JWT validation failed',
        error instanceof Error ? error.message : error,
      );
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  async findProfileBySupabaseId(supabaseId: string): Promise<Profile | null> {
    return this.prisma.profile.findUnique({
      where: { supabaseId },
    });
  }

  async createProfile(
    supabaseId: string,
    data: { firstName?: string; lastName?: string },
  ): Promise<Profile> {
    return this.prisma.profile.create({
      data: {
        supabaseId,
        role: UserRole.USER,
        firstName: data.firstName,
        lastName: data.lastName,
      },
    });
  }

  private verifyJwt(token: string): Promise<jwt.JwtPayload> {
    return new Promise((resolve, reject) => {
      jwt.verify(
        token,
        this.getKey.bind(this),
        {
          algorithms: ['ES256', 'RS256'],
          issuer: `${process.env.SUPABASE_PROJECT_URL}/auth/v1`,
          audience: 'authenticated',
        },
        (err, decoded) => {
          if (err) return reject(err);
          resolve(decoded as jwt.JwtPayload);
        },
      );
    });
  }

  private getKey(header: jwt.JwtHeader, callback: jwt.SigningKeyCallback) {
    if (!header.kid) {
      return callback(new Error('Missing kid in JWT header'));
    }

    this.jwksClient.getSigningKey(header.kid, (err, key) => {
      if (err || !key) {
        return callback(err || new Error('Signing key not found'));
      }

      const publicKey =
        key.getPublicKey?.() ||
        (key as any).publicKey ||
        (key as any).rsaPublicKey;

      if (!publicKey) {
        return callback(new Error('Public key not resolvable'));
      }

      callback(null, publicKey);
    });
  }
}
