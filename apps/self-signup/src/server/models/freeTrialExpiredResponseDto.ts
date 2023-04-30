export interface FreeTrialExpiredResponseDto {
  invitationCode: string;
}

export interface ExtendFreeTrialRequestDto extends FreeTrialExpiredResponseDto {
  duration?: 7 | 14;
}
