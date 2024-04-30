import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Provider } from '../auth.service';

interface JwtPayload {
    userId: number;
    provider: Provider;
}

type TokenType = 'access' | 'refresh';
type TokenExpiryMap = {
    [key in TokenType]: {
        expiresIn: string;
        maxAge: number;
    };
};

export const TOKEN_LIFETIME_MAP: TokenExpiryMap = {
    access: { expiresIn: '12h', maxAge: 12 * 60 * 60 * 1000 },
    refresh: { expiresIn: '14d', maxAge: 14 * 24 * 60 * 60 * 1000 },
};

@Injectable()
export class TokenService {
    constructor(private jwtService: JwtService) {}

    sign(userId: number, tokenType: TokenType, provider: Provider) {
        const payload: JwtPayload = {
            userId,
            provider,
        };

        const newToken = this.jwtService.sign(payload, {
            expiresIn: TOKEN_LIFETIME_MAP[tokenType].expiresIn,
        });

        return newToken;
    }

    verify(token: string) {
        const data = this.jwtService.verify<JwtPayload>(token, {
            ignoreExpiration: false,
        });

        return data;
    }
}
