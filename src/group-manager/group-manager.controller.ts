/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { GroupManagerService } from './group-manager.service';
// import { EmailService } from 'src/email.service';

@Controller('group-manager')
export class GroupManagerController {

    constructor(private readonly groupManagerService: GroupManagerService,

    ) {}

    @UseGuards(JwtAuthGuard) // Protejează ruta cu autentificare
    @Get('/group/:groupId/hotelManagers')
    async getManagersByGroup(@Param('groupId') groupId: string) {
      return this.groupManagerService.getManagersByGroup(groupId);
    }

    // @Post('/send-invitations')
    // async sendInvitations(
    //   @Body() body: { managerIds: string[]; groupId: string },
    // ) {
    //   const { managerIds, groupId } = body;
  
    //   if (!managerIds || managerIds.length === 0) {
    //     return { message: 'Nu s-au selectat manageri pentru a trimite invitații.' };
    //   }
  
    //   // Găsește toți Hotel Managerii care aparțin acestor ID-uri
    //   const hotelManagers = await this.groupManagerService.findManagersByIds(
    //     managerIds,
    //   );
  
    //   if (!hotelManagers || hotelManagers.length === 0) {
    //     return { message: 'Managerii selectați nu au fost găsiți.' };
    //   }
  
    //   const promises = hotelManagers.map(async (hotelManager) => {
    //     const link = `http://localhost:3000/hotel-access?managerId=${hotelManager._id}&groupId=${groupId}`;
    //     const emailBody = `
    //       <h1>Invitație de acces</h1>
    //       <p>Bună, ${hotelManager.name},</p>
    //       <p>Ai fost invitat să accesezi pagina hotelului.</p>
    //       <p><a href="${link}">Click aici pentru acces</a></p>
    //     `;
  
    //     await this.emailService.sendEmail(
    //       hotelManager.email,
    //       'Invitație de acces la hotel',
    //       emailBody,
    //     );
    //   });
  
    //   await Promise.all(promises);
  
    //   return { message: 'Invitațiile au fost trimise cu succes!' };
    // }

}
