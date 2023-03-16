import {
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit,
    SubscribeMessage,
    WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';

@WebSocketGateway({
    cors: {
        origin: '*',
    },
})
export class AppGateway
    implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
    afterInit(): void {
        console.log('Socket Initialized');
    }

    handleConnection(client: Socket): void {
        console.log(`Client Connected: ${client.id}`);
    }

    handleDisconnect(client: Socket): void {
        console.log(`Client Disconnected: ${client.id}`);
    }

    @SubscribeMessage('playCard')
    async handlePlayCard(
        client: Socket,
        payload: { cardId: string; targetId?: string },
    ): Promise<void> {
        console.log(
            `Client ${client.id} played card ${payload.cardId} and is targeting ${payload.targetId}`,
        );
    }
}
