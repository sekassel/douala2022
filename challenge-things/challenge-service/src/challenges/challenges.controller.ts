import { Controller, Get, Post, Param } from '@nestjs/common';
import { WebSocketGateway, SubscribeMessage, MessageBody } from '@nestjs/websockets';

@WebSocketGateway(3000);
@Controller('challenges/:id')
export class ChallengesController {
	/**
	 * Fetch every sudokus of a given challenge.
	 */
	@Get('sudokus')
	getSudokus(@Param() params): Array<object> {
		const challengeId = params.id;

		ws.send({
			topic: 'subscribe',
			targetTopic: 'challenge-sudoku-list'
		});

		// fetch sudokus from DB
		return [{}];
	}

	/**
	 * Accept a challenge invite.
	 */
	@Post('accept')
	acceptChallenge(@Param() params): object {
		const challengeId = params.id;

		ws.send({
			topic: 'publish',
			targetTopic: 'challenge-sudoku-accepted'
		});
		// req to mark invite as 'accepted'
		return {success: true};
	}

	/**
	 * Decline a challenge invite.
	 */
	@Post('decline')
	declineChallenge(@Param() params): object {
		const challengeId = params.id;

		ws.send({
			topic: 'publish',
			targetTopic: 'challenge-sudoku-declined'
		});
		// delete invite in DB
		return {success: true};
	}

	// Websockets
}
