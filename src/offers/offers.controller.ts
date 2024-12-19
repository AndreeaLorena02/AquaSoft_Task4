/* eslint-disable prettier/prettier */
import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { OffersService } from './offers.service';
import { HotelOffersService } from 'src/hotel-offers/hotel-offers.service';

@Controller('offers')
export class OffersController {
    constructor(
      private readonly offersService: OffersService,
      private readonly hotelOffersService: HotelOffersService
    ) {}
  
    @Post('/:hotelId/addOffer')
    async addOfferToHotel(
      @Param('hotelId') hotelId: string ,  @Body('offerId') offerId: string,) {
        return this.offersService.addOfferToHotel(hotelId , offerId);
      }



      @Get('/:hotelId/available-offers')
      async getAvailableOffers(@Param('hotelId') hotelId: string) {
        // Fetch offers already assigned to the hotel
        const assignedOffers = await this.hotelOffersService.getOffersByHotelId(hotelId);

        // Extract assigned offer IDs
        const assignedOfferIds = assignedOffers.map((offer) => offer.offerId);

        // Fetch unassigned offers
        const unassignedOffers = await this.offersService.getUnassignedOffers(assignedOfferIds);

        return unassignedOffers;
}


      
    @Get('all')
    async allOffers() {
        return this.offersService.getOffers();
    }

    @Post('/add')
    async addOffer(@Body() offerData: { name: string; price: number }) {
      return this.offersService.addOffer(offerData);
    }

    @Delete('delete/:offerId')
    async deleteOffer(@Param('offerId') offerId: string) {
       await this.offersService.deleteOffer(offerId);

      // Șterge legătura din tabela `hotelOffers`
      await this.offersService.deleteHotelOfferByOfferId(offerId);
  
      return { message: 'Offer and related hotelOffers entry deleted successfully' };
    }


    @Get('getById/:id')
    async getOfferById(@Param('id') offerId: string) {
      if (!offerId) {
        throw new BadRequestException('Offer ID is required');
      }
      return this.offersService.getOffersById(offerId);
    }



    @Put('/update/:offerId')
    async updateOffer(@Param('offerId') offerId: string,@Body() offerData: { name: string; price: number }) {
    return this.offersService.updateOffer(offerId, offerData);
  }
  
}
