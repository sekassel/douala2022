import { Controller, Get, Post, Param } from '@nestjs/common';

@Controller('challenges/:id')
export class ChallengesController {
	/**
	 * Fetch every sudokus of a given challenge.
	 */
	@Get('sudokus')
	getSudokus(@Param() params): Array<object> {
		const challengeId = params.id;
		// fetch sudokus from DB
		return [{}];
	}

	/**
	 * Accept a challenge invite.
	 */
	@Post('accept')
	acceptChallenge(@Param() params): object {
		const challengeId = params.id;
		// req to mark invite as 'accepted'
		return {success: true};
	}

	/**
	 * Decline a challenge invite.
	 */
	@Post('decline')
	declineChallenge(@Param() params): object {
		const challengeId = params.id;
		// delete invite in DB
		return {success: true};
	}
}
