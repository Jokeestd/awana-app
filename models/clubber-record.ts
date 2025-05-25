// AwanaRecord is what leaders submit each meeting
export interface ClubberRecord {
  id: string;
  clubberId: string;
  date: string;
  sectionsCompleted: number;
  bible: boolean;
  church: boolean;
  teamColor: string;
  guests?: number;
  extraPoints?: number;
}
