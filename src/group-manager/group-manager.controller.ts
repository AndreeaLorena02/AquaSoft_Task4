/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { GroupManagerService } from './group-manager.service';
import { UsersService } from 'src/users/users.service';
import { EmailService } from 'src/email.service';
// import { EmailService } from 'src/email.service';

@Controller('group-manager')
export class GroupManagerController {

  constructor(private readonly groupManagerService: GroupManagerService,
    private readonly usersService: UsersService,
    private readonly emailService: EmailService

  ) { }

  @UseGuards(JwtAuthGuard)
  @Get('/group/:groupId/hotelManagers')
  async getManagersByGroup(@Param('groupId') groupId: string) {
    return this.groupManagerService.getManagersByGroup(groupId);
  }

  @Post('/send-invitations')
  async sendInvitations(@Body() body: { managerIds: string[]; groupId: string }) {
    const { managerIds, groupId } = body;

    if (!managerIds || managerIds.length === 0) {
      return { message: 'Nu s-au selectat manageri pentru a trimite invitații.' };
    }

    const managers = await this.usersService.findUsersByIds(managerIds);

    if (!managers || managers.length === 0) {
      return { message: 'Managerii selectați nu au fost găsiți.' };
    }

    const promises = managers.map(async (manager) => {
      const token = await this.groupManagerService.generateTemporaryToken(manager._id);

      const link = `http://localhost:3001/hotelPage?token=${token}`;
      const emailBody = `
      <h1>Invitație de acces</h1>
      <p>Bună, ${manager.name},</p>
      <p>Ai fost invitat să accesezi pagina hotelului.</p>
      <p><a href="${link}">Click aici pentru acces</a></p>
    `;

      await this.emailService.sendEmail(
        manager.email,
        'Invitație de acces la hotel',
        emailBody,
      );
    });

    await Promise.all(promises);

    return { message: 'Invitațiile au fost trimise cu succes!' };
  }

}
