import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { BadRequestException, Get, Query, Res } from '@nestjs/common';
import { TOKEN_LIFETIME_MAP } from './token/token.service';

export abstract class AuthController {
    constructor(
        protected readonly configService: ConfigService,
        private oauthService: AuthService
    ) {}

    protected abstract AUTHORIZE_CODE_REQUEST_URL: string;
    private readonly CLIENT_REDIRECT_URL = this.configService.get<string>('CORS_ORIGIN', 'http://localhost:3000');

    @Get()
    async authorize(@Res({ passthrough: true }) response: Response) {
        response.redirect(this.AUTHORIZE_CODE_REQUEST_URL);
    }

    @Get('callback')
    async callback(
        @Query('code') autherizeCode: string,
        @Res({ passthrough: true }) response: Response,
        @Query('error') error: string,
        @Query('error_description') errorDescription: string
    ) {
        if (error) throw new BadRequestException(errorDescription ?? error);

        const { accessToken, refreshToken } = await this.oauthService.login(autherizeCode);

        response.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: Boolean(this.configService.get<string>('NODE_ENV', 'test') === 'production'),
            maxAge: TOKEN_LIFETIME_MAP.access.maxAge,
        });
        response.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: Boolean(this.configService.get<string>('NODE_ENV', 'test') === 'production'),
            maxAge: TOKEN_LIFETIME_MAP.refresh.maxAge,
        });
        response.redirect(this.CLIENT_REDIRECT_URL);
    }
}
