// LocalStorage Management for DbMeter Pro

import { type VenueProfile, type TargetZone } from './dbMeterTypes';

const STORAGE_KEYS = {
  VENUES: 'dbMeterVenues',
  FOH_OFFSET: 'dbMeterFohOffset',
  TARGET_ZONE: 'dbMeterTargetZone',
};

export const loadVenues = (): VenueProfile[] => {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.VENUES);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error('Error loading venues:', error);
    return [];
  }
};

export const saveVenues = (venues: VenueProfile[]): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.VENUES, JSON.stringify(venues));
  } catch (error) {
    console.error('Error saving venues:', error);
  }
};

export const loadFohOffset = (): number => {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.FOH_OFFSET);
    return saved ? parseFloat(saved) : 0;
  } catch (error) {
    console.error('Error loading FOH offset:', error);
    return 0;
  }
};

export const saveFohOffset = (offset: number): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.FOH_OFFSET, offset.toString());
  } catch (error) {
    console.error('Error saving FOH offset:', error);
  }
};

export const loadTargetZone = (): TargetZone => {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.TARGET_ZONE);
    return (saved as TargetZone) || 'worship';
  } catch (error) {
    console.error('Error loading target zone:', error);
    return 'worship';
  }
};

export const saveTargetZone = (zone: TargetZone): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.TARGET_ZONE, zone);
  } catch (error) {
    console.error('Error saving target zone:', error);
  }
};

export const createVenueProfile = (
  name: string,
  distance: number,
  elevation: number,
  offsetDb: number
): VenueProfile => {
  return {
    id: Date.now().toString(),
    name,
    distance,
    elevation,
    offsetDb,
    venueType: distance < 15 ? 'small' : distance < 25 ? 'medium' : 'large',
    createdAt: new Date().toISOString(),
  };
};

export const deleteVenue = (venues: VenueProfile[], venueId: string): VenueProfile[] => {
  return venues.filter((v) => v.id !== venueId);
};