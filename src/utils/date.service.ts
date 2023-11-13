import { Injectable } from '@nestjs/common';

@Injectable()
export class DateService {
  convertStringToDate(date: string): Date {
    return new Date(date);
  }
}
