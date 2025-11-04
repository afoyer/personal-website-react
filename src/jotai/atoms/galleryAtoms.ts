import { atom } from "jotai";

// Gallery state atoms
export const flickrErrorAtom = atom<Error | null>(null);
export const flickrHasGalleryAtom = atom<boolean>(false);

// Action atoms
export const setFlickrErrorAtom = atom(
  null,
  (_get, set, error: Error | null) => {
    set(flickrErrorAtom, error);
  }
);

export const setFlickrHasGalleryAtom = atom(
  null,
  (_get, set, hasGallery: boolean) => {
    set(flickrHasGalleryAtom, hasGallery);
  }
);
